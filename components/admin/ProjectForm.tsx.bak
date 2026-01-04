"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ProjectFormData {
  title: string
  slug: string
  description: string
  category: string
  published: boolean
  client: string
  location: string
  start_date: string
  duration: string
  tags: string[]
  highlights: string[]
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>
  projectId?: string
  mode: "create" | "edit"
}

export default function ProjectForm({ initialData, projectId, mode }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Form data
  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    category: initialData?.category || "telecom-it",
    published: initialData?.published || false,
    client: initialData?.client || "",
    location: initialData?.location || "",
    start_date: initialData?.start_date || "",
    duration: initialData?.duration || "",
    tags: initialData?.tags || [],
    highlights: initialData?.highlights || []
  })

  // Tags y highlights temporales para el input
  const [newTag, setNewTag] = useState("")
  const [newHighlight, setNewHighlight] = useState("")

  // Auto-generar slug desde el título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remover acentos
      .replace(/[^a-z0-9\s-]/g, "") // Remover caracteres especiales
      .replace(/\s+/g, "-") // Espacios a guiones
      .replace(/-+/g, "-") // Múltiples guiones a uno
      .replace(/^-|-$/g, "") // Remover guiones al inicio/fin
  }

  // Cuando cambia el título, actualizar slug (solo en modo crear)
  useEffect(() => {
    if (mode === "create" && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title)
      }))
    }
  }, [formData.title, mode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addHighlight = () => {
    if (newHighlight.trim() && !formData.highlights.includes(newHighlight.trim())) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }))
      setNewHighlight("")
    }
  }

  const removeHighlight = (highlightToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter(h => h !== highlightToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent, asDraft: boolean = false) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const url = mode === "create" 
        ? "http://127.0.0.1:8000/api/v1/projects"
        : `http://127.0.0.1:8000/api/v1/projects/${projectId}`

      const method = mode === "create" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          published: !asDraft && formData.published,
          images: [],
          videos: []
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Error al guardar el proyecto")
      }

      const savedProject = await response.json()
      
      // Redirigir a la lista de proyectos
      router.push("/admin/projects")
    } catch (err: any) {
      setError(err.message || "Error al guardar el proyecto")
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: "telecom-it", label: "Telecom & IT Infrastructure" },
    { value: "electricidad", label: "Ingeniería Eléctrica" },
    { value: "construccion", label: "Construcción" },
    { value: "energias-limpias", label: "Energías Limpias" }
  ]

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Información Básica */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>
        
        <div className="space-y-4">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título del Proyecto *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Implementación de VoLTE en el Caribe"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL amigable) *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="implementacion-volte-caribe"
            />
            <p className="text-xs text-gray-500 mt-1">
              Solo minúsculas, números y guiones. Se genera automáticamente del título.
            </p>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descripción detallada del proyecto..."
            />
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Detalles del Proyecto */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Proyecto</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cliente */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
              Cliente
            </label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre del cliente"
            />
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Santiago, Chile"
            />
          </div>

          {/* Fecha de inicio */}
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Duración */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duración
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: 3 meses, 2 años"
            />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Agregar tag (presiona Enter)"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Agregar
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Highlights / Logros</h2>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Agregar logro destacado (presiona Enter)"
            />
            <button
              type="button"
              onClick={addHighlight}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Agregar
            </button>
          </div>

          <div className="space-y-2">
            {formData.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <span className="text-sm text-green-900">{highlight}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(highlight)}
                  className="text-green-600 hover:text-green-800 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estado */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado de Publicación</h2>
        
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">Publicar proyecto</span>
            <p className="text-xs text-gray-500">El proyecto será visible en el sitio público</p>
          </div>
        </label>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-between items-center pt-6 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          Cancelar
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar como Borrador"}
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Guardando..." : mode === "create" ? "Crear Proyecto" : "Actualizar Proyecto"}
          </button>
        </div>
      </div>
    </form>
  )
}