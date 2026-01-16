import Link from "next/link"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: string
    slug: string
    title: string
    description: string
    category: string
    location?: string
    start_date?: string | null
    tags?: string[]
    images?: Array<{
      url: string
      alt_text: string
    }>
  }
}

const categoryNames: Record<string, string> = {
  "telecom-it": "Telecom & IT",
  "construccion": "Construcción",
  "electricidad": "Ingeniería Eléctrica",
  "energias-limpias": "Energías Limpias"
}

const categoryColors: Record<string, string> = {
  "telecom-it": "bg-blue-600 text-white",
  "construccion": "bg-orange-600 text-white",
  "electricidad": "bg-yellow-600 text-white",
  "energias-limpias": "bg-green-600 text-white"
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const firstImage = project.images && project.images.length > 0 
    ? project.images[0] 
    : null

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Imagen */}
      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.alt_text || project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-24 h-24 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        
        {/* Badge de Categoría */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[project.category] || 'bg-gray-600 text-white'}`}>
            {categoryNames[project.category] || project.category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {project.location && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{project.location}</span>
            </div>
          )}
          
          {project.start_date && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(project.start_date).getFullYear()}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Ver Más Link */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            Ver Proyecto
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
