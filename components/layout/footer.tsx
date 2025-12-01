// components/layout/footer.tsx
import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { siteConfig } from "@/config/site"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          
          <div className="space-y-4">
            <Logo />
          {/* Logo ORIGINAL code:
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-blue-600">S/</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none">Sitecel</span>
                <span className="text-xs text-muted-foreground leading-none">Technology</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Ingeniería Integral de Excelencia
            </p> */}
          </div>
          

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-blue-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="text-sm text-muted-foreground hover:text-blue-600">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-sm text-muted-foreground hover:text-blue-600">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-sm text-muted-foreground hover:text-blue-600">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-blue-600">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-blue-600" />
                <a 
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-muted-foreground hover:text-blue-600"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-blue-600" />
                <div className="text-sm text-muted-foreground">
                  <div>{siteConfig.contact.phones.operaciones}</div>
                  <div>{siteConfig.contact.phones.proyectos}</div>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-blue-600" />
                <span className="text-sm text-muted-foreground">
                  {siteConfig.contact.location}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-600"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}