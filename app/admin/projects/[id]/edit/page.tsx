"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import ProjectForm from "@/components/admin/ProjectForm"

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"
  
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Editar Proyecto</h1>
        <p className="text-gray-600 mt-1">{project.title}</p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-4xl">
        <ProjectForm 
          mode="edit" 
          projectId={projectId}
          initialData={{
            title: project.title,
            slug: project.slug,
            description: project.description || "",
            category: project.category,
            published: project.published,
            client: project.client || "",
            location: project.location || "",
            start_date: project.start_date || "",
            duration: project.duration || "",
            tags: project.tags || [],
            highlights: project.highlights || [],
            images: project.images || [],
            videos: project.videos || []
          }}
        />
      </div>
    </div>
  )
}