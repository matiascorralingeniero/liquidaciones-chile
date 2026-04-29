import { indicadores } from "./indicadores.js";

export const calcularAsignacionFamiliar = (sueldoImponible, numCargas) => {
  if (numCargas === 0) return 0;
  const tramo = indicadores.asignacionFamiliar.find(
    (t) => sueldoImponible <= t.limite,
  );
  return tramo ? tramo.monto * numCargas : 0;
};

export const calcularHorasExtras = (sueldoBase, numHoras) => {
  if (numHoras === 0 || sueldoBase === 0) return { valor: 0, cantidad: 0 };

  // Calcular valor hora base segun leg. chilena
  const valorHora = ((sueldoBase / 30) * 28) / 168;

  // Horas extras se pagan al 50% adicional (1.5 veces el valor hora)
  const valorHoraExtra = valorHora * 1.5;

  return {
    valor: valorHoraExtra * numHoras,
    cantidad: numHoras,
    valorUnitario: valorHoraExtra,
  };
};

export const calcularDiasAusencia = (sueldoBase, diasAusencia) => {
  const dias = parseInt(diasAusencia || 0);

  if (dias === 0) {
    return { descuento: 0, dias: 0, error: null };
  }

  if (dias > 30) {
    return {
      descuento: 0,
      dias: dias,
      error: "La cantidad de días ausentes no puede ser mayor que 30",
    };
  }

  // FIX: Se eliminó la condición redundante `if (dias > 0 && dias <= 30)`
  // ya que si llegamos aquí, dias está garantizado en ese rango
  const descuento = (sueldoBase / 30) * dias;
  return { descuento, dias, error: null };
};

// FIX: La función ahora recibe el imponible ya calculado (con ausencias descontadas)
// en lugar de recalcularlo internamente, evitando inconsistencias con calcularLiquidacion
export const calcularGratificacionLegal = (imponible) => {
  const gratificacion25 = imponible * 0.25;

  // No debe superar el tope legal de 4.75 IMM
  return Math.min(gratificacion25, indicadores.topeGratificacion);
};

export const calcularLiquidacion = (trabajador) => {
  const sueldoBase = parseFloat(trabajador.sueldoBase || 0);

  // Calcular horas extras según tipo
  let horasExtrasCalc;
  if (trabajador.tieneHorasExtrasPactadas) {
    // Horas extras pactadas manualmente
    const valorPactado = parseFloat(trabajador.valorHoraExtraPactada || 0);
    const cantidad = parseFloat(trabajador.numHorasExtras || 0);
    horasExtrasCalc = {
      valor: valorPactado * cantidad,
      cantidad: cantidad,
      valorUnitario: valorPactado,
      esPactada: true,
    };
  } else {
    // Horas extras calculadas automáticamente (50%)
    horasExtrasCalc = calcularHorasExtras(
      sueldoBase,
      parseFloat(trabajador.numHorasExtras || 0),
    );
    horasExtrasCalc.esPactada = false;
  }

  const bonos = parseFloat(trabajador.bonos || 0);

  // FIX: Se calcula la ausencia primero para tener la base correcta
  const diasAusenciaCalc = calcularDiasAusencia(
    sueldoBase,
    trabajador.diasAusencia,
  );

  // FIX: Se calcula el imponible base ANTES de la gratificación,
  // ya con el descuento de ausencia aplicado
  const baseImponible =
    sueldoBase + horasExtrasCalc.valor - diasAusenciaCalc.descuento;

  let gratificacion = 0;
  let gratificacionCalculada = 0;

  if (trabajador.tieneGratificacionLegal) {
    // FIX: Se pasa baseImponible (ya descontado) en lugar del trabajador completo
    gratificacionCalculada = calcularGratificacionLegal(baseImponible);
    gratificacion = gratificacionCalculada;
  } else if (trabajador.tieneGratificacionManual) {
    gratificacion = parseFloat(trabajador.gratificacion || 0);
  }

  // FIX: totalHaberes ahora suma sobre baseImponible que ya incluye el descuento de ausencia
  const totalHaberes = baseImponible + bonos + gratificacion;

  const colacion = parseFloat(trabajador.colacion || 0);
  const movilizacion = parseFloat(trabajador.movilizacion || 0);
  const asigFamiliar = calcularAsignacionFamiliar(
    totalHaberes,
    parseInt(trabajador.asigFamiliar || 0),
  );

  const sueldoImponible = Math.min(totalHaberes, indicadores.topeImponible);

  let descuentoAFP = 0;
  let descuentoCesantia = 0;
  let aporteCesantiaEmpleador = 0;
  let aporteSISEmpleador = 0;

  if (!trabajador.esJubilado) {
    const afpData = indicadores.afps[trabajador.afp];
    descuentoAFP = sueldoImponible * (afpData.trabajador / 100);

    if (trabajador.tipoContrato === "indefinido") {
      descuentoCesantia = sueldoImponible * 0.006;
      aporteCesantiaEmpleador = sueldoImponible * 0.024;
    } else if (trabajador.tipoContrato === "plazo_fijo") {
      descuentoCesantia = 0;
      aporteCesantiaEmpleador = sueldoImponible * 0.03;
    }

    aporteSISEmpleador = sueldoImponible * (afpData.sis / 100);
  }

  let descuentoSalud = 0;
  if (trabajador.isapre === "Fonasa") {
    descuentoSalud = sueldoImponible * 0.07;
  } else {
    descuentoSalud =
      sueldoImponible * (parseFloat(trabajador.planIsapre) / 100);
  }

  const anticipos = parseFloat(trabajador.anticipos || 0);
  const prestamos = parseFloat(trabajador.prestamos || 0);

  const totalDescuentos =
    descuentoAFP + descuentoSalud + descuentoCesantia + anticipos + prestamos;
  const totalHaberesLiquido =
    totalHaberes + colacion + movilizacion + asigFamiliar;
  const sueldoLiquido = totalHaberesLiquido - totalDescuentos;

  const saludEmpleador = sueldoImponible * (indicadores.salud.ccaf / 100);

  // FIX: Se eliminaron los console.log de depuración

  return {
    sueldoBase,
    horasExtras: horasExtrasCalc,
    bonos,
    gratificacion,
    gratificacionCalculada,
    diasAusencia: diasAusenciaCalc,
    totalHaberes,
    sueldoImponible,
    colacion,
    movilizacion,
    asigFamiliar,
    totalHaberesLiquido,
    descuentoAFP,
    descuentoSalud,
    descuentoCesantia,
    anticipos,
    prestamos,
    totalDescuentos,
    sueldoLiquido,
    aporteCesantiaEmpleador,
    aporteSISEmpleador,
    saludEmpleador,
    costoTotalEmpleador:
      totalHaberes +
      aporteCesantiaEmpleador +
      aporteSISEmpleador +
      saludEmpleador +
      asigFamiliar,
  };
};
