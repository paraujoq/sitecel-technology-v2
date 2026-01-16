"""
Script para migrar los 2 proyectos existentes de TypeScript a PostgreSQL
"""
import sys
from pathlib import Path

# Agregar el directorio padre al path para importar app
sys.path.append(str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.models.project import Project, ProjectImage, ProjectVideo
import uuid
from datetime import date

def migrate_projects():
    """Migrar proyectos desde config/projects.ts a PostgreSQL"""
    
    db: Session = SessionLocal()
    
    try:
        print("🚀 Iniciando migración de proyectos...")
        
        # ================================================================
        # PROYECTO 1: VoLTE/VoWiFi
        # ================================================================
        
        print("\n📡 Migrando: Implementación VoLTE/VoWiFi...")
        
        # Verificar si ya existe
        existing_volte = db.query(Project).filter(
            Project.slug == "implementacion-red-volte-vowifi"
        ).first()
        
        if existing_volte:
            print("   ⚠️  Ya existe, saltando...")
        else:
            project_volte = Project(
                id=uuid.uuid4(),
                slug="implementacion-red-volte-vowifi",
                title="Implementación de VoLTE/VoWiFi en el Caribe",
                description="Implementación de una red VoLTE/VoWiFi en diferentes países del Caribe (programa de 4 proyectos). Este proyecto no lo realizó Sitecel, pero si su Director de Proyectos. Se manejó como un producto E2E coordinando equipos de red, transporte, sistemas (oss/bss, aprovisionamiento, crm, ocs, mediación), marketing/comercial",
                category="telecom-it",
                published=True,
                client="Operador Móvil Regional en el Caribe",
                location="Región Caribeña, varios países",
                start_date=date(2024, 6, 15),
                duration="3 años",
                tags=["5G", "VoLTE/VoWiFi", "Instalación de Redes", "Core Móvil", "Desarrollo de Sistemas", "Cloud", "API", "Microservicios"],
                highlights=["3 Core IMS instalados", "5 desarrollos en aprovisionamiento incluyendo APIs, AWS y Microservicios"]
            )
            
            db.add(project_volte)
            db.flush()  # Para obtener el ID
            
            # Agregar imágenes
            images_volte = [
                ProjectImage(
                    id=uuid.uuid4(),
                    project_id=project_volte.id,
                    url="/images/projects/volte-vowifi/arquitecture.png",
                    alt_text="Arquitectura VoLTE/VoWiFi",
                    display_order=1
                ),
                ProjectImage(
                    id=uuid.uuid4(),
                    project_id=project_volte.id,
                    url="/images/projects/volte-vowifi/countries.jpg",
                    alt_text="Países del Caribe",
                    display_order=2
                )
            ]
            
            for img in images_volte:
                db.add(img)
            
            print(f"   ✅ Proyecto creado con ID: {project_volte.id}")
            print(f"   ✅ {len(images_volte)} imágenes agregadas")
        
        # ================================================================
        # PROYECTO 2: Reparación de Filtración
        # ================================================================
        
        print("\n🏗️  Migrando: Reparación de filtración...")
        
        existing_filtracion = db.query(Project).filter(
            Project.slug == "reparacion-filtracion"
        ).first()
        
        if existing_filtracion:
            print("   ⚠️  Ya existe, saltando...")
        else:
            project_filtracion = Project(
                id=uuid.uuid4(),
                slug="reparacion-filtracion",
                title="Reparación de filtración en departamento residencial",
                description="Se localizó la filtración, se demolió el área afectada, se reparó la filtración y se reconstruyó el espacio afectado.",
                category="construccion",
                published=True,
                client="Particular",
                location="Centro, Santiago",
                start_date=date(2025, 8, 28),
                duration="3 días",
                tags=["Remodelación", "Departamento residencial", "Tuberías"],
                highlights=["Trabajos en áreas residenciales", "Filtraciones resueltas exitosamente"]
            )
            
            db.add(project_filtracion)
            db.flush()
            
            # Agregar imágenes
            images_filtracion = [
                ProjectImage(
                    id=uuid.uuid4(),
                    project_id=project_filtracion.id,
                    url="/images/projects/reparacion-filtracion/filtracion7.jpg",
                    alt_text="Trabajo de reparación",
                    display_order=1
                ),
                ProjectImage(
                    id=uuid.uuid4(),
                    project_id=project_filtracion.id,
                    url="/images/projects/reparacion-filtracion/filtracion1.jpg",
                    alt_text="Estado inicial",
                    display_order=2
                ),
                ProjectImage(
                    id=uuid.uuid4(),
                    project_id=project_filtracion.id,
                    url="/images/projects/reparacion-filtracion/filtracion3.jpg",
                    alt_text="Proceso de demolición",
                    display_order=3
                ),
                ProjectImage(
                    id=uuid.uuid4(),
                    project_id=project_filtracion.id,
                    url="/images/projects/reparacion-filtracion/filtracion4.jpg",
                    alt_text="Reparación en progreso",
                    display_order=4
                ),
                ProjectImage(
                    id=uuid.uuid4(),
                    project_id=project_filtracion.id,
                    url="/images/projects/reparacion-filtracion/filtracion5.jpg",
                    alt_text="Reconstrucción",
                    display_order=5
                ),
                ProjectImage(
                    id=uuid.uuid4(),
                    project_id=project_filtracion.id,
                    url="/images/projects/reparacion-filtracion/filtracion6.jpg",
                    alt_text="Resultado final",
                    display_order=6
                )
            ]
            
            for img in images_filtracion:
                db.add(img)
            
            # Agregar video
            video = ProjectVideo(
                id=uuid.uuid4(),
                project_id=project_filtracion.id,
                video_url="/images/projects/reparacion-filtracion/filtracion2-video.mp4",
                title="Video del proceso de reparación",
                display_order=1
            )
            db.add(video)
            
            print(f"   ✅ Proyecto creado con ID: {project_filtracion.id}")
            print(f"   ✅ {len(images_filtracion)} imágenes agregadas")
            print(f"   ✅ 1 video agregado")
        
        # Commit final
        db.commit()
        
        print("\n" + "="*60)
        print("✅ MIGRACIÓN COMPLETADA")
        print("="*60)
        
        # Mostrar resumen
        total_projects = db.query(Project).count()
        total_images = db.query(ProjectImage).count()
        total_videos = db.query(ProjectVideo).count()
        
        print(f"\n📊 Resumen:")
        print(f"   Total proyectos en DB: {total_projects}")
        print(f"   Total imágenes: {total_images}")
        print(f"   Total videos: {total_videos}")
        
        # Listar proyectos
        print(f"\n📋 Proyectos en base de datos:")
        projects = db.query(Project).all()
        for p in projects:
            status = "✅ Publicado" if p.published else "📝 Borrador"
            print(f"   {status} {p.title} ({p.slug})")
        
    except Exception as e:
        print(f"\n❌ Error durante la migración: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("="*60)
    print("🔄 MIGRACIÓN DE PROYECTOS EXISTENTES")
    print("="*60)
    migrate_projects()
