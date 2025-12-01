// app/servicios/page.tsx
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { services } from "@/config/services"
import { ArrowRight } from "lucide-react"

export default function ServiciosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Soluciones integrales de ingeniería que impulsan el crecimiento de su negocio
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{service.icon}</div>
                    <div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription>
                        {service.items.length} servicios disponibles
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.intro}</p>
                  
                  <div className="space-y-2">
                    {service.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="w-full group">
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

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Consulta por soluciones personalizadas
          </p>
          <Button asChild size="lg">
            <Link href="/contacto">Contactar</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}