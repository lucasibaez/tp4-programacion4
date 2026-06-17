import { useState } from "react";
 import Formularios from "./components/Formularios";
import ParticipanteCard from "./components/ParticipanteCard";
import Filtros from "./components/Filtros";
import { useParticipantes } from "./context/ParticipantesContext";

function Home() {
  const { participantes, agregar, eliminar, resetear } = useParticipantes();

  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroModalidad, setFiltroModalidad] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroModalidad("");
    setFiltroNivel("");
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

      {/* 🔴 RESET */}
      <button
        onClick={resetear}
        className="bg-red-600 text-white px-4 py-2 rounded mb-4"
      >
        Resetear datos
      </button>

      {/* ✅ FORMULARIO (FIX IMPORTANTE) */}
      <Formularios onAgregar={agregar} />

      {/* 🔎 FILTROS */}
      <Filtros
        filtroNombre={filtroNombre}
        setFiltroNombre={setFiltroNombre}
        filtroModalidad={filtroModalidad}
        setFiltroModalidad={setFiltroModalidad}
        filtroNivel={filtroNivel}
        setFiltroNivel={setFiltroNivel}
        limpiarFiltros={limpiarFiltros}
      />

      {/* 📋 LISTA */}
      {participantesFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">No hay participantes</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {participantesFiltrados.map((p) => (
            <ParticipanteCard
              key={p.id}
              participante={p}
              onEliminar={eliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;