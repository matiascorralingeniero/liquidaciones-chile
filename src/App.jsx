import React, { useState } from 'react';
import { Calculator, Download, Plus, Trash2, FileText, Info } from 'lucide-react';
import './App.css';

function App() {
  const [trabajadores, setTrabajadores] = useState([
    {
      id: 1,
      nombre: '',
      rut: '',
      cargo: '',
      afp: 'Capital',
      isapre: 'Fonasa',
      planIsapre: 7.0,
      sueldoBase: 0,
      horasExtras: 0,
      bonos: 0,
      colacion: 0,
      movilizacion: 0,
      asigFamiliar: 0,
      anticipos: 0,
      prestamos: 0
    }
  ]);

  // Indicadores Previred Noviembre 2025
  const indicadores = {
    uf: 39643.59,
    utm: 69542,
    topeImponible: 3480707,
    sueldoMinimo: 529000,
    afps: {
      'Capital': { trabajador: 11.44, empleador: 0.1, sis: 1.39 },
      'Cuprum': { trabajador: 11.44, empleador: 0.1, sis: 1.39 },
      'Habitat': { trabajador: 11.27, empleador: 0.1, sis: 1.39 },
      'PlanVital': { trabajador: 11.16, empleador: 0.1, sis: 1.39 },
      'Provida': { trabajador: 11.45, empleador: 0.1, sis: 1.39 },
      'Modelo': { trabajador: 10.58, empleador: 0.1, sis: 1.39 },
      'Uno': { trabajador: 10.46, empleador: 0.1, sis: 1.39 }
    },
    salud: {
      ccaf: 4.5,
      fonasa: 2.5
    },
    seguroCesantia: {
      trabajadorIndefinido: 0.6,
      empleadorIndefinido: 2.4
    },
    asignacionFamiliar: [
      { limite: 620251, monto: 22007 },
      { limite: 905941, monto: 13505 },
      { limite: 1412957, monto: 4267 },
      { limite: Infinity, monto: 0 }
    ]
  };

  const calcularAsignacionFamiliar = (sueldoImponible, numCargas) => {
    if (numCargas === 0) return 0;
    const tramo = indicadores.asignacionFamiliar.find(t => sueldoImponible <= t.limite);
    return tramo ? tramo.monto * numCargas : 0;
  };

  const calcularLiquidacion = (trabajador) => {
    const totalHaberes = parseFloat(trabajador.sueldoBase || 0) + 
                         parseFloat(trabajador.horasExtras || 0) + 
                         parseFloat(trabajador.bonos || 0);
    
    const colacion = parseFloat(trabajador.colacion || 0);
    const movilizacion = parseFloat(trabajador.movilizacion || 0);
    const asigFamiliar = calcularAsignacionFamiliar(totalHaberes, parseInt(trabajador.asigFamiliar || 0));

    const sueldoImponible = Math.min(totalHaberes, indicadores.topeImponible);
    
    const afpData = indicadores.afps[trabajador.afp];
    const descuentoAFP = sueldoImponible * (afpData.trabajador / 100);
    const descuentoSIS = sueldoImponible * (afpData.sis / 100);
    
    let descuentoSalud = 0;
    if (trabajador.isapre === 'Fonasa') {
      descuentoSalud = sueldoImponible * 0.07;
    } else {
      descuentoSalud = sueldoImponible * (parseFloat(trabajador.planIsapre) / 100);
    }
    
    const descuentoCesantia = sueldoImponible * (indicadores.seguroCesantia.trabajadorIndefinido / 100);
    
    const anticipos = parseFloat(trabajador.anticipos || 0);
    const prestamos = parseFloat(trabajador.prestamos || 0);
    
    const totalDescuentos = descuentoAFP + descuentoSIS + descuentoSalud + descuentoCesantia + anticipos + prestamos;
    const totalHaberesLiquido = totalHaberes + colacion + movilizacion + asigFamiliar;
    const sueldoLiquido = totalHaberesLiquido - totalDescuentos;

    const aporteCesantiaEmpleador = sueldoImponible * (indicadores.seguroCesantia.empleadorIndefinido / 100);
    const aporteSISEmpleador = sueldoImponible * (afpData.empleador / 100);
    const saludEmpleador = sueldoImponible * (indicadores.salud.ccaf / 100);
    
    return {
      totalHaberes,
      sueldoImponible,
      colacion,
      movilizacion,
      asigFamiliar,
      totalHaberesLiquido,
      descuentoAFP,
      descuentoSIS,
      descuentoSalud,
      descuentoCesantia,
      anticipos,
      prestamos,
      totalDescuentos,
      sueldoLiquido,
      aporteCesantiaEmpleador,
      aporteSISEmpleador,
      saludEmpleador,
      costoTotalEmpleador: totalHaberes + aporteCesantiaEmpleador + aporteSISEmpleador + saludEmpleador + asigFamiliar
    };
  };

  const agregarTrabajador = () => {
    setTrabajadores([...trabajadores, {
      id: Date.now(),
      nombre: '',
      rut: '',
      cargo: '',
      afp: 'Capital',
      isapre: 'Fonasa',
      planIsapre: 7.0,
      sueldoBase: 0,
      horasExtras: 0,
      bonos: 0,
      colacion: 0,
      movilizacion: 0,
      asigFamiliar: 0,
      anticipos: 0,
      prestamos: 0
    }]);
  };

  const eliminarTrabajador = (id) => {
    setTrabajadores(trabajadores.filter(t => t.id !== id));
  };

  const actualizarTrabajador = (id, campo, valor) => {
    setTrabajadores(trabajadores.map(t => 
      t.id === id ? { ...t, [campo]: valor } : t
    ));
  };

  const imprimirLiquidacion = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header-card">
          <div className="header-content">
            <div className="header-title-section">
              <Calculator className="header-icon" size={32} />
              <div>
                <h1 className="main-title">Sistema de Liquidaciones de Sueldo</h1>
                <p className="subtitle">Indicadores Previred - Noviembre 2025</p>
              </div>
            </div>
            <button onClick={imprimirLiquidacion} className="btn-export">
              <Download size={20} />
              Imprimir/PDF
            </button>
          </div>

          <div className="indicadores-grid">
            <div className="indicador-item">
              <p className="indicador-label">UF</p>
              <p className="indicador-value">${indicadores.uf.toLocaleString('es-CL')}</p>
            </div>
            <div className="indicador-item">
              <p className="indicador-label">UTM</p>
              <p className="indicador-value">${indicadores.utm.toLocaleString('es-CL')}</p>
            </div>
            <div className="indicador-item">
              <p className="indicador-label">Sueldo Mínimo</p>
              <p className="indicador-value">${indicadores.sueldoMinimo.toLocaleString('es-CL')}</p>
            </div>
            <div className="indicador-item">
              <p className="indicador-label">Tope Imponible</p>
              <p className="indicador-value">${indicadores.topeImponible.toLocaleString('es-CL')}</p>
            </div>
          </div>
        </div>

        {trabajadores.map((trabajador, index) => {
          const liquidacion = calcularLiquidacion(trabajador);
          
          return (
            <div key={trabajador.id} className="trabajador-card">
              <div className="trabajador-header">
                <h2 className="trabajador-title">
                  <FileText size={24} />
                  Trabajador {index + 1}
                </h2>
                {trabajadores.length > 1 && (
                  <button onClick={() => eliminarTrabajador(trabajador.id)} className="btn-delete">
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    value={trabajador.nombre}
                    onChange={(e) => actualizarTrabajador(trabajador.id, 'nombre', e.target.value)}
                    placeholder="Ej: Juan Pérez González"
                  />
                </div>
                <div className="form-group">
                  <label>RUT</label>
                  <input
                    type="text"
                    value={trabajador.rut}
                    onChange={(e) => actualizarTrabajador(trabajador.id, 'rut', e.target.value)}
                    placeholder="12.345.678-9"
                  />
                </div>
                <div className="form-group">
                  <label>Cargo</label>
                  <input
                    type="text"
                    value={trabajador.cargo}
                    onChange={(e) => actualizarTrabajador(trabajador.id, 'cargo', e.target.value)}
                    placeholder="Ej: Contador"
                  />
                </div>
              </div>

              <div className="form-grid-4">
                <div className="form-group">
                  <label>AFP</label>
                  <select
                    value={trabajador.afp}
                    onChange={(e) => actualizarTrabajador(trabajador.id, 'afp', e.target.value)}
                  >
                    {Object.keys(indicadores.afps).map(afp => (
                      <option key={afp} value={afp}>{afp}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Salud</label>
                  <select
                    value={trabajador.isapre}
                    onChange={(e) => actualizarTrabajador(trabajador.id, 'isapre', e.target.value)}
                  >
                    <option value="Fonasa">Fonasa (7%)</option>
                    <option value="Isapre">Isapre</option>
                  </select>
                </div>
                {trabajador.isapre === 'Isapre' && (
                  <div className="form-group">
                    <label>% Plan Isapre</label>
                    <input
                      type="number"
                      step="0.1"
                      value={trabajador.planIsapre}
                      onChange={(e) => actualizarTrabajador(trabajador.id, 'planIsapre', e.target.value)}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>N° Cargas Familiares</label>
                  <input
                    type="number"
                    value={trabajador.asigFamiliar}
                    onChange={(e) => actualizarTrabajador(trabajador.id, 'asigFamiliar', e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              <div className="section-haberes">
                <h3 className="section-title">HABERES (Ingresos)</h3>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Sueldo Base</label>
                    <input
                      type="number"
                      value={trabajador.sueldoBase}
                      onChange={(e) => actualizarTrabajador(trabajador.id, 'sueldoBase', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Horas Extras</label>
                    <input
                      type="number"
                      value={trabajador.horasExtras}
                      onChange={(e) => actualizarTrabajador(trabajador.id, 'horasExtras', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Bonos/Comisiones</label>
                    <input
                      type="number"
                      value={trabajador.bonos}
                      onChange={(e) => actualizarTrabajador(trabajador.id, 'bonos', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Colación (no imponible)</label>
                    <input
                      type="number"
                      value={trabajador.colacion}
                      onChange={(e) => actualizarTrabajador(trabajador.id, 'colacion', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Movilización (no imponible)</label>
                    <input
                      type="number"
                      value={trabajador.movilizacion}
                      onChange={(e) => actualizarTrabajador(trabajador.id, 'movilizacion', e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="section-descuentos">
                <h3 className="section-title">DESCUENTOS</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Anticipos</label>
                    <input
                      type="number"
                      value={trabajador.anticipos}
                      onChange={(e) => actualizarTrabajador(trabajador.id, 'anticipos', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Préstamos</label>
                    <input
                      type="number"
                      value={trabajador.prestamos}
                      onChange={(e) => actualizarTrabajador(trabajador.id, 'prestamos', e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="liquidacion-result">
                <h3 className="result-title">LIQUIDACIÓN DE SUELDO</h3>
                
                <div className="result-grid">
                  <div className="result-column">
                    <h4 className="column-title haberes-title">Haberes</h4>
                    <div className="result-items">
                      <div className="result-item">
                        <span>Sueldo Base + Extras + Bonos:</span>
                        <span className="result-value">${liquidacion.totalHaberes.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item">
                        <span>Colación:</span>
                        <span className="result-value">${liquidacion.colacion.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item">
                        <span>Movilización:</span>
                        <span className="result-value">${liquidacion.movilizacion.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item">
                        <span>Asignación Familiar:</span>
                        <span className="result-value">${liquidacion.asigFamiliar.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item result-total haberes-total">
                        <span>Total Haberes:</span>
                        <span className="result-value">${liquidacion.totalHaberesLiquido.toLocaleString('es-CL')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="result-column">
                    <h4 className="column-title descuentos-title">Descuentos</h4>
                    <div className="result-items">
                      <div className="result-item">
                        <span>AFP ({indicadores.afps[trabajador.afp].trabajador}%):</span>
                        <span className="result-value">${liquidacion.descuentoAFP.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item">
                        <span>SIS ({indicadores.afps[trabajador.afp].sis}%):</span>
                        <span className="result-value">${liquidacion.descuentoSIS.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item">
                        <span>Salud:</span>
                        <span className="result-value">${liquidacion.descuentoSalud.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item">
                        <span>Seguro Cesantía (0.6%):</span>
                        <span className="result-value">${liquidacion.descuentoCesantia.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item">
                        <span>Anticipos:</span>
                        <span className="result-value">${liquidacion.anticipos.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item">
                        <span>Préstamos:</span>
                        <span className="result-value">${liquidacion.prestamos.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="result-item result-total descuentos-total">
                        <span>Total Descuentos:</span>
                        <span className="result-value">${liquidacion.totalDescuentos.toLocaleString('es-CL')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sueldo-liquido">
                  <span className="liquido-label">SUELDO LÍQUIDO A PAGAR:</span>
                  <span className="liquido-value">${liquidacion.sueldoLiquido.toLocaleString('es-CL')}</span>
                </div>

                <div className="costos-empleador">
                  <h4 className="empleador-title">Costos del Empleador</h4>
                  <div className="empleador-items">
                    <div className="empleador-item">
                      <span>Cesantía Empleador (2.4%):</span>
                      <span>${liquidacion.aporteCesantiaEmpleador.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="empleador-item">
                      <span>SIS Empleador (0.1%):</span>
                      <span>${liquidacion.aporteSISEmpleador.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="empleador-item">
                      <span>Salud CCAF (4.5%):</span>
                      <span>${liquidacion.saludEmpleador.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="empleador-item empleador-total">
                      <span>Costo Total Empleador:</span>
                      <span>${liquidacion.costoTotalEmpleador.toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="add-button-container">
          <button onClick={agregarTrabajador} className="btn-add">
            <Plus size={24} />
            Agregar Otro Trabajador
          </button>
        </div>

        <div className="instructions-card">
          <h3 className="instructions-title">
            <Info size={20} />
            Instrucciones de Uso
          </h3>
          <ul className="instructions-list">
            <li>✅ Completa los datos básicos de cada trabajador (nombre, RUT, cargo)</li>
            <li>✅ Selecciona la AFP donde está afiliado el trabajador</li>
            <li>✅ Indica si tiene Fonasa o Isapre (si es Isapre, ingresa el % de su plan)</li>
            <li>✅ Ingresa el número de cargas familiares para calcular la asignación automáticamente</li>
            <li>✅ Completa los haberes: sueldo base, horas extras, bonos, etc.</li>
            <li>✅ Colación y movilización son NO imponibles</li>
            <li>✅ El sistema calcula automáticamente todos los descuentos según indicadores Previred</li>
            <li>✅ Usa el botón "Imprimir/PDF" para guardar las liquidaciones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
