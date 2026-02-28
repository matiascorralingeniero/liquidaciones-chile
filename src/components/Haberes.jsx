import React from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { indicadores } from "../utils/indicadores";

const Haberes = ({ trabajador, liquidacion, onUpdate }) => {
  return (
    <div className="bg-light border border-success rounded-3 p-4 mb-4">
      <h5 className="text-success fw-bold mb-3">💰 HABERES (Ingresos)</h5>

      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Sueldo Base</Form.Label>
            <Form.Control
              type="number"
              value={trabajador.sueldoBase}
              onChange={(e) => onUpdate("sueldoBase", e.target.value)}
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              N° Horas Extras (50% recargo)
            </Form.Label>
            <Form.Control
              type="number"
              value={trabajador.numHorasExtras}
              onChange={(e) => onUpdate("numHorasExtras", e.target.value)}
              min="0"
              placeholder="Cantidad de horas"
            />
            {liquidacion.horasExtras.cantidad > 0 && (
              <Form.Text className="text-muted">
                Valor: $
                {Math.round(liquidacion.horasExtras.valor).toLocaleString(
                  "es-CL",
                )}
                ({liquidacion.horasExtras.cantidad} hrs × $
                {Math.round(
                  liquidacion.horasExtras.valorUnitario,
                ).toLocaleString("es-CL")}
                )
              </Form.Text>
            )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Bonos/Comisiones</Form.Label>
            <Form.Control
              type="number"
              value={trabajador.bonos}
              onChange={(e) => onUpdate("bonos", e.target.value)}
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Check
            type="checkbox"
            id={`gratificacion-legal-${trabajador.id}`}
            label="Gratificación Legal (25%)"
            checked={trabajador.tieneGratificacionLegal}
            onChange={(e) =>
              onUpdate("tieneGratificacionLegal", e.target.checked)
            }
            className="mt-4"
          />
          {trabajador.tieneGratificacionLegal &&
            liquidacion.gratificacionCalculada > 0 && (
              <Form.Text className="text-success d-block">
                <strong>Calculada:</strong> $
                {Math.round(liquidacion.gratificacionCalculada).toLocaleString(
                  "es-CL",
                )}
                <br />
                (25% de imponible, tope: $
                {Math.round(indicadores.topeGratificacion).toLocaleString(
                  "es-CL",
                )}
                )
              </Form.Text>
            )}
        </Col>

        <Col md={4}>
          <Form.Check
            type="checkbox"
            id={`gratificacion-manual-${trabajador.id}`}
            label="Gratificación Manual"
            checked={trabajador.tieneGratificacionManual}
            onChange={(e) =>
              onUpdate("tieneGratificacionManual", e.target.checked)
            }
            className="mt-4"
          />
        </Col>

        {trabajador.tieneGratificacionManual && (
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold">
                Monto Gratificación
              </Form.Label>
              <Form.Control
                type="number"
                value={trabajador.gratificacion}
                onChange={(e) => onUpdate("gratificacion", e.target.value)}
                min="0"
                placeholder="Monto gratificación"
              />
            </Form.Group>
          </Col>
        )}

        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              Colación (no imponible)
            </Form.Label>
            <Form.Control
              type="number"
              value={trabajador.colacion}
              onChange={(e) => onUpdate("colacion", e.target.value)}
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              Movilización (no imponible)
            </Form.Label>
            <Form.Control
              type="number"
              value={trabajador.movilizacion}
              onChange={(e) => onUpdate("movilizacion", e.target.value)}
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Haberes;
