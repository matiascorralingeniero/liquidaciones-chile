import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { indicadores } from "../utils/indicadores";

const Indicadores = () => {
  const items = [
    { label: "UF", value: indicadores.uf, variant: "primary" },
    { label: "UTM", value: indicadores.utm, variant: "info" },
    {
      label: "Sueldo Mínimo",
      value: indicadores.sueldoMinimo,
      variant: "success",
    },
    {
      label: "Tope Imponible",
      value: indicadores.topeImponible,
      variant: "warning",
    },
  ];

  return (
    <div className="bg-white rounded-4 shadow-lg p-4 mb-4">
      <Row className="g-3">
        {items.map((item, index) => (
          <Col key={index} md={3} sm={6}>
            <Card className={`border-${item.variant} text-center h-100`}>
              <Card.Body>
                <small className="text-muted text-uppercase fw-semibold d-block mb-2">
                  {item.label}
                </small>
                <h4 className={`mb-0 text-${item.variant} fw-bold`}>
                  ${item.value.toLocaleString("es-CL")}
                </h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Indicadores;
