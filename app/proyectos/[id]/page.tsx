// app/proyectos/[id]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { publishedProjects } from "@/config/projects"
import { ArrowLeft, Calendar, MapPin, Clock, User, CheckCircle } from "lucide-react"

export function generateStaticParams() {
  return publishedProjects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // ⭐️ IMPORTANTE: Ahora params es una Promise y debe hacerse await
  const { id } = await params
  const project = publishedProjects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-6 text-white hover:bg-white/20">
            <Link href="/proyectos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Proyectos
            </Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl opacity-90 max-w-3xl">{project.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Galería</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${project.title} - Imagen ${index + 1}`}
                        fill
                        className="object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Video */}
            {project.video && project.video.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Video del Proyecto</h2>
                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <video
                    controls
                    className="w-full h-full"
                    poster={project.images?.[0]}
                  >
                    <source src={project.video[0]} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              </section>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Resultados Destacados</h2>
                <div className="space-y-3">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{highlight}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Tecnologías y Servicios</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Cliente</p>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fecha</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(project.date).toLocaleDateString('es-CL', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Duración</p>
                    <p className="text-sm text-muted-foreground">{project.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle>¿Tienes un proyecto similar?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 mb-4">
                  Contáctanos para una consulta gratuita y cotización personalizada
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/contacto">Solicitar Cotización</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}