// Indicadores Previred Enero 2026
const indicadores = {
  uf: 39706.07,
  utm: 69751,
  topeImponible: 3569576,
  sueldoMinimo: 539000,
  topeGratificacion: 539000 * 4.75, // 4.75 IMM
  afps: {
    Capital: { trabajador: 11.44, empleador: 0.1, sis: 1.54 },
    Cuprum: { trabajador: 11.44, empleador: 0.1, sis: 1.54 },
    Habitat: { trabajador: 11.27, empleador: 0.1, sis: 1.54 },
    PlanVital: { trabajador: 11.16, empleador: 0.1, sis: 1.54 },
    Provida: { trabajador: 11.45, empleador: 0.1, sis: 1.54 },
    Modelo: { trabajador: 10.58, empleador: 0.1, sis: 1.54 },
    Uno: { trabajador: 10.46, empleador: 0.1, sis: 1.54 },
  },
  salud: {
    ccaf: 3.1,
    fonasa: 3.9,
  },
  seguroCesantia: {
    trabajadorIndefinido: 0.6,
    empleadorIndefinido: 2.4,
    trabajadorPlazoFijo: 0,
    empleadorPlazoFijo: 3.0,
  },
  asignacionFamiliar: [
    { limite: 631976, monto: 22007 }, // Tramo A
    { limite: 923067, monto: 13505 }, // Tramo B
    { limite: 1439668, monto: 4267 }, // Tramo C
    { limite: Infinity, monto: 0 }, // Tramo D
  ],
};
