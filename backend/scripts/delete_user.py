"""
Script para eliminar usuarios de la base de datos.

Uso:
python scripts/delete_user.py
"""

import sys

sys.path.insert(0, '.')

from app.db.session import SessionLocal
from app.models.user import User


def delete_user():
    print("=== Eliminar Usuario ===\n")
    
    db = SessionLocal()
    
    try:
        # Mostrar usuarios
        users = db.query(User).all()
        
        if not users:
            print("No hay usuarios en la base de datos")
            return
        
        print("Usuarios existentes:")
        for i, user in enumerate(users, 1):
            print(f"{i}. {user.email} - {user.full_name} ({user.role})")
        
        # Solicitar email a eliminar
        email = input("\nEmail del usuario a eliminar: ").strip()
        
        # Buscar usuario
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            print(f"❌ No se encontró usuario con email {email}")
            return
        
        # Confirmar
        confirm = input(f"¿Eliminar {user.email} ({user.full_name})? (s/n): ").strip().lower()
        
        if confirm != 's':
            print("Cancelado")
            return
        
        # Eliminar
        db.delete(user)
        db.commit()
        
        print(f"✅ Usuario {email} eliminado exitosamente")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    delete_user()
    