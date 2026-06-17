import { useState, useEffect } from "react";
import Formularios from "./components/Formularios";
import ParticipanteCard from "./components/ParticipanteCard";
import Filtros from "./components/Filtros";
import { Participante } from "./models/Participante";

function App() {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroModalidad, setFiltroModalidad] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("participantes");
    if (data) {
      setParticipantes(JSON.parse(data));
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (cargado) {
      localStorage.setItem("participantes", JSON.stringify(participantes));
    }
  }, [participantes, cargado]);

  const agregarParticipante = (nuevo: Participante) => {
    setParticipantes([...participantes, nuevo]);
  };

  const eliminarParticipante = (id: number) => {
    setParticipantes(participantes.filter((p) => p.id !== id));
  };

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroModalidad("");
    setFiltroNivel("");
  };

  const resetearDatos = () => {
    localStorage.removeItem("participantes");
    setParticipantes([]);
  };

  const participantesFiltrados = participantes.filter((p) => {
    return (
      p.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      (filtroModalidad === "" || p.modalidad === filtroModalidad) &&
      (filtroNivel === "" || p.nivel === filtroNivel)
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Registro de Eventos Tecnológicos
      </h1>

      <p className="mb-4 font-semibold">
        Mostrando {participantesFiltrados.length} de {participantes.length}
      </p>

      <button onClick={resetearDatos} className="bg-red-600 text-white px-4 py-2 rounded mb-4">
        Resetear datos
      </button>

      <Formularios onAgregar={agregarParticipante} />

      <Filtros
        filtroNombre={filtroNombre}
        setFiltroNombre={setFiltroNombre}
        filtroModalidad={filtroModalidad}
        setFiltroModalidad={setFiltroModalidad}
        filtroNivel={filtroNivel}
        setFiltroNivel={setFiltroNivel}
        limpiarFiltros={limpiarFiltros}
      />

      {participantesFiltrados.length === 0 ? (
        <p>No hay participantes</p>
      ) : (
        participantesFiltrados.map((p) => (
          <ParticipanteCard key={p.id} participante={p} onEliminar={eliminarParticipante} />
        ))
      )}
    </div>
  );
}

export default App;