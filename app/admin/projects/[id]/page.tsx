"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

interface Project {
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
  images: Array<{
    id: string
    url: string
    alt_text: string
    caption: string
    display_order: number
  }>
  videos: Array<{
    id: string
    video_url: string
    thumbnail_url: string
    title: string
    duration: number
    display_order: number
  }>
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/projects/${projectId}`)
      
      if (!response.ok) {
        throw new Error("Proyecto no encontrado")
      }

      const data = await response.json()
      setProject(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este proyecto? Esta acción no se puede deshacer.")) {
      return
    }

    setDeleting(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/projects/${projectId}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Error al eliminar el proyecto")
      }

      // Redirigir a la lista
      router.push("/admin/projects")
    } catch (err: any) {
      alert(`Error: ${err.message}`)
      setDeleting(false)
    }
  }

  const handleTogglePublish = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/projects/${projectId}/publish`, {
        method: "PATCH"
      })

      if (!response.ok) {
        throw new Error("Error al cambiar estado de publicación")
      }

      const updatedProject = await response.json()
      setProject(updatedProject)
    } catch (err: any) {
      alert(`Error: ${err.message}`)
    }
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      "telecom-it": "Telecom & IT Infrastructure",
      "construccion": "Construcción",
      "electricidad": "Ingeniería Eléctrica",
      "energias-limpias": "Energías Limpias"
    }
    return categories[category] || category
  }

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      "telecom-it": "bg-blue-100 text-blue-800",
      "construccion": "bg-orange-100 text-orange-800",
      "electricidad": "bg-yellow-100 text-yellow-800",
      "energias-limpias": "bg-green-100 text-green-800"
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proyecto...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Proyecto no encontrado</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/admin/projects"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Volver a Proyectos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link 
              href="/admin/projects"
              className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block"
            >
              ← Volver a Proyectos
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(project.category)}`}>
                {getCategoryLabel(project.category)}
              </span>
              {project.published ? (
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Publicado
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Borrador
                </span>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              onClick={handleTogglePublish}
              className={`px-4 py-2 rounded-lg transition font-semibold ${
                project.published
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {project.published ? "Despublicar" : "Publicar"}
            </button>
            
            <Link
              href={`/admin/projects/${project.id}/edit`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
            >
              Editar
            </Link>
            
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold disabled:opacity-50"
            >
              {deleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-5xl">
        {/* Información básica */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Proyecto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Slug</label>
              <p className="text-gray-900 font-mono text-sm mt-1">{project.slug}</p>
            </div>

            {project.client && (
              <div>
                <label className="text-sm font-medium text-gray-600">Cliente</label>
                <p className="text-gray-900 mt-1">{project.client}</p>
              </div>
            )}

            {project.location && (
              <div>
                <label className="text-sm font-medium text-gray-600">Ubicación</label>
                <p className="text-gray-900 mt-1">{project.location}</p>
              </div>
            )}

            {project.start_date && (
              <div>
                <label className="text-sm font-medium text-gray-600">Fecha de Inicio</label>
                <p className="text-gray-900 mt-1">
                  {new Date(project.start_date).toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </div>
            )}

            {project.duration && (
              <div>
                <label className="text-sm font-medium text-gray-600">Duración</label>
                <p className="text-gray-900 mt-1">{project.duration}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-600">Creado</label>
              <p className="text-gray-900 mt-1">
                {new Date(project.created_at).toLocaleDateString("es-CL")}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Última actualización</label>
              <p className="text-gray-900 mt-1">
                {new Date(project.updated_at).toLocaleDateString("es-CL")}
              </p>
            </div>
          </div>
        </div>

        {/* Descripción */}
        {project.description && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Descripción</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Highlights / Logros</h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* DEBUG - ELIMINAR DESPUÉS */}
        {console.log('Project images:', project.images)}
        {console.log('Project videos:', project.videos)}

        {/* Imágenes */}
        {project.images && project.images.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Imágenes ({project.images.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image) => (
                <div key={image.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 font-mono break-all">{image.url}</p>
                  {image.alt_text && (
                    <p className="text-sm text-gray-500 mt-1">{image.alt_text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {project.videos && project.videos.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Videos ({project.videos.length})
            </h2>
            <div className="space-y-4">
              {project.videos.map((video) => (
                <div key={video.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      {video.title && (
                        <p className="font-medium text-gray-900 mb-1">{video.title}</p>
                      )}
                      <p className="text-sm text-gray-600 font-mono break-all">{video.video_url}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}