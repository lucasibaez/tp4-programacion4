from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base

# 🔹 DB
DATABASE_URL = "sqlite:///./participantes.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# 🔹 Modelo DB
class ParticipanteDB(Base):
    __tablename__ = "participantes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    email = Column(String)
    edad = Column(Integer)
    pais = Column(String)
    modalidad = Column(String)
    tecnologias = Column(String)  # guardamos como texto
    nivel = Column(String)
    aceptaTerminos = Column(Boolean)

# 🔹 Crear tabla
Base.metadata.create_all(bind=engine)

# 🔹 Modelo entrada
class Participante(BaseModel):
    id: int
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    tecnologias: list[str]
    nivel: str
    aceptaTerminos: bool

app = FastAPI()

# 🔥 CORS (MUY IMPORTANTE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 GET
@app.get("/participantes")
def obtener_participantes():
    db = SessionLocal()
    participantes = db.query(ParticipanteDB).all()

    resultado = []
    for p in participantes:
        resultado.append({
            "id": p.id,
            "nombre": p.nombre,
            "email": p.email,
            "edad": p.edad,
            "pais": p.pais,
            "modalidad": p.modalidad,
            "tecnologias": p.tecnologias.split(",") if p.tecnologias else [],
            "nivel": p.nivel,
            "aceptaTerminos": p.aceptaTerminos
        })

    return resultado

# 🔹 POST
@app.post("/participantes")
def crear_participante(p: Participante):
    db = SessionLocal()

    nuevo = ParticipanteDB(
        id=p.id,
        nombre=p.nombre,
        email=p.email,
        edad=p.edad,
        pais=p.pais,
        modalidad=p.modalidad,
        tecnologias=",".join(p.tecnologias),
        nivel=p.nivel,
        aceptaTerminos=p.aceptaTerminos
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return p

# 🔹 DELETE
@app.delete("/participantes/{id}")
def eliminar_participante(id: int):
    db = SessionLocal()
    participante = db.query(ParticipanteDB).filter(ParticipanteDB.id == id).first()

    if participante:
        db.delete(participante)
        db.commit()

    return {"ok": True} 