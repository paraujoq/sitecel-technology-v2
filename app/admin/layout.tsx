"use client"


import { API_URL } from "@/lib/config"
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
    const checkAuth = async () => {
      // Si estÃ¡ en login, no verificar auth
      if (pathname === "/admin/login") {
        setIsLoading(false)
        return
      }

      // Obtener token
      const token = localStorage.getItem("admin_token")

      // Si no hay token, redirigir a login
      if (!token) {
        router.push("/admin/login")
        return
      }

      // Validar token con el backend
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (!response.ok) {
          // Token invÃ¡lido o expirado
          localStorage.removeItem("admin_token")
          router.push("/admin/login")
          return
        }

        // Token vÃ¡lido
        setIsAuthenticated(true)
      } catch (error) {
        // Error de red o servidor
        console.error("Error validating token:", error)
        localStorage.removeItem("admin_token")
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // PÃ¡gina de login no usa el layout con sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Mostrar loading mientras verifica auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticaciÃ³n...</p>
        </div>
      </div>
    )
  }

  // No renderizar nada si no estÃ¡ autenticado (estÃ¡ redirigiendo)
  if (!isAuthenticated) {
    return null
  }

  // Layout con sidebar para todas las pÃ¡ginas admin (excepto login)
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

