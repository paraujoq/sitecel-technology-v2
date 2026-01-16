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
    // Si está en login o raíz de admin, no verificar auth
    if (pathname === "/admin/login" || pathname === "/admin") {
      setIsLoading(false)
      setIsAuthenticated(true)
      return
    }

    const checkAuth = async () => {
      // Esperar un momento para asegurar que localStorage está disponible
      await new Promise(resolve => setTimeout(resolve, 50))
      
      const token = localStorage.getItem("token")

      if (!token) {
        setIsLoading(false)
        router.replace("/admin/login")
        return
      }

      // Validar token con el backend
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          cache: 'no-store'
        })

        if (!response.ok) {
          console.error("Token inválido o expirado")
          localStorage.removeItem("token")
          setIsLoading(false)
          router.replace("/admin/login")
          return
        }

        setIsAuthenticated(true)
        
      } catch (error) {
        console.error("Error validando token:", error)
        localStorage.removeItem("token")
        router.replace("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Páginas públicas - renderizar sin sidebar
  if (pathname === "/admin/login" || pathname === "/admin") {
    return <>{children}</>
  }

  // Mostrar loading mientras verifica
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

  // No renderizar si no está autenticado
  if (!isAuthenticated) {
    return null
  }

  // Layout autenticado con sidebar
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
