import React from "react";
import { Row, Col, Card, Alert, Badge } from "react-bootstrap";
import { indicadores } from "../utils/indicadores";

const LiquidacionResult = ({ trabajador, liquidacion }) => {
  return (
    <div className="bg-light rounded-3 p-4">
      <h5 className="text-center fw-bold text-dark mb-4">
        LIQUIDACIÓN DE SUELDO - VISTA PREVIA
      </h5>

      <Row className="g-4 mb-4">
        {/* Columna Haberes */}
        <Col md={6}>
          <Card className="border-success h-100">
            <Card.Header className="bg-success text-white">
              <h6 className="mb-0 fw-bold">HABERES</h6>
            </Card.Header>
            <Card.Body>
              {liquidacion.sueldoBase > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Sueldo Base:</span>
                  <strong>
                    ${liquidacion.sueldoBase.toLocaleString("es-CL")}
                  </strong>
                </div>
              )}

              {liquidacion.horasExtras.cantidad > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Horas Extras ({liquidacion.horasExtras.cantidad} hrs
                    {liquidacion.horasExtras.esPactada
                      ? " pactadas"
                      : " al 50%"}
                    ):
                  </span>
                  <strong>
                    $
                    {Math.round(liquidacion.horasExtras.valor).toLocaleString(
                      "es-CL",
                    )}
                  </strong>
                </div>
              )}

              {liquidacion.bonos > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Bonos/Comisiones:</span>
                  <strong>${liquidacion.bonos.toLocaleString("es-CL")}</strong>
                </div>
              )}

              {liquidacion.gratificacion > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Gratificación{" "}
                    {trabajador.tieneGratificacionLegal ? "(25%)" : "(Manual)"}:
                  </span>
                  <strong>
                    $
                    {Math.round(liquidacion.gratificacion).toLocaleString(
                      "es-CL",
                    )}
                  </strong>
                </div>
              )}

              {liquidacion.diasAusencia.dias > 0 &&
                !liquidacion.diasAusencia.error && (
                  <div className="d-flex justify-content-between mb-2 text-danger">
                    <span>
                      Desc. Ausencias ({liquidacion.diasAusencia.dias} días):
                    </span>
                    <strong>
                      -$
                      {Math.round(
                        liquidacion.diasAusencia.descuento,
                      ).toLocaleString("es-CL")}
                    </strong>
                  </div>
                )}

              {liquidacion.colacion > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Colación:</span>
                  <strong>
                    ${liquidacion.colacion.toLocaleString("es-CL")}
                  </strong>
                </div>
              )}

              {liquidacion.movilizacion > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Movilización:</span>
                  <strong>
                    ${liquidacion.movilizacion.toLocaleString("es-CL")}
                  </strong>
                </div>
              )}

              {liquidacion.asigFamiliar > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Asignación Familiar:</span>
                  <strong>
                    ${liquidacion.asigFamiliar.toLocaleString("es-CL")}
                  </strong>
                </div>
              )}

              <hr className="border-success" />
              <div className="d-flex justify-content-between fw-bold text-success">
                <span>TOTAL HABERES:</span>
                <span>
                  $
                  {Math.round(liquidacion.totalHaberesLiquido).toLocaleString(
                    "es-CL",
                  )}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna Descuentos */}
        <Col md={6}>
          <Card className="border-danger h-100">
            <Card.Header className="bg-danger text-white">
              <h6 className="mb-0 fw-bold">DESCUENTOS</h6>
            </Card.Header>
            <Card.Body>
              {!trabajador.esJubilado ? (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      AFP ({indicadores.afps[trabajador.afp].trabajador}%):
                    </span>
                    <strong>
                      $
                      {Math.round(liquidacion.descuentoAFP).toLocaleString(
                        "es-CL",
                      )}
                    </strong>
                  </div>
                </>
              ) : (
                <div className="mb-2">
                  <Badge bg="warning" text="dark">
                    👴 JUBILADO - No cotiza AFP
                  </Badge>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2">
                <span>Salud:</span>
                <strong>
                  $
                  {Math.round(liquidacion.descuentoSalud).toLocaleString(
                    "es-CL",
                  )}
                </strong>
              </div>

              {!trabajador.esJubilado &&
                trabajador.tipoContrato === "indefinido" && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Seg. Cesantía (0.6%):</span>
                    <strong>
                      $
                      {Math.round(liquidacion.descuentoCesantia).toLocaleString(
                        "es-CL",
                      )}
                    </strong>
                  </div>
                )}

              {!trabajador.esJubilado &&
                trabajador.tipoContrato === "plazo_fijo" && (
                  <div className="mb-2">
                    <Badge bg="info">Sin descuento AFC (Plazo Fijo)</Badge>
                  </div>
                )}

              {trabajador.esJubilado && (
                <div className="mb-2">
                  <Badge bg="warning" text="dark">
                    No cotiza AFC (Jubilado)
                  </Badge>
                </div>
              )}

              {liquidacion.anticipos > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Anticipos:</span>
                  <strong>
                    ${liquidacion.anticipos.toLocaleString("es-CL")}
                  </strong>
                </div>
              )}

              {liquidacion.prestamos > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Préstamos:</span>
                  <strong>
                    ${liquidacion.prestamos.toLocaleString("es-CL")}
                  </strong>
                </div>
              )}

              <hr className="border-danger" />
              <div className="d-flex justify-content-between fw-bold text-danger">
                <span>TOTAL DESCUENTOS:</span>
                <span>
                  $
                  {Math.round(liquidacion.totalDescuentos).toLocaleString(
                    "es-CL",
                  )}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sueldo Líquido */}
      <Alert variant="primary" className="text-center mb-4 py-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h4 className="mb-0 fw-bold">SUELDO LÍQUIDO A PAGAR:</h4>
          <h2 className="mb-0 fw-bold">
            ${Math.round(liquidacion.sueldoLiquido).toLocaleString("es-CL")}
          </h2>
        </div>
      </Alert>

      {/* Costos Empleador */}
      <Card className="border-secondary">
        <Card.Header className="bg-secondary text-white">
          <h6 className="mb-0 fw-bold">🏢 Costos del Empleador</h6>
        </Card.Header>
        <Card.Body>
          {!trabajador.esJubilado && (
            <>
              <div className="d-flex justify-content-between mb-2">
                <span>
                  Cesantía Empleador (
                  {trabajador.tipoContrato === "plazo_fijo" ? "3.0%" : "2.4%"}):
                </span>
                <strong>
                  $
                  {Math.round(
                    liquidacion.aporteCesantiaEmpleador,
                  ).toLocaleString("es-CL")}
                </strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>
                  SIS Empleador ({indicadores.afps[trabajador.afp].sis}%):
                </span>
                <strong>
                  $
                  {Math.round(liquidacion.aporteSISEmpleador).toLocaleString(
                    "es-CL",
                  )}
                </strong>
              </div>
            </>
          )}
          <div className="d-flex justify-content-between mb-2">
            <span>Salud CCAF (3.1%):</span>
            <strong>
              ${Math.round(liquidacion.saludEmpleador).toLocaleString("es-CL")}
            </strong>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>COSTO TOTAL EMPLEADOR:</span>
            <span>
              $
              {Math.round(liquidacion.costoTotalEmpleador).toLocaleString(
                "es-CL",
              )}
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LiquidacionResult;
