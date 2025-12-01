// config/projects.ts
export const projects = [
  {
    id: "implementacion-red-volte-vowifi",
    title: "Implementación de VoLTE/VoWiFi en el Caribe",
    published: true,
    category: "telecom-it",
    description: "Implementación de una red VoLTE/VoWiFi en diferentes países del Caribe (programa de 4 proyectos). Este proyecto no lo realizó Sitecel, pero si su Director de Proyectos. Se manejó como un producto E2E coordinando equipos de red, transporte, sistemas (oss/bss, aprovisionamiento, crm, ocs, mediación), marketing/comercial",
    client: "Operador Móvil Regional en el Caribe",
    date: "2024-06-15",
    duration: "3 años",
    location: "Región Caribeña, varios países",
    tags: ["5G", "VoLTE/VoWiFi", "Instalación de Redes", "Core Móvil", "Desarrollo de Sistemas", "Cloud", "API", "Microservicios"],
    images: ["/images/projects/volte-vowifi/arquitecture.png", "/images/projects/volte-vowifi/countries.jpg"],
    highlights: [
      "3 Core IMS instalados",
      "5 desarrollos en aprovisionamiento incluyendo APIs, AWS y Microservicios",
    ]
  },
  {
    id: "reparacion-filtracion",
    title: "Reparación de filtración en departamento residencial",
    published: true,
    category: "construccion",
    description: "Se localizó la filtración, se demolió el área afectada, se reparó la filtración y se reconstruyó el espacio afectado.",
    client: "Particular",
    date: "2025-08-28",
    duration: "3 días",
    location: "Centro, Santiago",
    tags: ["Remodelación", "Departamento residencial", "Tuberías"],
    images: [
      "/images/projects/reparacion-filtracion/filtracion7.jpg",
      "/images/projects/reparacion-filtracion/filtracion1.jpg",
      "/images/projects/reparacion-filtracion/filtracion3.jpg",
      "/images/projects/reparacion-filtracion/filtracion4.jpg",
      "/images/projects/reparacion-filtracion/filtracion5.jpg",
      "/images/projects/reparacion-filtracion/filtracion6.jpg"
    ],
    video: ["/images/projects/reparacion-filtracion/filtracion2-video.mp4"],
    highlights: [
      "Trabajos en áreas residenciales",
      "Filtraciones resueltas exitosamente"
    ]
  }
]

export const publishedProjects = projects.filter(p => p.published)

export const getProjectsByCategory = (category: string) => {
  const visibleProjects = projects.filter(p => p.published)
  if (category === "todos") return visibleProjects
  return visibleProjects.filter(p => p.category === category)
}

export type Project = typeof projects[0]