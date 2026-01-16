from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.core.security import verify_token
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

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

def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> User:
    """
    Dependency para obtener el usuario actual desde el JWT token.
    
    Raises:
        HTTPException 401: Si el token es inválido o el usuario no existe
    """
    print(f"🔐 [DEPS] get_current_user called")
    print(f"📦 [DEPS] Token (first 20): {token[:20]}...")
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Verificar token - retorna el payload completo
    payload = verify_token(token)
    print(f"📦 [DEPS] Payload from verify_token: {payload}")
    
    if payload is None:
        print(f"❌ [DEPS] Token inválido - payload es None")
        raise credentials_exception
    
    # Extraer email del payload
    email = payload.get("sub")
    print(f"📧 [DEPS] Email extraído: {email}")
    
    if email is None:
        print(f"❌ [DEPS] Email no encontrado en payload")
        raise credentials_exception
    
    # Buscar usuario
    print(f"🔍 [DEPS] Buscando usuario: {email}")
    user = db.query(User).filter(User.email == email).first()
    
    if user is None:
        print(f"❌ [DEPS] Usuario no encontrado: {email}")
        raise credentials_exception
    
    print(f"✅ [DEPS] Usuario encontrado: {user.email}")
    
    # Verificar que esté activo
    if not user.is_active:
        print(f"❌ [DEPS] Usuario inactivo: {email}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo"
        )
    
    print(f"✅ [DEPS] Usuario activo, retornando user")
    return user

def get_current_active_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Dependency para verificar que el usuario sea admin.
    
    Raises:
        HTTPException 403: Si el usuario no es admin
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos de administrador"
        )
    return current_user