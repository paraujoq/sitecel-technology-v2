"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/components/admin/Sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem("admin_token")
    
    // Si está en login, no verificar auth
    if (pathname === "/admin/login") {
      setIsLoading(false)
      return
    }

    // Si no hay token, redirigir a login
    if (!token) {
      router.push("/admin/login")
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)
  }, [pathname, router])

  // Página de login no usa el layout con sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Mostrar loading mientras verifica auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // No renderizar nada si no está autenticado (está redirigiendo)
  if (!isAuthenticated) {
    return null
  }

  // Layout con sidebar para todas las páginas admin (excepto login)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}