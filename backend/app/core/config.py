import os
from typing import List

class Settings:
    def __init__(self):
        # DEBUG: Imprimir para ver qué está leyendo
        db_url = os.environ.get("DATABASE_URL")
        print(f"🔍 DEBUG: DATABASE_URL from env = {db_url[:50] if db_url else 'NOT SET'}...")
        print(f"🔍 DEBUG: All env vars with DATABASE: {[k for k in os.environ.keys() if 'DATABASE' in k]}")
        
        # Leer variables
        self.DATABASE_URL = db_url
        self.SECRET_KEY = os.environ.get("SECRET_KEY")
        self.ALGORITHM = os.environ.get("ALGORITHM", "HS256")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
        self.ENVIRONMENT = os.environ.get("ENVIRONMENT", "development")
        self.DEBUG = os.environ.get("DEBUG", "False").lower() == "true"
        self.ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "https://sitecel.cl,https://www.sitecel.cl")
        
        # Validar
        if not self.DATABASE_URL:
            raise ValueError(f"❌ DATABASE_URL is required but got: {self.DATABASE_URL}")
        if not self.SECRET_KEY:
            raise ValueError(f"❌ SECRET_KEY is required")
            
        print(f"✅ Config loaded: DB={self.DATABASE_URL[:30]}... ENV={self.ENVIRONMENT}")
    
    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

settings = Settings()