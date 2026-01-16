from sqlalchemy import Column, String, Text, Boolean, Date, DateTime, Integer, ARRAY, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.db.session import Base

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    icon = Column(String(50))
    display_order = Column(Integer, default=0)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relación con proyectos
    projects = relationship("Project", back_populates="category_rel")
    
    def __repr__(self):
        return f"<Category(id='{self.id}', name='{self.name}')>"


class Project(Base):
    __tablename__ = "projects"
    
    # Identificadores
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    
    # Información básica
    title = Column(String(300), nullable=False)
    description = Column(Text)
    category = Column(String(50), ForeignKey("categories.id"), nullable=False, index=True)
    
    # Estado
    published = Column(Boolean, default=False, nullable=False, index=True)
    
    # Detalles del proyecto
    client = Column(String(200))
    location = Column(String(200))
    start_date = Column(Date)
    duration = Column(String(50))
    
    # Arrays
    tags = Column(ARRAY(Text))
    highlights = Column(ARRAY(Text))
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    category_rel = relationship("Category", back_populates="projects")
    images = relationship("ProjectImage", back_populates="project", cascade="all, delete-orphan")
    videos = relationship("ProjectVideo", back_populates="project", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Project(slug='{self.slug}', title='{self.title}')>"


class ProjectImage(Base):
    __tablename__ = "project_images"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    url = Column(String(500), nullable=False)
    alt_text = Column(String(255))
    caption = Column(Text)
    display_order = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relación
    project = relationship("Project", back_populates="images")
    
    def __repr__(self):
        return f"<ProjectImage(url='{self.url}')>"


class ProjectVideo(Base):
    __tablename__ = "project_videos"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    
    video_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500))
    title = Column(String(200))
    duration = Column(Integer)
    display_order = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relación
    project = relationship("Project", back_populates="videos")
    
    def __repr__(self):
        return f"<ProjectVideo(url='{self.video_url}')>"
