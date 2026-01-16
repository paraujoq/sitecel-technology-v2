/**
 * Servicio para interactuar con la API de Sitecel
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1'

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  category: string
  published: boolean
  client: string
  location: string
  start_date: string | null
  duration: string | null
  tags: string[]
  highlights: string[]
  created_at: string
  updated_at: string
  images: ProjectImage[]
  videos: ProjectVideo[]
}

export interface ProjectImage {
  id: string
  url: string
  alt_text: string
  caption: string
  display_order: number
}

export interface ProjectVideo {
  id: string
  video_url: string
  thumbnail_url: string
  title: string
  duration: number
  display_order: number
}

/**
 * Obtener todos los proyectos publicados
 * Usa ISR (Incremental Static Regeneration) - revalida cada hora
 */
export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects?published=true`, {
      next: { revalidate: 3600 } // Revalidar cada hora (3600 segundos)
    })

    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Obtener proyectos por categoría
 * Usa ISR - revalida cada hora
 */
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/projects?published=true&category=${category}`,
      {
        next: { revalidate: 3600 } // Revalidar cada hora
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Obtener un proyecto por slug
 * Usa ISR - revalida cada hora
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    // Primero obtener todos los proyectos (porque no tenemos endpoint por slug aún)
    const projects = await getPublishedProjects()
    const project = projects.find(p => p.slug === slug)
    
    return project || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

/**
 * Obtener categorías únicas de proyectos publicados
 */
export async function getCategories(): Promise<string[]> {
  try {
    const projects = await getPublishedProjects()
    const categories = [...new Set(projects.map(p => p.category))]
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Obtener todos los proyectos (incluye borradores)
 * Usa no-store porque es para el admin (siempre datos frescos)
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      cache: 'no-store' // Admin necesita datos siempre frescos
    })

    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}
