import os
from typing import List

class Settings:
    def __init__(self):
        # Leer directamente de os.environ (más confiable en Railway)
        self.DATABASE_URL = os.environ.get("DATABASE_URL")
        self.SECRET_KEY = os.environ.get("SECRET_KEY")
        self.ALGORITHM = os.environ.get("ALGORITHM", "HS256")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
        self.ENVIRONMENT = os.environ.get("ENVIRONMENT", "development")
        self.DEBUG = os.environ.get("DEBUG", "False").lower() == "true"
        self.ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000")
        
        # Validar variables críticas
        if not self.DATABASE_URL:
            raise ValueError(f"DATABASE_URL is required. Found: {os.environ.get('DATABASE_URL', 'NOT SET')}")
        if not self.SECRET_KEY:
            raise ValueError(f"SECRET_KEY is required. Found: {os.environ.get('SECRET_KEY', 'NOT SET')}")
    
    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

settings = Settings()