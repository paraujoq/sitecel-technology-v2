"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { API_URL } from "@/lib/config"

export default function ViewProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`)
      
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
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar proyecto</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/admin/projects")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Volver a Proyectos
          </button>
        </div>
      </div>
    )
  }

  const categoryNames: Record<string, string> = {
    "telecom-it": "Telecom & IT Infrastructure",
    "construccion": "Construcción",
    "electricidad": "Ingeniería Eléctrica",
    "energias-limpias": "Energías Limpias"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Link 
              href="/admin/projects"
              className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block"
            >
              ← Volver a Proyectos
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${project.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {project.published ? "✓ Publicado" : "○ Borrador"}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {categoryNames[project.category]}
              </span>
            </div>
          </div>
          <Link
            href={`/admin/projects/${projectId}/edit`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Editar Proyecto
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del Proyecto */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Información del Proyecto</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-600">Slug</dt>
                  <dd className="text-sm text-gray-900 font-mono">{project.slug}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Cliente</dt>
                  <dd className="text-sm text-gray-900">{project.client || "–"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Ubicación</dt>
                  <dd className="text-sm text-gray-900">{project.location || "–"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Fecha de Inicio</dt>
                  <dd className="text-sm text-gray-900">
                    {project.start_date ? new Date(project.start_date).toLocaleDateString("es-CL") : "–"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Duración</dt>
                  <dd className="text-sm text-gray-900">{project.duration || "–"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Creado</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(project.created_at).toLocaleDateString("es-CL")}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {project.description || "Sin descripción"}
              </p>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Highlights / Logros</h2>
                <ul className="space-y-2">
                  {project.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Imágenes */}
            {project.images && project.images.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Imágenes ({project.images.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((image: any) => (
                    <div key={image.id} className="group relative">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.alt_text || project.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23ddd" width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="16">Imagen no disponible</text></svg>'
                          }}
                        />
                      </div>
                      {image.caption && (
                        <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {project.videos && project.videos.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Videos ({project.videos.length})</h2>
                <div className="space-y-6">
                  {project.videos.map((video: any) => (
                    <div key={video.id}>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {video.title || "Video del proyecto"}
                      </p>
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        {video.video_url.includes('youtube.com') || video.video_url.includes('youtu.be') ? (
                          <iframe
                            src={video.video_url}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : video.video_url.includes('drive.google.com') ? (
                          <iframe
                            src={video.video_url}
                            className="w-full h-full"
                            allow="autoplay"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            controls
                            className="w-full h-full"
                            poster={video.thumbnail_url || undefined}
                          >
                            <source src={video.video_url} type="video/mp4" />
                            Tu navegador no soporta la reproducción de video.
                          </video>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>   

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones</h2>
              <div className="space-y-3">
                <Link
                  href={`/admin/projects/${projectId}/edit`}
                  className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition"
                >
                  Editar Proyecto
                </Link>
                <Link
                  href={`/proyectos/${project.slug}`}
                  target="_blank"
                  className="block w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-center rounded-lg transition"
                >
                  Ver en Sitio Público
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="block w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg transition disabled:opacity-50"
                >
                  {deleting ? "Eliminando..." : "Eliminar Proyecto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
