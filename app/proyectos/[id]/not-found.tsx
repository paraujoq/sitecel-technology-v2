// app/proyectos/[id]/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Proyecto no encontrado</h1>
      <p className="text-xl text-muted-foreground mb-8">
        El proyecto que buscas no existe o no está disponible.
      </p>
      <Button asChild>
        <Link href="/proyectos">Ver todos los proyectos</Link>
      </Button>
    </div>
  )
}