from typing import Generator
from app.db.session import SessionLocal

def get_db() -> Generator:
    """
    Dependency para obtener sesión de DB.
    Se cierra automáticamente después de cada request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
