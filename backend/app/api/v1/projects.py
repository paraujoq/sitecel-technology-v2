from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.api.deps import get_db
from app.models.project import Project, ProjectImage, ProjectVideo
from app.schemas.project import ProjectCreate, ProjectRead, ProjectList

router = APIRouter()


@router.post("/projects", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo proyecto.
    
    - **title**: Título del proyecto (requerido)
    - **slug**: URL-friendly identifier (requerido, único)
    - **category**: ID de categoría (debe existir)
    - **published**: Estado de publicación (default: false)
    - **images**: Lista de imágenes (opcional)
    - **videos**: Lista de videos (opcional)
    """
    
    # Verificar que el slug no exista
    existing_project = db.query(Project).filter(Project.slug == project_in.slug).first()
    if existing_project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Project with slug '{project_in.slug}' already exists"
        )
    
    # Crear proyecto
    db_project = Project(
        title=project_in.title,
        slug=project_in.slug,
        description=project_in.description,
        category=project_in.category,
        published=project_in.published,
        client=project_in.client,
        location=project_in.location,
        start_date=project_in.start_date,
        duration=project_in.duration,
        tags=project_in.tags,
        highlights=project_in.highlights
    )
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    # Agregar imágenes si existen
    for img in project_in.images:
        db_image = ProjectImage(
            project_id=db_project.id,
            url=img.url,
            alt_text=img.alt_text,
            caption=img.caption,
            display_order=img.display_order
        )
        db.add(db_image)
    
    # Agregar videos si existen
    for vid in project_in.videos:
        db_video = ProjectVideo(
            project_id=db_project.id,
            video_url=vid.video_url,
            thumbnail_url=vid.thumbnail_url,
            title=vid.title,
            duration=vid.duration,
            display_order=vid.display_order
        )
        db.add(db_video)
    
    db.commit()
    db.refresh(db_project)
    
    return db_project


@router.get("/projects", response_model=List[ProjectList])
def list_projects(
    skip: int = 0,
    limit: int = 100,
    published: bool = None,
    category: str = None,
    db: Session = Depends(get_db)
):
    """
    Listar proyectos con filtros opcionales.
    
    - **skip**: Número de registros a saltar (paginación)
    - **limit**: Número máximo de registros a retornar
    - **published**: Filtrar por estado de publicación
    - **category**: Filtrar por categoría
    """
    query = db.query(Project)
    
    if published is not None:
        query = query.filter(Project.published == published)
    
    if category:
        query = query.filter(Project.category == category)
    
    projects = query.offset(skip).limit(limit).all()
    return projects


@router.get("/projects/{project_id}", response_model=ProjectRead)
def get_project(
    project_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Obtener un proyecto por su ID (con imágenes y videos).
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found"
        )
    
    return project
