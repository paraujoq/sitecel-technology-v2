from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import date, datetime
from uuid import UUID
import re

# ============================================================================
# SCHEMAS PARA IMAGES
# ============================================================================

class ProjectImageBase(BaseModel):
    url: str = Field(..., max_length=500)
    alt_text: Optional[str] = Field(None, max_length=255)
    caption: Optional[str] = None
    display_order: int = 0

class ProjectImageCreate(ProjectImageBase):
    pass

class ProjectImageRead(ProjectImageBase):
    id: UUID
    project_id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================================================
# SCHEMAS PARA VIDEOS
# ============================================================================

class ProjectVideoBase(BaseModel):
    video_url: str = Field(..., max_length=500)
    thumbnail_url: Optional[str] = Field(None, max_length=500)
    title: Optional[str] = Field(None, max_length=200)
    duration: Optional[int] = None
    display_order: int = 0

class ProjectVideoCreate(ProjectVideoBase):
    pass

class ProjectVideoRead(ProjectVideoBase):
    id: UUID
    project_id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================================================
# SCHEMAS PARA PROJECTS
# ============================================================================

class ProjectBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=300)
    slug: Optional[str] = None
    description: Optional[str] = None
    category: str = Field(..., max_length=50)
    published: bool = False
    client: Optional[str] = Field(None, max_length=200)
    location: Optional[str] = Field(None, max_length=200)
    start_date: Optional[date] = None
    duration: Optional[str] = Field(None, max_length=50)
    tags: List[str] = []
    highlights: List[str] = []
    
    @field_validator('slug')
    @classmethod
    def slug_must_be_valid(cls, v: str) -> str:
        if not re.match(r'^[a-z0-9-]+$', v):
            raise ValueError('Slug must contain only lowercase letters, numbers, and hyphens')
        return v

class ProjectCreate(ProjectBase):
    images: List[ProjectImageCreate] = []
    videos: List[ProjectVideoCreate] = []

class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=300)
    slug: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = Field(None, max_length=50)
    published: Optional[bool] = None
    client: Optional[str] = Field(None, max_length=200)
    location: Optional[str] = Field(None, max_length=200)
    start_date: Optional[date] = None
    duration: Optional[str] = Field(None, max_length=50)
    tags: Optional[List[str]] = None
    highlights: Optional[List[str]] = None
    images: Optional[List[ProjectImageCreate]] = None  # ← AGREGAR
    videos: Optional[List[ProjectVideoCreate]] = None  # ← AGREGAR

class ProjectRead(ProjectBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    images: List[ProjectImageRead] = []
    videos: List[ProjectVideoRead] = []
    
    class Config:
        from_attributes = True

class ProjectList(BaseModel):
    """Schema pasó de ser simplificado a completo, luego que la API no cargaba toda la data del backend, esta es la nueva versión"""
    id: UUID
    slug: str
    title: str
    description: Optional[str] = None
    category: str
    published: bool
    client: Optional[str] = None
    start_date: Optional[date] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    tags: List[str] = []
    highlights: List[str] = []
    created_at: datetime
    updated_at: datetime
    images: List["ProjectImageRead"] = []
    videos: List["ProjectVideoRead"] = []
    
    class Config:
        from_attributes = True
