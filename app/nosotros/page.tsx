// app/nosotros/page.tsx
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { siteConfig, companyInfo } from "@/config/site"
import { Mail, Phone, Linkedin, Target, Eye, Award, Users, Lightbulb } from "lucide-react"

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Acerca de Nosotros</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Sitecel Technology SpA: Tu socio estratégico en Ingeniería Integral
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-600">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-2xl">Nuestra Misión</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo.mission}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-600">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-8 w-8 text-emerald-600" />
                  <CardTitle className="text-2xl">Nuestra Visión</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo.vision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro Equipo Directivo</h2>
            <p className="text-xl text-muted-foreground">
              Experiencia y liderazgo al servicio de tus proyectos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {siteConfig.team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-600">
                    {member.image ? (
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${member.phone}`} className="hover:text-blue-600">
                      {member.phone}
                    </a>
                  </div>
                  {member.linkedin && (
                <div className="flex justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Nuestra Historia</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Sitecel Technology SpA nació de la visión de un equipo con más de 25 años de 
                experiencia consolidada en la industria de telecomunicaciones, ingeniería eléctrica y 
                construcciones en Chile y Latinoamérica.
              </p>
              <p>
                Hemos liderado proyectos de alta complejidad para múltiples clientes, implementando 
                soluciones innovadoras que han transformado la conectividad en distintas partes de la región.
              </p>
              <p>
                Hoy, consolidamos nuestra excelencia para ofrecer servicios integrales de ingeniería, 
                combinando gestión experta de proyectos con ejecución técnica de excelencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Excelencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprometidos con la calidad en cada proyecto que ejecutamos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Confianza</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Relaciones transparentes y duraderas con nuestros clientes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Innovación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adoptamos las mejores tecnologías para soluciones eficientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para trabajar juntos?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contáctanos y descubre cómo podemos ayudarte
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Solicitar Cotización</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}