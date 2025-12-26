"""
Script para crear usuarios admin en la base de datos.

Uso:
python scripts/create_user.py
"""

import sys
import uuid
from getpass import getpass

# Agregar el directorio raiz al path
sys.path.insert(0, '.')

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash


def create_user():
    print("=== Crear Usuario Admin ===\n")
    
    # Solicitar datos
    email = input("Email: ").strip()
    full_name = input("Nombre completo: ").strip()
    password = getpass("Contraseña: ")
    password_confirm = getpass("Confirmar contraseña: ")
    
    # Validaciones
    if not email or not password:
        print("❌ Email y contraseña son requeridos")
        return
    
    if password != password_confirm:
        print("❌ Las contraseñas no coinciden")
        return
    
    # Conectar a la base de datos
    db = SessionLocal()
    
    try:
        # Verificar si el usuario ya existe
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"❌ Ya existe un usuario con el email {email}")
            return
        
        # Crear usuario
        new_user = User(
            id=uuid.uuid4(),
            email=email,
            hashed_password=get_password_hash(password),
            full_name=full_name if full_name else None,
            role="admin",
            is_active=True
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        print(f"\n✅ Usuario creado exitosamente:")
        print(f"   ID: {new_user.id}")
        print(f"   Email: {new_user.email}")
        print(f"   Nombre: {new_user.full_name}")
        print(f"   Role: {new_user.role}")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error al crear usuario: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    create_user()
    