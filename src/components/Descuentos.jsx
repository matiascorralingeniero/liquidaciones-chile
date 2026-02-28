import React from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { AlertCircle } from "lucide-react";

const Descuentos = ({ trabajador, liquidacion, onUpdate }) => {
  return (
    <div className="bg-light border border-danger rounded-3 p-4 mb-4">
      <h5 className="text-danger fw-bold mb-3">📋 DESCUENTOS</h5>

      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              Días de Ausencia (máx 30)
            </Form.Label>
            <Form.Control
              type="number"
              value={trabajador.diasAusencia}
              onChange={(e) => onUpdate("diasAusencia", e.target.value)}
              min="0"
              max="30"
              placeholder="0"
            />
            {liquidacion.diasAusencia.error && (
              <Alert
                variant="danger"
                className="mt-2 py-2 d-flex align-items-center gap-2"
              >
                <AlertCircle size={16} />
                <small>{liquidacion.diasAusencia.error}</small>
              </Alert>
            )}
            {liquidacion.diasAusencia.dias > 0 &&
              !liquidacion.diasAusencia.error && (
                <Form.Text className="text-danger d-block">
                  <strong>Descuento:</strong> $
                  {Math.round(
                    liquidacion.diasAusencia.descuento,
                  ).toLocaleString("es-CL")}
                  ({liquidacion.diasAusencia.dias} días)
                </Form.Text>
              )}
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Anticipos</Form.Label>
            <Form.Control
              type="number"
              value={trabajador.anticipos}
              onChange={(e) => onUpdate("anticipos", e.target.value)}
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Préstamos</Form.Label>
            <Form.Control
              type="number"
              value={trabajador.prestamos}
              onChange={(e) => onUpdate("prestamos", e.target.value)}
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Descuentos;
