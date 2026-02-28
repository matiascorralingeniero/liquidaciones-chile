import React, { useState } from "react";
import {
  Calculator,
  Download,
  Plus,
  Trash2,
  FileText,
  Info,
  AlertCircle,
} from "lucide-react";
import "./App.css";

function App() {
  const [trabajadores, setTrabajadores] = useState([
    {
      id: 1,
      nombre: "",
      rut: "",
      cargo: "",
      afp: "Capital",
      planIsapre: 7.0,
      sueldoBase: 0,
      horasExtras: 0,
      numHorasExtras: 0,
      bonos: 0,
      colacion: 0,
      movilizacion: 0,
      asigFamiliar: 0,
      anticipos: 0,
      prestamos: 0,
      esJubilado: false,
      gratificacion: 0,
      tieneGratificacionLegal: false,
      tieneGratificacionManual: false,
      diasAusencia: 0,
      tipoContrato: "indefinido",
    },
  ]);

  const [mesPago, setMesPago] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [rutEmpresa, setRutEmpresa] = useState("");

  const agregarTrabajador = () => {
    setTrabajadores([
      ...trabajadores,
      {
        id: Date.now(),
        nombre: "",
        rut: "",
        cargo: "",
        afp: "Capital",
        isapre: "Fonasa",
        planIsapre: 7.0,
        sueldoBase: 0,
        horasExtras: 0,
        numHorasExtras: 0,
        bonos: 0,
        colacion: 0,
        movilizacion: 0,
        asigFamiliar: 0,
        anticipos: 0,
        prestamos: 0,
        esJubilado: false,
        gratificacion: 0,
        tieneGratificacionLegal: false,
        tieneGratificacionManual: false,
        diasAusencia: 0,
        tipoContrato: "indefinido",
      },
    ]);
  };

  const eliminarTrabajador = (id) => {
    setTrabajadores(trabajadores.filter((t) => t.id !== id));
  };

  const actualizarTrabajador = (id, campo, valor) => {
    setTrabajadores(
      trabajadores.map((t) => {
        if (t.id === id) {
          let updates = { [campo]: valor };

          // Si activa gratificación legal, desactiva manual
          if (campo === "tieneGratificacionLegal" && valor === true) {
            updates.tieneGratificacionManual = false;
          }

          // Si activa gratificación manual, desactiva legal
          if (campo === "tieneGratificacionManual" && valor === true) {
            updates.tieneGratificacionLegal = false;
          }

          return { ...t, ...updates };
        }
        return t;
      }),
    );
  };

  const imprimirLiquidacion = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header-card no-print">
          <div className="header-content">
            <div className="header-title-section">
              <Calculator className="header-icon" size={32} />
              <div>
                <h1 className="main-title">LIquidacion de sueldo - Chile</h1>
                <p className="subtitle">Indicadores Previred - Enero 2026</p>
              </div>
            </div>
            <button onClick={imprimirLiquidacion} className="btn-export">
              <Download size={20} />
              Imprimir/PDF
            </button>
          </div>

          <div className="empresa-info">
            <div className="form-grid-3">
              <div className="form-group">
                <label>Nombre Empresa</label>
                <input
                  type="text"
                  value={nombreEmpresa}
                  onChange={(e) => setNombreEmpresa(e.target.value)}
                  placeholder="Ej: Contabilidad XYZ Ltda."
                />
              </div>
              <div className="form-group">
                <label>RUT Empresa</label>
                <input
                  type="text"
                  value={rutEmpresa}
                  onChange={(e) => setRutEmpresa(e.target.value)}
                  placeholder="76.123.456-7"
                />
              </div>
              <div className="form-group">
                <label>Mes de Pago</label>
                <input
                  type="month"
                  value={mesPago}
                  onChange={(e) => setMesPago(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="indicadores-grid">
            <div className="indicador-item">
              <p className="indicador-label">UF</p>
              <p className="indicador-value">
                ${indicadores.uf.toLocaleString("es-CL")}
              </p>
            </div>
            <div className="indicador-item">
              <p className="indicador-label">UTM</p>
              <p className="indicador-value">
                ${indicadores.utm.toLocaleString("es-CL")}
              </p>
            </div>
            <div className="indicador-item">
              <p className="indicador-label">Sueldo Mínimo</p>
              <p className="indicador-value">
                ${indicadores.sueldoMinimo.toLocaleString("es-CL")}
              </p>
            </div>
            <div className="indicador-item">
              <p className="indicador-label">Tope Imponible</p>
              <p className="indicador-value">
                ${indicadores.topeImponible.toLocaleString("es-CL")}
              </p>
            </div>
          </div>
        </div>

        {trabajadores.map((trabajador, index) => {
          const liquidacion = calcularLiquidacion(trabajador);
          const mesFormateado = mesPago
            ? new Date(mesPago + "-15").toLocaleDateString("es-CL", {
                year: "numeric",
                month: "long",
              })
            : "";

          return (
            <div key={trabajador.id}>
              {/* Vista para editar (no se imprime) */}
              <div className="trabajador-card no-print">
                <div className="trabajador-header">
                  <h2 className="trabajador-title">
                    <FileText size={24} />
                    Trabajador {index + 1}
                  </h2>
                  {trabajadores.length > 1 && (
                    <button
                      onClick={() => eliminarTrabajador(trabajador.id)}
                      className="btn-delete"
                    >
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
                      onChange={(e) =>
                        actualizarTrabajador(
                          trabajador.id,
                          "nombre",
                          e.target.value,
                        )
                      }
                      placeholder="Ej: Juan Pérez González"
                    />
                  </div>
                  <div className="form-group">
                    <label>RUT</label>
                    <input
                      type="text"
                      value={trabajador.rut}
                      onChange={(e) =>
                        actualizarTrabajador(
                          trabajador.id,
                          "rut",
                          e.target.value,
                        )
                      }
                      placeholder="12.345.678-9"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cargo</label>
                    <input
                      type="text"
                      value={trabajador.cargo}
                      onChange={(e) =>
                        actualizarTrabajador(
                          trabajador.id,
                          "cargo",
                          e.target.value,
                        )
                      }
                      placeholder="Ej: Contador"
                    />
                  </div>
                </div>

                <div className="form-grid-4">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={trabajador.esJubilado}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "esJubilado",
                            e.target.checked,
                          )
                        }
                      />
                      <span>¿Es jubilado/pensionado?</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Tipo de Contrato</label>
                    <select
                      value={trabajador.tipoContrato}
                      onChange={(e) =>
                        actualizarTrabajador(
                          trabajador.id,
                          "tipoContrato",
                          e.target.value,
                        )
                      }
                    >
                      <option value="indefinido">Contrato Indefinido</option>
                      <option value="plazo_fijo">
                        Contrato Plazo Fijo/Obra/Faena
                      </option>
                    </select>
                    {trabajador.tipoContrato === "plazo_fijo" && (
                      <small className="helper-text">
                        ℹ️ Empleador aporta 3.0% (trabajador no descuenta AFC)
                      </small>
                    )}
                  </div>

                  {!trabajador.esJubilado && (
                    <div className="form-group">
                      <label>AFP</label>
                      <select
                        value={trabajador.afp}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "afp",
                            e.target.value,
                          )
                        }
                      >
                        {Object.keys(indicadores.afps).map((afp) => (
                          <option key={afp} value={afp}>
                            {afp}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Salud</label>
                    <select
                      value={trabajador.isapre}
                      onChange={(e) =>
                        actualizarTrabajador(
                          trabajador.id,
                          "isapre",
                          e.target.value,
                        )
                      }
                    >
                      <option value="Fonasa">Fonasa (7%)</option>
                      <option value="Isapre">Isapre</option>
                    </select>
                  </div>
                  {trabajador.isapre === "Isapre" && (
                    <div className="form-group">
                      <label>% Plan Isapre</label>
                      <input
                        type="number"
                        step="0.1"
                        value={trabajador.planIsapre}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "planIsapre",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label>N° Cargas Familiares</label>
                    <input
                      type="number"
                      value={trabajador.asigFamiliar}
                      onChange={(e) =>
                        actualizarTrabajador(
                          trabajador.id,
                          "asigFamiliar",
                          e.target.value,
                        )
                      }
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
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "sueldoBase",
                            e.target.value,
                          )
                        }
                        min="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>N° Horas Extras (50% recargo)</label>
                      <input
                        type="number"
                        value={trabajador.numHorasExtras}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "numHorasExtras",
                            e.target.value,
                          )
                        }
                        min="0"
                        placeholder="Cantidad de horas"
                      />
                      {liquidacion.horasExtras.cantidad > 0 && (
                        <small className="helper-text">
                          Valor: $
                          {Math.round(
                            liquidacion.horasExtras.valor,
                          ).toLocaleString("es-CL")}
                          ({liquidacion.horasExtras.cantidad} hrs × $
                          {Math.round(
                            liquidacion.horasExtras.valorUnitario,
                          ).toLocaleString("es-CL")}
                          )
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Bonos/Comisiones</label>
                      <input
                        type="number"
                        value={trabajador.bonos}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "bonos",
                            e.target.value,
                          )
                        }
                        min="0"
                      />
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label checkbox-gratificacion">
                        <input
                          type="checkbox"
                          checked={trabajador.tieneGratificacionLegal}
                          onChange={(e) =>
                            actualizarTrabajador(
                              trabajador.id,
                              "tieneGratificacionLegal",
                              e.target.checked,
                            )
                          }
                        />
                        <span>Gratificación Legal (25%)</span>
                      </label>
                      {trabajador.tieneGratificacionLegal &&
                        liquidacion.gratificacionCalculada > 0 && (
                          <small className="helper-text">
                            Calculada: $
                            {Math.round(
                              liquidacion.gratificacionCalculada,
                            ).toLocaleString("es-CL")}
                            <br />
                            (25% de imponible, tope: $
                            {Math.round(
                              indicadores.topeGratificacion,
                            ).toLocaleString("es-CL")}
                            )
                          </small>
                        )}
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label checkbox-gratificacion-manual">
                        <input
                          type="checkbox"
                          checked={trabajador.tieneGratificacionManual}
                          onChange={(e) =>
                            actualizarTrabajador(
                              trabajador.id,
                              "tieneGratificacionManual",
                              e.target.checked,
                            )
                          }
                        />
                        <span>Gratificación Manual</span>
                      </label>
                    </div>

                    {trabajador.tieneGratificacionManual && (
                      <div className="form-group">
                        <label>Monto Gratificación</label>
                        <input
                          type="number"
                          value={trabajador.gratificacion}
                          onChange={(e) =>
                            actualizarTrabajador(
                              trabajador.id,
                              "gratificacion",
                              e.target.value,
                            )
                          }
                          min="0"
                          placeholder="Monto gratificación"
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label>Colación (no imponible)</label>
                      <input
                        type="number"
                        value={trabajador.colacion}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "colacion",
                            e.target.value,
                          )
                        }
                        min="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>Movilización (no imponible)</label>
                      <input
                        type="number"
                        value={trabajador.movilizacion}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "movilizacion",
                            e.target.value,
                          )
                        }
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="section-descuentos">
                  <h3 className="section-title">DESCUENTOS</h3>
                  <div className="form-grid-3">
                    <div className="form-group">
                      <label>Días de Ausencia (máx 30)</label>
                      <input
                        type="number"
                        value={trabajador.diasAusencia}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "diasAusencia",
                            e.target.value,
                          )
                        }
                        min="0"
                        max="30"
                        placeholder="0"
                      />
                      {liquidacion.diasAusencia.error && (
                        <small className="error-text">
                          <AlertCircle size={14} />{" "}
                          {liquidacion.diasAusencia.error}
                        </small>
                      )}
                      {liquidacion.diasAusencia.dias > 0 &&
                        !liquidacion.diasAusencia.error && (
                          <small className="helper-text">
                            Descuento: $
                            {Math.round(
                              liquidacion.diasAusencia.descuento,
                            ).toLocaleString("es-CL")}
                            ({liquidacion.diasAusencia.dias} días)
                          </small>
                        )}
                    </div>
                    <div className="form-group">
                      <label>Anticipos</label>
                      <input
                        type="number"
                        value={trabajador.anticipos}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "anticipos",
                            e.target.value,
                          )
                        }
                        min="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>Préstamos</label>
                      <input
                        type="number"
                        value={trabajador.prestamos}
                        onChange={(e) =>
                          actualizarTrabajador(
                            trabajador.id,
                            "prestamos",
                            e.target.value,
                          )
                        }
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="liquidacion-result">
                  <h3 className="result-title">
                    LIQUIDACIÓN DE SUELDO - VISTA PREVIA
                  </h3>

                  <div className="result-grid">
                    <div className="result-column">
                      <h4 className="column-title haberes-title">Haberes</h4>
                      <div className="result-items">
                        {liquidacion.sueldoBase > 0 && (
                          <div className="result-item">
                            <span>Sueldo Base:</span>
                            <span className="result-value">
                              ${liquidacion.sueldoBase.toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        {liquidacion.horasExtras.cantidad > 0 && (
                          <div className="result-item">
                            <span>
                              Horas Extras ({liquidacion.horasExtras.cantidad}{" "}
                              hrs al 50%):
                            </span>
                            <span className="result-value">
                              $
                              {Math.round(
                                liquidacion.horasExtras.valor,
                              ).toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        {liquidacion.bonos > 0 && (
                          <div className="result-item">
                            <span>Bonos/Comisiones:</span>
                            <span className="result-value">
                              ${liquidacion.bonos.toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        {liquidacion.gratificacion > 0 && (
                          <div className="result-item">
                            <span>
                              Gratificación{" "}
                              {trabajador.tieneGratificacionLegal
                                ? "Legal (25%)"
                                : "Manual"}
                              :
                            </span>
                            <span className="result-value">
                              $
                              {Math.round(
                                liquidacion.gratificacion,
                              ).toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        {liquidacion.diasAusencia.dias > 0 &&
                          !liquidacion.diasAusencia.error && (
                            <div className="result-item descuento-ausencia">
                              <span>
                                Descuento Ausencias (
                                {liquidacion.diasAusencia.dias} días):
                              </span>
                              <span className="result-value">
                                -$
                                {Math.round(
                                  liquidacion.diasAusencia.descuento,
                                ).toLocaleString("es-CL")}
                              </span>
                            </div>
                          )}
                        {liquidacion.colacion > 0 && (
                          <div className="result-item">
                            <span>Colación:</span>
                            <span className="result-value">
                              ${liquidacion.colacion.toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        {liquidacion.movilizacion > 0 && (
                          <div className="result-item">
                            <span>Movilización:</span>
                            <span className="result-value">
                              $
                              {liquidacion.movilizacion.toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        {liquidacion.asigFamiliar > 0 && (
                          <div className="result-item">
                            <span>Asignación Familiar:</span>
                            <span className="result-value">
                              $
                              {liquidacion.asigFamiliar.toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        <div className="result-item result-total haberes-total">
                          <span>Total Haberes:</span>
                          <span className="result-value">
                            $
                            {Math.round(
                              liquidacion.totalHaberesLiquido,
                            ).toLocaleString("es-CL")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="result-column">
                      <h4 className="column-title descuentos-title">
                        Descuentos
                      </h4>
                      <div className="result-items">
                        {!trabajador.esJubilado ? (
                          <>
                            <div className="result-item">
                              <span>
                                AFP (
                                {indicadores.afps[trabajador.afp].trabajador}%):
                              </span>
                              <span className="result-value">
                                $
                                {Math.round(
                                  liquidacion.descuentoAFP,
                                ).toLocaleString("es-CL")}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="result-item">
                            <span className="jubilado-tag">
                              👴 JUBILADO - No cotiza AFP ni SIS
                            </span>
                          </div>
                        )}
                        <div className="result-item">
                          <span>Salud:</span>
                          <span className="result-value">
                            $
                            {Math.round(
                              liquidacion.descuentoSalud,
                            ).toLocaleString("es-CL")}
                          </span>
                        </div>
                        {!trabajador.esJubilado &&
                          trabajador.tipoContrato === "indefinido" && (
                            <div className="result-item">
                              <span>Seguro Cesantía (0.6%):</span>
                              <span className="result-value">
                                $
                                {Math.round(
                                  liquidacion.descuentoCesantia,
                                ).toLocaleString("es-CL")}
                              </span>
                            </div>
                          )}
                        {!trabajador.esJubilado &&
                          trabajador.tipoContrato === "plazo_fijo" && (
                            <div className="result-item">
                              <span className="jubilado-tag">
                                Sin descuento AFC (Plazo Fijo)
                              </span>
                            </div>
                          )}
                        {trabajador.esJubilado && (
                          <div className="result-item">
                            <span className="jubilado-tag">
                              No cotiza AFC (Jubilado)
                            </span>
                          </div>
                        )}
                        {liquidacion.anticipos > 0 && (
                          <div className="result-item">
                            <span>Anticipos:</span>
                            <span className="result-value">
                              ${liquidacion.anticipos.toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        {liquidacion.prestamos > 0 && (
                          <div className="result-item">
                            <span>Préstamos:</span>
                            <span className="result-value">
                              ${liquidacion.prestamos.toLocaleString("es-CL")}
                            </span>
                          </div>
                        )}
                        <div className="result-item result-total descuentos-total">
                          <span>Total Descuentos:</span>
                          <span className="result-value">
                            $
                            {Math.round(
                              liquidacion.totalDescuentos,
                            ).toLocaleString("es-CL")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sueldo-liquido">
                    <span className="liquido-label">
                      SUELDO LÍQUIDO A PAGAR:
                    </span>
                    <span className="liquido-value">
                      $
                      {Math.round(liquidacion.sueldoLiquido).toLocaleString(
                        "es-CL",
                      )}
                    </span>
                  </div>

                  <div className="costos-empleador">
                    <h4 className="empleador-title">Costos del Empleador</h4>
                    <div className="empleador-items">
                      {!trabajador.esJubilado && (
                        <>
                          <div className="empleador-item">
                            <span>
                              Cesantía Empleador (
                              {trabajador.tipoContrato === "plazo_fijo"
                                ? "3.0%"
                                : "2.4%"}
                              )
                              {trabajador.tipoContrato === "plazo_fijo" &&
                                " - Plazo Fijo"}
                              :
                            </span>
                            <span>
                              $
                              {Math.round(
                                liquidacion.aporteCesantiaEmpleador,
                              ).toLocaleString("es-CL")}
                            </span>
                          </div>
                          <div className="empleador-item">
                            <span>SIS Empleador (0.1%):</span>
                            <span>
                              $
                              {Math.round(
                                liquidacion.aporteSISEmpleador,
                              ).toLocaleString("es-CL")}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="empleador-item">
                        <span>Salud CCAF (4.5%):</span>
                        <span>
                          $
                          {Math.round(
                            liquidacion.saludEmpleador,
                          ).toLocaleString("es-CL")}
                        </span>
                      </div>
                      <div className="empleador-item empleador-total">
                        <span>Costo Total Empleador:</span>
                        <span>
                          $
                          {Math.round(
                            liquidacion.costoTotalEmpleador,
                          ).toLocaleString("es-CL")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vista para imprimir (solo se ve al imprimir) */}
              <div className="liquidacion-imprimible print-only">
                <div className="liquidacion-header">
                  <div className="empresa-datos">
                    <h2>{nombreEmpresa || "NOMBRE EMPRESA"}</h2>
                    <p>RUT: {rutEmpresa || "00.000.000-0"}</p>
                  </div>
                  <div className="liquidacion-titulo">
                    <h1>LIQUIDACIÓN DE SUELDO</h1>
                    <p className="mes-pago">{mesFormateado || "MES AÑO"}</p>
                  </div>
                </div>

                <div className="trabajador-datos-print">
                  <div className="dato-print">
                    <strong>Trabajador:</strong>{" "}
                    {trabajador.nombre || "NOMBRE TRABAJADOR"}
                  </div>
                  <div className="dato-print">
                    <strong>RUT:</strong> {trabajador.rut || "00.000.000-0"}
                  </div>
                  <div className="dato-print">
                    <strong>Cargo:</strong> {trabajador.cargo || "CARGO"}
                  </div>
                  {trabajador.esJubilado && (
                    <div className="dato-print jubilado-badge">
                      <strong>⚠️ TRABAJADOR JUBILADO/PENSIONADO</strong>
                    </div>
                  )}
                </div>
                <table className="tabla-liquidacion">
                  <thead>
                    <tr>
                      <th className="tabla-seccion" colSpan="2">
                        HABERES
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidacion.sueldoBase > 0 && (
                      <tr>
                        <td>Sueldo Base</td>
                        <td className="monto">
                          ${liquidacion.sueldoBase.toLocaleString("es-CL")}
                        </td>
                      </tr>
                    )}
                    {liquidacion.horasExtras.cantidad > 0 && (
                      <tr>
                        <td>
                          Horas Extras ({liquidacion.horasExtras.cantidad} hrs ×
                          $
                          {Math.round(
                            liquidacion.horasExtras.valorUnitario,
                          ).toLocaleString("es-CL")}{" "}
                          [+50%])
                        </td>
                        <td className="monto">
                          $
                          {Math.round(
                            liquidacion.horasExtras.valor,
                          ).toLocaleString("es-CL")}
                        </td>
                      </tr>
                    )}
                    {liquidacion.bonos > 0 && (
                      <tr>
                        <td>Bonos/Comisiones</td>
                        <td className="monto">
                          ${liquidacion.bonos.toLocaleString("es-CL")}
                        </td>
                      </tr>
                    )}
                    {liquidacion.gratificacion > 0 && (
                      <tr>
                        <td>
                          Gratificación{" "}
                          {trabajador.tieneGratificacionLegal
                            ? "Legal (25% imponible)"
                            : "Manual"}
                        </td>
                        <td className="monto">
                          $
                          {Math.round(liquidacion.gratificacion).toLocaleString(
                            "es-CL",
                          )}
                        </td>
                      </tr>
                    )}
                    {liquidacion.diasAusencia.dias > 0 &&
                      !liquidacion.diasAusencia.error && (
                        <tr className="row-ausencia">
                          <td>
                            Descuento por Ausencias (
                            {liquidacion.diasAusencia.dias} días)
                          </td>
                          <td className="monto">
                            -$
                            {Math.round(
                              liquidacion.diasAusencia.descuento,
                            ).toLocaleString("es-CL")}
                          </td>
                        </tr>
                      )}
                    {liquidacion.colacion > 0 && (
                      <tr>
                        <td>Colación (no imponible)</td>
                        <td className="monto">
                          ${liquidacion.colacion.toLocaleString("es-CL")}
                        </td>
                      </tr>
                    )}
                    {liquidacion.movilizacion > 0 && (
                      <tr>
                        <td>Movilización (no imponible)</td>
                        <td className="monto">
                          ${liquidacion.movilizacion.toLocaleString("es-CL")}
                        </td>
                      </tr>
                    )}
                    {liquidacion.asigFamiliar > 0 && (
                      <tr>
                        <td>Asignación Familiar</td>
                        <td className="monto">
                          ${liquidacion.asigFamiliar.toLocaleString("es-CL")}
                        </td>
                      </tr>
                    )}
                    <tr className="total-row">
                      <td>
                        <strong>TOTAL HABERES</strong>
                      </td>
                      <td className="monto">
                        <strong>
                          $
                          {Math.round(
                            liquidacion.totalHaberesLiquido,
                          ).toLocaleString("es-CL")}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="tabla-liquidacion">
                  <thead>
                    <tr>
                      <th className="tabla-seccion" colSpan="2">
                        DESCUENTOS LEGALES
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!trabajador.esJubilado ? (
                      <>
                        <tr>
                          <td>
                            AFP ({indicadores.afps[trabajador.afp].trabajador}%)
                            - {trabajador.afp}
                          </td>
                          <td className="monto">
                            $
                            {Math.round(
                              liquidacion.descuentoAFP,
                            ).toLocaleString("es-CL")}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan="2" className="jubilado-nota">
                          No cotiza AFP ni SIS (Trabajador Jubilado)
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        Salud -{" "}
                        {trabajador.isapre === "Fonasa"
                          ? "Fonasa (7%)"
                          : `Isapre (${trabajador.planIsapre}%)`}
                      </td>
                      <td className="monto">
                        $
                        {Math.round(liquidacion.descuentoSalud).toLocaleString(
                          "es-CL",
                        )}
                      </td>
                    </tr>
                    {!trabajador.esJubilado &&
                      trabajador.tipoContrato === "indefinido" && (
                        <tr>
                          <td>Seguro de Cesantía (0.6%)</td>
                          <td className="monto">
                            $
                            {Math.round(
                              liquidacion.descuentoCesantia,
                            ).toLocaleString("es-CL")}
                          </td>
                        </tr>
                      )}
                    {!trabajador.esJubilado &&
                      trabajador.tipoContrato === "plazo_fijo" && (
                        <tr>
                          <td colSpan="2" className="jubilado-nota">
                            Sin descuento AFC - Contrato Plazo Fijo (solo
                            empleador cotiza 3.0%)
                          </td>
                        </tr>
                      )}
                    {trabajador.esJubilado && (
                      <tr>
                        <td colSpan="2" className="jubilado-nota">
                          No cotiza AFC (Trabajador Jubilado)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {(liquidacion.anticipos > 0 || liquidacion.prestamos > 0) && (
                  <table className="tabla-liquidacion">
                    <thead>
                      <tr>
                        <th className="tabla-seccion" colSpan="2">
                          OTROS DESCUENTOS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {liquidacion.anticipos > 0 && (
                        <tr>
                          <td>Anticipos</td>
                          <td className="monto">
                            ${liquidacion.anticipos.toLocaleString("es-CL")}
                          </td>
                        </tr>
                      )}
                      {liquidacion.prestamos > 0 && (
                        <tr>
                          <td>Préstamos</td>
                          <td className="monto">
                            ${liquidacion.prestamos.toLocaleString("es-CL")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                <table className="tabla-liquidacion">
                  <tbody>
                    <tr className="total-row">
                      <td>
                        <strong>TOTAL DESCUENTOS</strong>
                      </td>
                      <td className="monto">
                        <strong>
                          $
                          {Math.round(
                            liquidacion.totalDescuentos,
                          ).toLocaleString("es-CL")}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="liquido-final">
                  <div className="liquido-box">
                    <span className="liquido-texto">LÍQUIDO A PAGAR</span>
                    <span className="liquido-monto">
                      $
                      {Math.round(liquidacion.sueldoLiquido).toLocaleString(
                        "es-CL",
                      )}
                    </span>
                  </div>
                </div>

                <div className="firma-section">
                  <div className="firma-trabajador">
                    <div className="linea-firma"></div>
                    <p>
                      <strong>Firma del Trabajador</strong>
                    </p>
                    <p>{trabajador.nombre}</p>
                    <p>RUT: {trabajador.rut}</p>
                  </div>
                  <div className="firma-empleador">
                    <div className="linea-firma"></div>
                    <p>
                      <strong>Firma del Empleador</strong>
                    </p>
                    <p>{nombreEmpresa}</p>
                    <p>RUT: {rutEmpresa}</p>
                  </div>
                </div>

                <div className="pie-liquidacion">
                  <p>
                    Fecha de emisión: {new Date().toLocaleDateString("es-CL")}
                  </p>
                  <p className="nota-legal">
                    Este documento constituye comprobante de pago de
                    remuneraciones según Art. 54 del Código del Trabajo
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="add-button-container no-print">
          <button onClick={agregarTrabajador} className="btn-add">
            <Plus size={24} />
            Agregar Otro Trabajador
          </button>
        </div>

        <div className="instructions-card no-print">
          <h3 className="instructions-title">
            <Info size={20} />
            Instrucciones de Uso
          </h3>
          <ul className="instructions-list">
            <li>
              ✅ Completa los datos de la empresa (nombre, RUT y mes de pago)
            </li>
            <li>
              ✅ <strong>JUBILADOS:</strong> Marca la casilla si es jubilado (no
              cotiza AFP ni AFC)
            </li>
            <li>
              ✅ <strong>HORAS EXTRAS:</strong> Ingresa cantidad - se calculan
              al 50% automáticamente
            </li>
            <li>
              ✅ <strong>GRATIFICACIÓN LEGAL:</strong> Activa checkbox para
              calcular 25% del imponible (tope 4.75 IMM)
            </li>
            <li>
              ✅ <strong>GRATIFICACIÓN MANUAL:</strong> Activa checkbox e
              ingresa monto personalizado
            </li>
            <li>
              ✅ <strong>DÍAS DE AUSENCIA:</strong> Ingresa días (máx 30) -
              descuenta proporcionalmente del sueldo base
            </li>
            <li>✅ Sistema calcula todo según legislación chilena vigente</li>
            <li>
              ✅ <strong>Imprimir:</strong> Genera liquidación oficial con
              firmas
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;
