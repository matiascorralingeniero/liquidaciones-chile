import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { indicadores } from "../utils/indicadores";
import { formatearRUT } from "../utils/formatear";

const DatosBasicos = ({ trabajador, onUpdate }) => {
  const handleRutChange = (e) => {
    const rutFormateado = formatearRUT(e.target.value);
    onUpdate("rut", rutFormateado);
  };

  return (
    <>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              value={trabajador.nombre}
              onChange={(e) => onUpdate("nombre", e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">RUT</Form.Label>
            <Form.Control
              type="text"
              value={trabajador.rut}
              onChange={handleRutChange}
              placeholder="12.345.678-9"
              maxLength={12}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">Cargo</Form.Label>
            <Form.Control
              type="text"
              value={trabajador.cargo}
              onChange={(e) => onUpdate("cargo", e.target.value)}
              placeholder="Ej: Contador"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Form.Check
            type="checkbox"
            id={`jubilado-${trabajador.id}`}
            label="¿Es jubilado/pensionado?"
            checked={trabajador.esJubilado}
            onChange={(e) => onUpdate("esJubilado", e.target.checked)}
            className="mt-4"
          />
        </Col>

        {!trabajador.esJubilado && (
          <Col md={3}>
            <Form.Group>
              <Form.Label className="fw-semibold">AFP</Form.Label>
              <Form.Select
                value={trabajador.afp}
                onChange={(e) => onUpdate("afp", e.target.value)}
              >
                {Object.keys(indicadores.afps).map((afp) => (
                  <option key={afp} value={afp}>
                    {afp}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        )}

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold">Salud</Form.Label>
            <Form.Select
              value={trabajador.isapre}
              onChange={(e) => onUpdate("isapre", e.target.value)}
            >
              <option value="Fonasa">Fonasa (7%)</option>
              <option value="Isapre">Isapre</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {trabajador.isapre === "Isapre" && (
          <Col md={3}>
            <Form.Group>
              <Form.Label className="fw-semibold">% Plan Isapre</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={trabajador.planIsapre}
                onChange={(e) => onUpdate("planIsapre", e.target.value)}
              />
            </Form.Group>
          </Col>
        )}

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold">Tipo de Contrato</Form.Label>
            <Form.Select
              value={trabajador.tipoContrato}
              onChange={(e) => onUpdate("tipoContrato", e.target.value)}
            >
              <option value="indefinido">Indefinido</option>
              <option value="plazo_fijo">Plazo Fijo/Obra o faena</option>
            </Form.Select>
            {trabajador.tipoContrato === "plazo_fijo" && (
              <Form.Text className="text-muted">
                ℹ️ Solo empleador aporta 3.0% AFC
              </Form.Text>
            )}
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              N° Cargas Familiares
            </Form.Label>
            <Form.Control
              type="number"
              value={trabajador.asigFamiliar}
              onChange={(e) => onUpdate("asigFamiliar", e.target.value)}
              min="0"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default DatosBasicos;
