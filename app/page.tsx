// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { services } from "@/config/services"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-blue-600/20 rounded-full text-sm mb-6">
              🚀 Ingeniería Integral de Excelencia
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Innovación y Ejecución en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Servicios Integrales
              </span>{" "}
              de Ingeniería
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Lideramos tus proyectos en Telecomunicaciones, IT, Electricidad, Construcción y
              Energías Limpias, garantizando resultados óptimos desde la planificación hasta
              la entrega.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/servicios">
                  Descubre Nuestras Soluciones
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contacto">
                  Contacta a un Experto
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400">25+</div>
              <div className="text-sm text-gray-400">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-400">10+</div>
              <div className="text-sm text-gray-400">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">4</div>
              <div className="text-sm text-gray-400">Áreas de Especialización</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluciones integrales de ingeniería que impulsan el crecimiento de su negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {service.items.length} servicios disponibles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Button asChild variant="ghost" className="w-full group">
                    <Link href={`/servicios/${service.slug}`}>
                      Ver detalles
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para iniciar tu proyecto?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contáctanos para una consulta gratuita y cotización personalizada
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">
              Solicitar Cotización
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}