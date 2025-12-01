// app/servicios/[slug]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { services } from "@/config/services"
import { ArrowLeft } from "lucide-react"

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // ⭐️ IMPORTANTE: Ahora params es una Promise y debe hacerse await
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <div>
      {/* Header */}
      <section 
        className="py-20 text-white"
        style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)` }}
      >
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-6 text-white hover:bg-white/20">
            <Link href="/servicios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Servicios
            </Link>
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{service.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
            </div>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">{service.intro}</p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.items.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  {item.subtitle && (
                    <CardDescription className="text-base">{item.subtitle}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para iniciar tu proyecto?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contáctanos para una consulta gratuita y cotización personalizada
          </p>
          <Button asChild size="lg">
            <Link href="/contacto">Solicitar Cotización</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}