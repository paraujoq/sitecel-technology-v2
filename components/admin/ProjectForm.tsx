"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/config"

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
  images?: Array<{  // ← AGREGAR
    url: string
    alt_text: string
    caption: string
    display_order: number
  }>
  videos?: Array<{  // ← AGREGAR
    video_url: string
    thumbnail_url: string
    title: string
    duration: number
    display_order: number
  }>
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

  // Estados para imágenes
  const [images, setImages] = useState<Array<{
    url: string
    alt_text: string
    caption: string
    display_order: number
  }>>([])
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newImageAlt, setNewImageAlt] = useState("")
  const [newImageCaption, setNewImageCaption] = useState("")

  // Estados para videos
  const [videos, setVideos] = useState<Array<{
    video_url: string
    thumbnail_url: string
    title: string
    duration: number
    display_order: number
  }>>([])
  const [newVideoUrl, setNewVideoUrl] = useState("")
  const [newVideoThumbnail, setNewVideoThumbnail] = useState("")
  const [newVideoTitle, setNewVideoTitle] = useState("")

  // Cargar imágenes y videos del proyecto al editar
  useEffect(() => {
    console.log('=== DEBUG ProjectForm ===')
    console.log('Mode:', mode)
    console.log('InitialData:', initialData)
    console.log('InitialData?.images:', initialData?.images)
    
    if (mode === "edit" && initialData) {
      // Cargar imágenes existentes
      if (initialData.images && Array.isArray(initialData.images)) {
        console.log('✅ Cargando', initialData.images.length, 'imágenes')
        
        // Mapear las imágenes al formato correcto
        const mappedImages = initialData.images.map((img: any) => ({
          url: img.url,
          alt_text: img.alt_text || '',
          caption: img.caption || '',
          display_order: img.display_order || 0
        }))
        
        setImages(mappedImages)
      } else {
        console.log('❌ No hay imágenes')
      }
      
      // Cargar videos existentes
      if (initialData.videos && Array.isArray(initialData.videos)) {
        console.log('✅ Cargando', initialData.videos.length, 'videos')
        
        // Mapear los videos al formato correcto
        const mappedVideos = initialData.videos.map((vid: any) => ({
          video_url: vid.video_url,
          thumbnail_url: vid.thumbnail_url || '',
          title: vid.title || '',
          duration: vid.duration || 0,
          display_order: vid.display_order || 0
        }))
        
        setVideos(mappedVideos)
      }
    }
  }, [mode, initialData])

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

  // Funciones para manejar imágenes
  const addImage = () => {
    if (!newImageUrl.trim()) {
      alert("La URL de la imagen es requerida")
      return
    }

    const newImage = {
      url: newImageUrl.trim(),
      alt_text: newImageAlt.trim() || formData.title,
      caption: newImageCaption.trim(),
      display_order: images.length
    }

    setImages([...images, newImage])
    
    // Limpiar inputs
    setNewImageUrl("")
    setNewImageAlt("")
    setNewImageCaption("")
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const moveImageUp = (index: number) => {
    if (index === 0) return
    const newImages = [...images]
    const temp = newImages[index]
    newImages[index] = newImages[index - 1]
    newImages[index - 1] = temp
    // Actualizar display_order
    setImages(newImages.map((img, i) => ({ ...img, display_order: i })))
  }

  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return
    const newImages = [...images]
    const temp = newImages[index]
    newImages[index] = newImages[index + 1]
    newImages[index + 1] = temp
    // Actualizar display_order
    setImages(newImages.map((img, i) => ({ ...img, display_order: i })))
  }

  // Funciones para manejar videos
  const addVideo = () => {
    if (!newVideoUrl.trim()) {
      alert("La URL del video es requerida")
      return
    }

    const newVideo = {
      video_url: newVideoUrl.trim(),
      thumbnail_url: newVideoThumbnail.trim(),
      title: newVideoTitle.trim() || formData.title,
      duration: 0, // Por ahora siempre 0
      display_order: videos.length
    }

    setVideos([...videos, newVideo])
    
    // Limpiar inputs
    setNewVideoUrl("")
    setNewVideoThumbnail("")
    setNewVideoTitle("")
  }

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent, asDraft: boolean = false) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const url = mode === "create" 
        ? `${API_URL}/projects`
        : `${API_URL}/projects/${projectId}`

      const method = mode === "create" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          published: !asDraft && formData.published,
          images: images,
          videos: videos
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

{/* Imágenes */}
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">Imágenes del Proyecto</h2>
  
  {/* Formulario para agregar imagen */}
  <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-lg">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        URL de la Imagen *
      </label>
      <input
        type="url"
        value={newImageUrl}
        onChange={(e) => setNewImageUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="https://ejemplo.com/imagen.jpg"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Texto Alternativo
      </label>
      <input
        type="text"
        value={newImageAlt}
        onChange={(e) => setNewImageAlt(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Descripción de la imagen"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Descripción / Pie de foto
      </label>
      <input
        type="text"
        value={newImageCaption}
        onChange={(e) => setNewImageCaption(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Vista general del proyecto"
      />
    </div>

    <button
      type="button"
      onClick={addImage}
      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
    >
      + Agregar Imagen
    </button>
  </div>

  {/* Lista de imágenes */}
  {images.length > 0 && (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">
        Imágenes agregadas ({images.length})
      </p>
      {images.map((image, index) => (
        <div key={index} className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
          {/* Preview */}
          <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
            <img 
              src={image.url} 
              alt={image.alt_text}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="%23ccc" width="80" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Error</text></svg>'
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-mono text-gray-900 truncate">{image.url}</p>
            {image.alt_text && (
              <p className="text-xs text-gray-600 mt-1">Alt: {image.alt_text}</p>
            )}
            {image.caption && (
              <p className="text-xs text-gray-600">Caption: {image.caption}</p>
            )}
          </div>

          {/* Controles */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => moveImageUp(index)}
              disabled={index === 0}
              className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-30"
              title="Mover arriba"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => moveImageDown(index)}
              disabled={index === images.length - 1}
              className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-30"
              title="Mover abajo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="p-1 text-red-600 hover:text-red-800"
              title="Eliminar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  {images.length === 0 && (
    <p className="text-sm text-gray-500 text-center py-4">
      No hay imágenes agregadas. Agrega URLs de imágenes para mostrarlas en el proyecto.
    </p>
  )}
</div>

{/* Videos */}
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">Videos del Proyecto</h2>
  
  {/* Formulario para agregar video */}
  <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-lg">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        URL del Video *
      </label>
      <input
        type="url"
        value={newVideoUrl}
        onChange={(e) => setNewVideoUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="https://ejemplo.com/video.mp4"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        URL del Thumbnail
      </label>
      <input
        type="url"
        value={newVideoThumbnail}
        onChange={(e) => setNewVideoThumbnail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="https://ejemplo.com/thumbnail.jpg"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Título del Video
      </label>
      <input
        type="text"
        value={newVideoTitle}
        onChange={(e) => setNewVideoTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="Demostración del proyecto"
      />
    </div>

    <button
      type="button"
      onClick={addVideo}
      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
    >
      + Agregar Video
    </button>
  </div>

  {/* Lista de videos */}
  {videos.length > 0 && (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">
        Videos agregados ({videos.length})
      </p>
      {videos.map((video, index) => (
        <div key={index} className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex-1">
            <p className="text-sm font-mono text-gray-900 truncate">{video.video_url}</p>
            {video.title && (
              <p className="text-xs text-gray-600 mt-1">Título: {video.title}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => removeVideo(index)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )}

  {videos.length === 0 && (
    <p className="text-sm text-gray-500 text-center py-4">
      No hay videos agregados.
    </p>
  )}
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