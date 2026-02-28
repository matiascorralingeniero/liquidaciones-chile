import React from "react";
import { indicadores } from "../utils/indicadores";

const LiquidacionImprimible = ({
  trabajador,
  liquidacion,
  nombreEmpresa,
  rutEmpresa,
  mesPago,
}) => {
  const mesFormateado = mesPago
    ? (() => {
        const [year, month] = mesPago.split("-");
        const fecha = new Date(parseInt(year), parseInt(month) - 1, 15);
        return fecha
          .toLocaleDateString("es-CL", {
            year: "numeric",
            month: "long",
          })
          .replace(/^\w/, (c) => c.toUpperCase());
      })()
    : "MES AÑO";

  return (
    <div className="liquidacion-imprimible print-only">
      <div className="liquidacion-header">
        <div className="empresa-datos">
          <h2>{nombreEmpresa || "NOMBRE EMPRESA"}</h2>
          <p>RUT: {rutEmpresa || "00.000.000-0"}</p>
        </div>
        <div className="liquidacion-titulo">
          <h1>LIQUIDACIÓN DE SUELDO</h1>
          <p className="mes-pago">{mesFormateado}</p>
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
                Horas Extras ({liquidacion.horasExtras.cantidad} hrs × $
                {Math.round(
                  liquidacion.horasExtras.valorUnitario,
                ).toLocaleString("es-CL")}{" "}
                [+50%])
              </td>
              <td className="monto">
                $
                {Math.round(liquidacion.horasExtras.valor).toLocaleString(
                  "es-CL",
                )}
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
                ${Math.round(liquidacion.gratificacion).toLocaleString("es-CL")}
              </td>
            </tr>
          )}
          {liquidacion.diasAusencia.dias > 0 &&
            !liquidacion.diasAusencia.error && (
              <tr className="row-ausencia">
                <td>
                  Descuento por Ausencias ({liquidacion.diasAusencia.dias} días)
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
                {Math.round(liquidacion.totalHaberesLiquido).toLocaleString(
                  "es-CL",
                )}
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
                  AFP ({indicadores.afps[trabajador.afp].trabajador}%) -{" "}
                  {trabajador.afp}
                </td>
                <td className="monto">
                  $
                  {Math.round(liquidacion.descuentoAFP).toLocaleString("es-CL")}
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="2" className="jubilado-nota">
                No cotiza AFP (Trabajador Jubilado)
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
              ${Math.round(liquidacion.descuentoSalud).toLocaleString("es-CL")}
            </td>
          </tr>
          {!trabajador.esJubilado &&
            trabajador.tipoContrato === "indefinido" && (
              <tr>
                <td>Seguro de Cesantía (0.6%)</td>
                <td className="monto">
                  $
                  {Math.round(liquidacion.descuentoCesantia).toLocaleString(
                    "es-CL",
                  )}
                </td>
              </tr>
            )}
          {!trabajador.esJubilado &&
            trabajador.tipoContrato === "plazo_fijo" && (
              <tr>
                <td colSpan="2" className="jubilado-nota">
                  Sin descuento AFC - Contrato Plazo Fijo (solo empleador cotiza
                  3.0%)
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
                {Math.round(liquidacion.totalDescuentos).toLocaleString(
                  "es-CL",
                )}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="liquido-final">
        <div className="liquido-box">
          <span className="liquido-texto">LÍQUIDO A PAGAR</span>
          <span className="liquido-monto">
            ${Math.round(liquidacion.sueldoLiquido).toLocaleString("es-CL")}
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
        <p>Fecha de emisión: {new Date().toLocaleDateString("es-CL")}</p>
        <p className="nota-legal">
          Este documento constituye comprobante de pago de remuneraciones según
          Art. 54 del Código del Trabajo
        </p>
      </div>
    </div>
  );
};

export default LiquidacionImprimible;
