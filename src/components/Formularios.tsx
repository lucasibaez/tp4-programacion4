import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Participante } from "../models/Participante";

type Props = {
  onAgregar: (p: Participante) => void;
};

export default function Formularios({ onAgregar }: Props) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    edad: "",
    pais: "Argentina",
    modalidad: "",
    tecnologias: [] as string[],
    nivel: "Principiante",
    aceptaTerminos: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "tecnologias") {
      const checked = (e.target as HTMLInputElement).checked;
      let nuevas = [...form.tecnologias];

      if (checked) nuevas.push(value);
      else nuevas = nuevas.filter((t) => t !== value);

      setForm({ ...form, tecnologias: nuevas });
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 🔥 VALIDACIONES COMPLETAS
    if (!form.nombre.trim()) return alert("Nombre obligatorio");
    if (!form.email.trim()) return alert("Email obligatorio");
    if (!form.edad || Number(form.edad) <= 0) return alert("Edad inválida");
    if (!form.modalidad) return alert("Seleccioná modalidad");
    if (form.tecnologias.length === 0) return alert("Seleccioná tecnologías");
    if (!form.aceptaTerminos) return alert("Debés aceptar términos");

    const nuevo: Participante = {
      id: Date.now(),
      nombre: form.nombre,
      email: form.email,
      edad: Number(form.edad),
      pais: form.pais,
      modalidad: form.modalidad,
      tecnologias: form.tecnologias,
      nivel: form.nivel,
      aceptaTerminos: form.aceptaTerminos,
    };

    onAgregar(nuevo);

    setForm({
      nombre: "",
      email: "",
      edad: "",
      pais: "Argentina",
      modalidad: "",
      tecnologias: [],
      nivel: "Principiante",
      aceptaTerminos: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded" />

      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />

      <input name="edad" type="number" value={form.edad} onChange={handleChange} placeholder="Edad" className="border p-2 rounded" />

      <select name="pais" value={form.pais} onChange={handleChange} className="border p-2 rounded">
        <option>Argentina</option>
        <option>Chile</option>
        <option>Uruguay</option>
        <option>México</option>
        <option>España</option>
      </select>

      {/* Radios */}
      <div className="md:col-span-2 flex gap-4">
        {["Presencial", "Virtual", "Híbrido"].map((m) => (
          <label key={m}>
            <input
              type="radio"
              name="modalidad"
              value={m}
              checked={form.modalidad === m}
              onChange={handleChange}
            /> {m}
          </label>
        ))}
      </div>

      {/* Checkboxes */}
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3">
        {["React", "Angular", "Vue", "Node", "Python", "Java"].map((t) => (
          <label key={t}>
            <input
              type="checkbox"
              name="tecnologias"
              value={t}
              checked={form.tecnologias.includes(t)}
              onChange={handleChange}
            /> {t}
          </label>
        ))}
      </div>

      <select name="nivel" value={form.nivel} onChange={handleChange} className="border p-2 rounded">
        <option>Principiante</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="aceptaTerminos"
          checked={form.aceptaTerminos}
          onChange={handleChange}
        /> Acepto términos
      </label>

      <button className="md:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Registrar
      </button>

    </form>
  );
}