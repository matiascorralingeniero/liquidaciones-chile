import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Plus } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/Header";
import Indicadores from "./components/Indicadores";
import TrabajadorCard from "./components/TrabajadorCard";
import LiquidacionImprimible from "./components/LiquidacionImprimible";
import Instrucciones from "./components/Instrucciones";
import { calcularLiquidacion } from "./utils/calculos";

function App() {
  const [trabajadores, setTrabajadores] = useState([
    {
      id: 1,
      nombre: "",
      rut: "",
      cargo: "",
      afp: "Capital",
      isapre: "Fonasa",
      planIsapre: 7.0,
      sueldoBase: 0,
      numHorasExtras: 0,
      tieneHorasExtrasPactadas: false,
      valorHoraExtraPactada: 0,
      bonos: 0,
      colacion: 0,
      movilizacion: 0,
      asigFamiliar: 0,
      anticipos: 0,
      prestamos: 0,
      esJubilado: false,
      gratificacion: 0,
      tieneGratificacionLegal: false,
      tieneGratificacionManual: false,
      diasAusencia: 0,
      tipoContrato: "indefinido",
    },
  ]);

  const [mesPago, setMesPago] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [rutEmpresa, setRutEmpresa] = useState("");

  const agregarTrabajador = () => {
    setTrabajadores([
      ...trabajadores,
      {
        id: Date.now(),
        nombre: "",
        rut: "",
        cargo: "",
        afp: "Capital",
        isapre: "Fonasa",
        planIsapre: 7.0,
        sueldoBase: 0,
        numHorasExtras: 0,
        tieneHorasExtrasPactadas: false,
        valorHoraExtraPactada: 0,
        bonos: 0,
        colacion: 0,
        movilizacion: 0,
        asigFamiliar: 0,
        anticipos: 0,
        prestamos: 0,
        esJubilado: false,
        gratificacion: 0,
        tieneGratificacionLegal: false,
        tieneGratificacionManual: false,
        diasAusencia: 0,
        tipoContrato: "indefinido",
      },
    ]);
  };

  const eliminarTrabajador = (id) => {
    setTrabajadores(trabajadores.filter((t) => t.id !== id));
  };

  const actualizarTrabajador = (id, campo, valor) => {
    setTrabajadores(
      trabajadores.map((t) => {
        if (t.id === id) {
          let updates = { [campo]: valor };

          // Gratificación: solo una puede estar activa
          if (campo === "tieneGratificacionLegal" && valor === true) {
            updates.tieneGratificacionManual = false;
            updates.gratificacion = 0; // Limpiar gratificación manual
          }

          if (campo === "tieneGratificacionManual" && valor === true) {
            updates.tieneGratificacionLegal = false;
          }

          // Horas extras: solo un tipo puede estar activo (aunque no son mutuamente excluyentes en este caso)
          // Si desactiva horas pactadas, limpiar el valor
          if (campo === "tieneHorasExtrasPactadas" && valor === false) {
            updates.valorHoraExtraPactada = 0;
          }

          return { ...t, ...updates };
        }
        return t;
      }),
    );
  };

  const imprimirLiquidacion = () => {
    window.print();
  };

  return (
    <div className="app-container py-4">
      <Container>
        <div className="no-print">
          <Header
            nombreEmpresa={nombreEmpresa}
            rutEmpresa={rutEmpresa}
            mesPago={mesPago}
            onNombreChange={setNombreEmpresa}
            onRutChange={setRutEmpresa}
            onMesChange={setMesPago}
            onImprimir={imprimirLiquidacion}
          />

          <Indicadores />
        </div>

        {trabajadores.map((trabajador, index) => {
          const liquidacion = calcularLiquidacion(trabajador);

          return (
            <React.Fragment key={trabajador.id}>
              <TrabajadorCard
                trabajador={trabajador}
                index={index}
                liquidacion={liquidacion}
                canDelete={trabajadores.length > 1}
                onUpdate={(campo, valor) =>
                  actualizarTrabajador(trabajador.id, campo, valor)
                }
                onDelete={() => eliminarTrabajador(trabajador.id)}
              />

              <LiquidacionImprimible
                trabajador={trabajador}
                liquidacion={liquidacion}
                nombreEmpresa={nombreEmpresa}
                rutEmpresa={rutEmpresa}
                mesPago={mesPago}
              />
            </React.Fragment>
          );
        })}

        <div className="text-center mb-4 no-print">
          <Button
            variant="primary"
            size="lg"
            onClick={agregarTrabajador}
            className="d-flex align-items-center gap-2 mx-auto"
          >
            <Plus size={24} />
            Agregar Trabajador
          </Button>
        </div>

        <Instrucciones />
      </Container>
    </div>
  );
}

export default App;
