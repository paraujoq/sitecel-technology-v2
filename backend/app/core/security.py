from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verificar password - truncar a 72 bytes para bcrypt"""
    try:
        # Convertir a bytes y truncar
        password_bytes = plain_password.encode('utf-8')[:72]
        # Volver a string
        truncated_password = password_bytes.decode('utf-8', errors='ignore')
        return pwd_context.verify(truncated_password, hashed_password)
    except Exception as e:
        print(f"❌ Error verificando password: {e}")
        return False

def get_password_hash(password: str) -> str:
    """Hashear password - truncar a 72 bytes para bcrypt"""
    try:
        # Convertir a bytes y truncar
        password_bytes = password.encode('utf-8')[:72]
        # Volver a string
        truncated_password = password_bytes.decode('utf-8', errors='ignore')
        return pwd_context.hash(truncated_password)
    except Exception as e:
        print(f"❌ Error hasheando password: {e}")
        raise

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Crear token JWT"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict | None:
    """Verificar token JWT"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None