import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Calculator, Download } from "lucide-react";
import { formatearRUT } from "../utils/formatear";

const Header = ({
  nombreEmpresa,
  rutEmpresa,
  mesPago,
  onNombreChange,
  onRutChange,
  onMesChange,
  onImprimir,
}) => {
  const handleRutChange = (e) => {
    const rutFormateado = formatearRUT(e.target.value);
    onRutChange(rutFormateado);
  };

  return (
    <div className="bg-white rounded-4 shadow-lg p-4 mb-4">
      <Row className="align-items-center mb-4">
        <Col md={8}>
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary rounded-3 p-3">
              <Calculator size={32} className="text-white" />
            </div>
            <div>
              <h1 className="mb-0 fw-bold text-primary">
                Liquidacion de Sueldo para Pymes
              </h1>
              <small className="text-muted">
                Indicadores Previred - Enero 2026
              </small>
            </div>
          </div>
        </Col>
        <Col md={4} className="text-md-end">
          <Button variant="success" size="lg" onClick={onImprimir}>
            <Download size={20} className="me-2" />
            Imprimir/PDF
          </Button>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={4}>
          <Form.Label className="fw-semibold">Nombre Empresa</Form.Label>
          <Form.Control
            type="text"
            value={nombreEmpresa}
            onChange={(e) => onNombreChange(e.target.value)}
            placeholder="Ej: Contabilidad XYZ Ltda."
          />
        </Col>
        <Col md={4}>
          <Form.Label className="fw-semibold">RUT Empresa</Form.Label>
          <Form.Control
            type="text"
            value={rutEmpresa}
            onChange={handleRutChange}
            placeholder="76.123.456-7"
            maxLength={12}
          />
        </Col>
        <Col md={4}>
          <Form.Label className="fw-semibold">Mes de Pago</Form.Label>
          <Form.Control
            type="month"
            value={mesPago}
            onChange={(e) => onMesChange(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
