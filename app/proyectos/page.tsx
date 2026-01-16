import { getPublishedProjects, getCategories } from "@/lib/api"
import Link from "next/link"
import ProjectCard from "@/components/ProjectCard"

// Metadata para SEO
export const metadata = {
  title: "Nuestros Proyectos | Sitecel Technology",
  description: "Explora los proyectos destacados de Sitecel Technology en Telecom, IT Infrastructure, Construcción, Ingeniería Eléctrica y Energías Limpias.",
}

const categoryNames: Record<string, string> = {
  "telecom-it": "Telecom & IT Infrastructure",
  "construccion": "Construcción",
  "electricidad": "Ingeniería Eléctrica",
  "energias-limpias": "Energías Limpias"
}

export default async function ProyectosPage() {
  const projects = await getPublishedProjects()
  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros Proyectos
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Descubre los proyectos que hemos realizado en infraestructura de telecomunicaciones,
            construcción, ingeniería eléctrica y energías limpias.
          </p>
        </div>
      </section>

      {/* Filtros por Categoría */}
      {categories.length > 0 && (
        <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/proyectos"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Todos los Proyectos
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/proyectos?categoria=${category}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  {categoryNames[category] || category}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lista de Proyectos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Próximamente
              </h3>
              <p className="text-gray-500">
                Estamos preparando nuestro portafolio de proyectos.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <p className="text-gray-600">
                  Mostrando <span className="font-semibold text-gray-900">{projects.length}</span> {projects.length === 1 ? 'proyecto' : 'proyectos'}
                </p>
              </div>

              {/* Grid de Proyectos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Hablemos sobre cómo podemos ayudarte a hacerlo realidad
          </p>
          <Link
            href="/#contacto"
            className="inline-block px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition text-lg"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </main>
  )
}
