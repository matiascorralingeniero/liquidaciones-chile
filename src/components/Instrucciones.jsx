import React from "react";
import { Card } from "react-bootstrap";
import { Info } from "lucide-react";

const Instrucciones = () => {
  return (
    <Card className="shadow-lg border-0 no-print">
      <Card.Header className="bg-info text-white">
        <div className="d-flex align-items-center gap-2">
          <Info size={24} />
          <h5 className="mb-0 fw-bold">Instrucciones de Uso</h5>
        </div>
      </Card.Header>
      <Card.Body className="p-4">
        <ul className="list-unstyled">
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-primary">
            ✅ Completa los datos de la empresa (nombre, RUT y mes de pago)
          </li>
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-primary">
            ✅ <strong>JUBILADOS:</strong> Marca la casilla si es jubilado (no
            cotiza AFP ni AFC)
          </li>
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-primary">
            ✅ <strong>HORAS EXTRAS:</strong> Ingresa cantidad - se calculan al
            50% automáticamente
          </li>
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-primary">
            ✅ <strong>GRATIFICACIÓN LEGAL:</strong> Activa checkbox para
            calcular 25% del imponible (tope 4.75 IMM)
          </li>
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-primary">
            ✅ <strong>GRATIFICACIÓN MANUAL:</strong> Activa checkbox e ingresa
            monto personalizado
          </li>
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-primary">
            ✅ <strong>DÍAS DE AUSENCIA:</strong> Ingresa días (máx 30) -
            descuenta proporcionalmente del sueldo base
          </li>
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-primary">
            ✅ <strong>TIPO DE CONTRATO:</strong> Indefinido (trabajador 0.6% +
            empleador 2.4%) o Plazo Fijo (solo empleador 3.0%)
          </li>
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-primary">
            ✅ Sistema calcula todo según legislación chilena vigente (Enero
            2026)
          </li>
          <li className="mb-3 p-3 bg-light rounded border-start border-4 border-success">
            ✅ <strong>Imprimir:</strong> Genera liquidación oficial con firmas
            lista para entregar
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default Instrucciones;
