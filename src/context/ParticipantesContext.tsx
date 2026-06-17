import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Participante } from "../models/Participante";

interface ContextType {
  participantes: Participante[];
  agregar: (p: Participante) => void;
  eliminar: (id: number) => void;
  resetear: () => void;
}

const ParticipantesContext = createContext<ContextType | undefined>(undefined);

export const ParticipantesProvider = ({ children }: { children: ReactNode }) => {
  const [participantes, setParticipantes] = useState<Participante[]>([]);

  // GET 
  useEffect(() => {
    fetch("http://localhost:8000/participantes")
      .then((res) => res.json())
      .then((data) => setParticipantes(data)) //recibe el json de lo lei en el backend
      .catch((err) => console.error(err));
  }, []);

  // POST
  const agregar = (p: Participante) => {
    fetch("http://localhost:8000/participantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(p),
    })
      .then((res) => res.json())
      .then((nuevo) => {
        setParticipantes((prev) => [...prev, nuevo]);
      })
      .catch((err) => console.error(err));
  };

  // DELETE
  const eliminar = (id: number) => {
    fetch(`http://localhost:8000/participantes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setParticipantes((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => console.error(err));
  };

  //  RESET
  const resetear = () => {
    setParticipantes([]);
  };

  return (
    <ParticipantesContext.Provider
      value={{ participantes, agregar, eliminar, resetear }}
    >
      {children}
    </ParticipantesContext.Provider>
  );
};

export const useParticipantes = () => {
  const context = useContext(ParticipantesContext);
  if (!context) {
    throw new Error("useParticipantes debe usarse dentro del Provider");
  }
  return context;
};