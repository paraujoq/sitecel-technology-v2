// config/site.ts
export const siteConfig = {
  name: "Sitecel Technology",
  title: "Sitecel Technology | Soluciones Integrales en Telecom & IT, Energía y Construcción",
  description: "Expertos en Project Management y ejecución de proyectos en Telecomunicaciones, IT, Electricidad, Construcción y Energía Limpia. Eficiencia, calidad y tecnología a tu servicio.",
  url: "https://sitecel-technology.vercel.app",
  ogImage: "https://sitecel-technology.vercel.app/og.jpg",
  keywords: [
    "Project Management",
    "Telecomunicaciones Chile",
    "Ingeniería Eléctrica",
    "Construcción Obras Civiles",
    "Paneles Solares",
    "Instalación de Redes",
    "Consultoría TI"
  ],
  language: "es-CL",
  links: {
    email: "sitecelspa@gmail.com",
    linkedin: "https://www.linkedin.com/in/pcaq/",
    github: "https://github.com/paraujoq",
  },
  contact: {
    email: "sitecelspa@gmail.com",
    location: "Providencia, Región Metropolitana de Santiago, Chile",
    phones: {
      operaciones: "+56990741520",
      proyectos: "+56997928355"
    }
  },
  team: [
    {
      name: "Gustavo Jerez Carrizo",
      role: "Director de Operaciones",
      phone: "+56990741520",
      image: "/images/team/gustavo-jerez.jpg"
    },
    {
      name: "Pedro Araujo Quintero",
      role: "Director de Proyectos",
      phone: "+56997928355",
      linkedin: "https://www.linkedin.com/in/pcaq/",
      image: "/images/team/pedro-araujo.jpg"
    }
  ]
}

export const companyInfo = {
  mission: "Ser el socio estratégico de nuestros clientes, ofreciendo servicios de ingeniería integral de alta calidad en telecomunicaciones, electricidad, construcción y energías limpias, apalancados en la gestión experta de proyectos y el compromiso con la innovación tecnológica.",
  vision: "Liderar el mercado de servicios integrales de ingeniería en Chile, siendo reconocidos por la excelencia en la ejecución de proyectos multidisciplinarios y por nuestra contribución al desarrollo de infraestructuras eficientes y sostenibles."
}

export type SiteConfig = typeof siteConfig