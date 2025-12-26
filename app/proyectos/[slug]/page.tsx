import { getProjectBySlug, getPublishedProjects } from "@/lib/api"
import { notFound } from "next/navigation"
import Link from "next/link"

// Mapeo de categorías
const categoryNames: Record<string, string> = {
  "telecom-it": "Telecom & IT Infrastructure",
  "construccion": "Construcción",
  "electricidad": "Ingeniería Eléctrica",
  "energias-limpias": "Energías Limpias"
}

const categoryColors: Record<string, string> = {
  "telecom-it": "bg-blue-100 text-blue-800",
  "construccion": "bg-orange-100 text-orange-800",
  "electricidad": "bg-yellow-100 text-yellow-800",
  "energias-limpias": "bg-green-100 text-green-800"
}

// Generar metadata dinámica
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  
  if (!project) {
    return {
      title: "Proyecto no encontrado | Sitecel Technology"
    }
  }

  return {
    title: `${project.title} | Sitecel Technology`,
    description: project.description || `Proyecto de ${categoryNames[project.category]}`,
  }
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const projects = await getPublishedProjects()
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/proyectos" className="hover:text-blue-600">
              Proyectos
            </Link>
            <span>/</span>
            <span className="text-gray-900">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categoría */}
          <div className="mb-4">
            <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${categoryColors[project.category]}`}>
              {categoryNames[project.category] || project.category}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {project.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-6 text-blue-100">
            {project.client && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold mr-2">Cliente:</span>
                {project.client}
              </div>
            )}
            {project.location && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold mr-2">Ubicación:</span>
                {project.location}
              </div>
            )}
            {project.duration && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold mr-2">Duración:</span>
                {project.duration}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Descripción */}
              {project.description && (
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Descripción del Proyecto
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Logros Destacados
                  </h2>
                  <ul className="space-y-4">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Galería de Imágenes */}
              {project.images && project.images.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Galería de Imágenes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((image) => (
                      <div key={image.id} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Las imágenes se mostrarán cuando se agreguen URLs en el admin.
                  </p>
                </div>
              )}

              {/* Videos */}
              {project.videos && project.videos.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Videos del Proyecto
                  </h2>
                  <div className="space-y-4">
                    {project.videos.map((video) => (
                      <div key={video.id} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Los videos se mostrarán cuando se agreguen URLs en el admin.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Tecnologías y Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Información del Proyecto */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Información del Proyecto
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-700">Categoría:</dt>
                    <dd className="text-gray-600">{categoryNames[project.category]}</dd>
                  </div>
                  {project.start_date && (
                    <div>
                      <dt className="font-semibold text-gray-700">Fecha de Inicio:</dt>
                      <dd className="text-gray-600">
                        {new Date(project.start_date).toLocaleDateString('es-CL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* CTA */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  ¿Interesado en trabajar con nosotros?
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  Contáctanos para discutir tu próximo proyecto.
                </p>
                <Link
                  href="/#contacto"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Projects */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/proyectos"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Proyectos
          </Link>
        </div>
      </section>
    </main>
  )
}