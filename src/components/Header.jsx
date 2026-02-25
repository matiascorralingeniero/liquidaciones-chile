import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Calculator, Download } from "lucide-react";

const Header = ({
  nombreEmpresa,
  rutEmpresa,
  mesPago,
  onNombreChange,
  onRutChange,
  onMesChange,
  onImprimir,
}) => {
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
                Sistema de Liquidaciones de Sueldo
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
          <label className="form-label fw-semibold">Nombre Empresa</label>
          <input
            type="text"
            className="form-control"
            value={nombreEmpresa}
            onChange={(e) => onNombreChange(e.target.value)}
            placeholder="Ej: Contabilidad XYZ Ltda."
          />
        </Col>
        <Col md={4}>
          <label className="form-label fw-semibold">RUT Empresa</label>
          <input
            type="text"
            className="form-control"
            value={rutEmpresa}
            onChange={(e) => onRutChange(e.target.value)}
            placeholder="76.123.456-7"
          />
        </Col>
        <Col md={4}>
          <label className="form-label fw-semibold">Mes de Pago</label>
          <input
            type="month"
            className="form-control"
            value={mesPago}
            onChange={(e) => onMesChange(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
