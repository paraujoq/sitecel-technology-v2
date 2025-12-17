-- ============================================================================
-- Sitecel Technology v2 - Database Schema
-- Version: 1.0
-- Date: 2025-12-17
-- Description: Schema completo para gestión de proyectos
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLA: categories
-- Descripción: Categorías de proyectos (Telecom, Construcción, etc.)
-- ============================================================================

CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Índices
CREATE INDEX idx_categories_active ON categories(active);
CREATE INDEX idx_categories_order ON categories(display_order);

-- Datos iniciales
INSERT INTO categories (id, name, description, display_order) VALUES
('telecom-it', 'Telecom & IT Infrastructure', 'Proyectos de telecomunicaciones y tecnología de la información', 1),
('electricidad', 'Ingeniería Eléctrica', 'Proyectos de instalaciones eléctricas y sistemas eléctricos', 2),
('construccion', 'Construcción', 'Obras civiles, remodelaciones y construcción general', 3),
('energias-limpias', 'Energías Limpias', 'Proyectos de energía renovable y sustentable', 4);

-- ============================================================================
-- TABLA: projects
-- Descripción: Tabla principal de proyectos
-- ============================================================================

CREATE TABLE projects (
    -- Identificadores
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    
    -- Información básica
    title VARCHAR(300) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL REFERENCES categories(id),
    
    -- Estado
    published BOOLEAN DEFAULT false NOT NULL,
    
    -- Detalles del proyecto
    client VARCHAR(200),
    location VARCHAR(200),
    start_date DATE,
    duration VARCHAR(50),
    
    -- Arrays de datos
    tags TEXT[],
    highlights TEXT[],
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Constraints
    CONSTRAINT projects_slug_check CHECK (slug ~ '^[a-z0-9-]+$')
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_start_date ON projects(start_date DESC);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLA: project_images
-- Descripción: Imágenes asociadas a proyectos
-- ============================================================================

CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    
    -- Datos de imagen
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    caption TEXT,
    
    -- Orden de visualización
    display_order INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Índices
CREATE INDEX idx_images_project ON project_images(project_id);
CREATE INDEX idx_images_order ON project_images(project_id, display_order);

-- ============================================================================
-- TABLA: project_videos
-- Descripción: Videos asociados a proyectos
-- ============================================================================

CREATE TABLE project_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    
    -- Datos de video
    video_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    title VARCHAR(200),
    duration INTEGER,  -- Duración en segundos
    
    -- Orden de visualización
    display_order INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Índices
CREATE INDEX idx_videos_project ON project_videos(project_id);
CREATE INDEX idx_videos_order ON project_videos(project_id, display_order);

-- ============================================================================
-- TABLA: users (para autenticación en Fase 1)
-- Descripción: Usuarios admin del sistema
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    role VARCHAR(20) DEFAULT 'viewer' NOT NULL,  -- 'admin', 'viewer'
    is_active BOOLEAN DEFAULT true NOT NULL,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT users_role_check CHECK (role IN ('admin', 'viewer'))
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);

-- Trigger para updated_at en users
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Usuario admin por defecto (password: admin123 - CAMBIAR EN PRODUCCIÓN)
-- Hash generado con bcrypt
INSERT INTO users (email, hashed_password, full_name, role, is_active) VALUES
('pedro@sitecel.cl', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lWnJVMQm7ufG', 'Pedro Araujo', 'admin', true);

-- ============================================================================
-- VISTAS ÚTILES
-- ============================================================================

-- Vista: Proyectos con conteo de imágenes y videos
CREATE VIEW projects_with_media_count AS
SELECT 
    p.*,
    COUNT(DISTINCT pi.id) as images_count,
    COUNT(DISTINCT pv.id) as videos_count
FROM projects p
LEFT JOIN project_images pi ON p.id = pi.project_id
LEFT JOIN project_videos pv ON p.id = pv.project_id
GROUP BY p.id;

-- Vista: Proyectos publicados (para API pública)
CREATE VIEW published_projects AS
SELECT * FROM projects WHERE published = true;

-- ============================================================================
-- FUNCIONES ÚTILES
-- ============================================================================

-- Función: Generar slug desde título
CREATE OR REPLACE FUNCTION generate_slug(title_text TEXT)
RETURNS TEXT AS $$
DECLARE
    slug_text TEXT;
BEGIN
    -- Convertir a minúsculas, reemplazar espacios por guiones, remover caracteres especiales
    slug_text := lower(title_text);
    slug_text := regexp_replace(slug_text, '[^a-z0-9\s-]', '', 'g');
    slug_text := regexp_replace(slug_text, '\s+', '-', 'g');
    slug_text := regexp_replace(slug_text, '-+', '-', 'g');
    slug_text := trim(both '-' from slug_text);
    
    RETURN slug_text;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Función: Contar proyectos por categoría
CREATE OR REPLACE FUNCTION count_projects_by_category()
RETURNS TABLE(category_id VARCHAR, category_name VARCHAR, project_count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.name,
        COUNT(p.id)
    FROM categories c
    LEFT JOIN projects p ON c.id = p.category AND p.published = true
    GROUP BY c.id, c.name
    ORDER BY c.display_order;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMENTARIOS EN TABLAS (Documentación)
-- ============================================================================

COMMENT ON TABLE projects IS 'Tabla principal de proyectos de Sitecel Technology';
COMMENT ON COLUMN projects.slug IS 'URL-friendly identifier, ej: implementacion-red-volte-vowifi';
COMMENT ON COLUMN projects.duration IS 'Duración en formato flexible: "3 años", "6 meses", "45 días"';
COMMENT ON COLUMN projects.tags IS 'Array de tags para búsqueda y filtrado';
COMMENT ON COLUMN projects.highlights IS 'Array de logros destacados del proyecto';

COMMENT ON TABLE project_images IS 'Imágenes asociadas a proyectos';
COMMENT ON COLUMN project_images.display_order IS 'Orden de visualización (menor = primero)';

COMMENT ON TABLE project_videos IS 'Videos asociados a proyectos (locales o YouTube/Vimeo)';

COMMENT ON TABLE users IS 'Usuarios del sistema admin';
COMMENT ON COLUMN users.hashed_password IS 'Password hasheado con bcrypt';

-- ============================================================================
-- GRANTS (Permisos) - Ajustar según necesidad
-- ============================================================================

-- Si usas un usuario específico para la app (recomendado en producción):
-- CREATE USER sitecel_app WITH PASSWORD 'password_seguro';
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sitecel_app;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sitecel_app;

-- ============================================================================
-- ESTADÍSTICAS Y VERIFICACIÓN
-- ============================================================================

-- Ver todas las tablas creadas
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Ver conteo de registros por tabla
SELECT 
    'categories' as table_name, COUNT(*) as records FROM categories
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'project_images', COUNT(*) FROM project_images
UNION ALL
SELECT 'project_videos', COUNT(*) FROM project_videos
UNION ALL
SELECT 'users', COUNT(*) FROM users;

-- ============================================================================
-- FIN DEL SCHEMA
-- ============================================================================

-- Nota: Este schema está diseñado para preservar 100% de los datos actuales
-- de config/projects.ts y agregar funcionalidad para el CMS admin.
