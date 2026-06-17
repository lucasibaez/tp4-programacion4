import { Participante } from "../models/Participante";

type Props = {
  participante: Participante;
  onEliminar: (id: number) => void;
};

export default function ParticipanteCard({ participante, onEliminar }: Props) {
  const colorNivel = (nivel: string) => {
    if (nivel === "Principiante") return "bg-green-200";
    if (nivel === "Intermedio") return "bg-yellow-200";
    if (nivel === "Avanzado") return "bg-red-200";
    return "";
  };

  return (
    <div className="bg-white shadow rounded p-4 hover:shadow-lg transition">
      <h3 className="font-bold">{participante.nombre}</h3>

      <p>{participante.email}</p>
      <p>{participante.pais}</p>
      <p>{participante.modalidad}</p>

      <p className="text-sm mt-2">
        Tecnologías: {participante.tecnologias.join(", ")}
      </p>

      <span className={`px-2 py-1 rounded ${colorNivel(participante.nivel)}`}>
        {participante.nivel}
      </span>

      <button
        onClick={() => onEliminar(participante.id)}
        className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
      >
        Eliminar
      </button>
    </div>
  );
}