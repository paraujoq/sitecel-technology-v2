"use client"

import { useEffect, useState } from "react"
import { getPublishedProjects } from "@/lib/api"
import Link from "next/link"

// Mapeo de categorías a nombres legibles
const categoryNames: Record<string, string> = {
  "telecom-it": "Telecom & IT",
  "construccion": "Construcción",
  "electricidad": "Electricidad",
  "energias-limpias": "Energías Limpias"
}

// Colores por categoría
const categoryColors: Record<string, string> = {
  "telecom-it": "bg-blue-100 text-blue-800",
  "construccion": "bg-orange-100 text-orange-800",
  "electricidad": "bg-yellow-100 text-yellow-800",
  "energias-limpias": "bg-green-100 text-green-800"
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getPublishedProjects()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proyectos...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Proyectos
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Portafolio de proyectos ejecutados en telecomunicaciones, electricidad y energías limpias
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No hay proyectos publicados en este momento.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Mostrando {projects.length} {projects.length === 1 ? 'proyecto' : 'proyectos'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/proyectos/${project.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {/* Imagen del proyecto */}
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        {project.images && project.images.length > 0 ? (
                          <img
                            src={project.images[0].url}
                            alt={project.images[0].alt_text || project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement
                              img.style.display = 'none'
                              const parent = img.parentElement
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                                    <svg class="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                `
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="p-6">
                        {/* Categoría */}
                        <div className="mb-3">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                              categoryColors[project.category] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {categoryNames[project.category] || project.category}
                          </span>
                        </div>

                        {/* Título */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>

                        {/* Descripción */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {project.description || 'Sin descripción'}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          {project.location && (
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {project.location}
                            </div>
                          )}
                          {project.duration && (
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {project.duration}
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{project.tags.length - 3} más
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <span className="text-blue-600 text-sm font-semibold group-hover:text-blue-700">
                          Ver proyecto →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}