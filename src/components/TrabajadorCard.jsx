import React from "react";
import { Card, Button } from "react-bootstrap";
import { FileText, Trash2 } from "lucide-react";
import DatosBasicos from "./DatosBasicos";
import Haberes from "./Haberes";
import Descuentos from "./Descuentos";
import LiquidacionResult from "./LiquidacionResult";

const TrabajadorCard = ({
  trabajador,
  index,
  liquidacion,
  canDelete,
  onUpdate,
  onDelete,
}) => {
  return (
    <Card className="mb-4 shadow-lg border-0 no-print">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center py-3">
        <div className="d-flex align-items-center gap-2">
          <FileText size={24} />
          <h5 className="mb-0 fw-bold">Trabajador {index + 1}</h5>
        </div>
        {canDelete && (
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            className="d-flex align-items-center gap-1"
          >
            <Trash2 size={18} />
            Eliminar
          </Button>
        )}
      </Card.Header>

      <Card.Body className="p-4">
        <DatosBasicos trabajador={trabajador} onUpdate={onUpdate} />
        <Haberes
          trabajador={trabajador}
          liquidacion={liquidacion}
          onUpdate={onUpdate}
        />
        <Descuentos
          trabajador={trabajador}
          liquidacion={liquidacion}
          onUpdate={onUpdate}
        />
        <LiquidacionResult trabajador={trabajador} liquidacion={liquidacion} />
      </Card.Body>
    </Card>
  );
};

export default TrabajadorCard;
