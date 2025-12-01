// config/services.ts
export const services = [
  {
    id: "telecom-it",
    title: "Telecom & IT",
    slug: "telecom-it",
    icon: "📡",
    color: "#0066CC",
    description: "Impulsamos la conectividad y la eficiencia digital. Desde la gestión de grandes proyectos de red hasta el desarrollo de software a medida.",
    intro: "Impulsamos la conectividad y la eficiencia digital. Desde la gestión de grandes proyectos de red hasta el desarrollo de software a medida, garantizamos infraestructuras robustas y soluciones tecnológicas de vanguardia.",
    items: [
      {
        title: "Project Management",
        subtitle: "Telecomunicaciones, Software, Desarrollo de Productos",
        description: "Gestión integral de proyectos (Scope, Time, Budget) para la implementación de redes complejas, plataformas de software o el lanzamiento exitoso de nuevos productos tecnológicos."
      },
      {
        title: "Consultoría en Planificación",
        description: "Análisis de mercado, estudios de viabilidad y definición de estrategias para maximizar el ROI de su inversión en infraestructura de telecomunicaciones."
      },
      {
        title: "Elaboración y Análisis de Casos de Negocio y Budgeting",
        description: "Transformamos ideas en planes financieros sólidos, con análisis detallado de costos, presupuestos y proyecciones de rentabilidad."
      },
      {
        title: "Entrenamiento Especializado",
        description: "Capacitación técnica de alto nivel para equipos en la gestión, operación y mantenimiento de nuevas tecnologías y sistemas implementados."
      },
      {
        title: "Desarrollo de Software",
        subtitle: "API e Integraciones, Web",
        description: "Creación de APIs robustas para la integración de sistemas, desarrollo de aplicaciones web a medida y soluciones de software que optimizan procesos de negocio."
      },
      {
        title: "Ingeniería e Instalación de Redes",
        subtitle: "Transmisión, Acceso, Core Móvil",
        description: "Diseño, instalación y puesta en marcha de redes de última generación. Expertise en infraestructura de Transmisión, Acceso (FTTH, 5G) y Core Móvil."
      }
    ]
  },
  {
    id: "electricidad",
    title: "Electricidad",
    slug: "electricidad",
    icon: "⚡",
    color: "#FFB800",
    description: "Ejecución impecable de proyectos eléctricos. Garantizamos seguridad, eficiencia y continuidad operativa.",
    intro: "Ejecución impecable de proyectos eléctricos. Nos especializamos en garantizar la seguridad, eficiencia y continuidad operativa de sus sistemas de baja y media tensión.",
    items: [
      {
        title: "Project Management",
        description: "Liderazgo en la planificación y supervisión de instalaciones eléctricas, asegurando el cumplimiento normativo y la entrega a tiempo."
      },
      {
        title: "Instalaciones de Baja y Media Tensión",
        description: "Diseño e instalación certificada de sistemas eléctricos para entornos industriales, comerciales y residenciales, optimizando el consumo y la distribución de energía."
      }
    ]
  },
  {
    id: "construccion",
    title: "Construcción",
    slug: "construccion",
    icon: "🏗️",
    color: "#6C757D",
    description: "Soluciones de construcción ágiles y confiables. Desde obras civiles hasta reacondicionamiento completo de espacios.",
    intro: "Soluciones de construcción ágiles y confiables. Ejecutamos desde obras civiles menores hasta el reacondicionamiento completo de espacios corporativos, maximizando la funcionalidad y estética.",
    items: [
      {
        title: "Project Management",
        description: "Coordinación integral de equipos, proveedores y plazos para proyectos de construcción, garantizando la calidad y el control de costos."
      },
      {
        title: "Construcciones Menores y Medianas",
        description: "Ejecución de obras de infraestructura, ampliaciones, habilitaciones y modificaciones estructurales con enfoque en la durabilidad."
      },
      {
        title: "Reacondicionamiento de Departamentos y Oficinas",
        description: "Transformación de espacios interiores (remodelaciones, layout, acabados) para crear ambientes modernos y productivos."
      },
      {
        title: "Mantenimiento de Equipos de Departamentos y Oficinas",
        description: "Servicios de mantenimiento preventivo y correctivo para equipos clave (climatización, iluminación, sistemas de seguridad) que aseguran la operatividad diaria."
      }
    ]
  },
  {
    id: "energias-limpias",
    title: "Energías Limpias",
    slug: "energias-limpias",
    icon: "☀️",
    color: "#00A86B",
    description: "Compromiso con la sostenibilidad energética. Sistemas fotovoltaicos eficientes que reducen su huella de carbono.",
    intro: "Compromiso con la sostenibilidad energética. Desarrollamos e implementamos sistemas fotovoltaicos eficientes, reduciendo su huella de carbono y optimizando sus costos energéticos a largo plazo.",
    items: [
      {
        title: "Project Management",
        description: "Gestión experta en proyectos de energía renovable, desde el estudio de emplazamiento hasta la conexión a la red."
      },
      {
        title: "Paneles Solares (Instalación y Diseño)",
        description: "Diseño e instalación profesional de sistemas de paneles fotovoltaicos para autoconsumo o inyección a la red."
      },
      {
        title: "Inversores y Sistemas de Conversión",
        description: "Suministro e integración de inversores de alta eficiencia para garantizar la conversión óptima de la energía solar generada."
      }
    ]
  }
]

export type Service = typeof services[0]