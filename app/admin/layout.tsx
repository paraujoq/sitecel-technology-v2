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
    console.log("🔐 [LAYOUT] Verificando autenticación, pathname:", pathname)
    
    // Si está en login o raíz de admin, no verificar auth
    if (pathname === "/admin/login" || pathname === "/admin") {
      console.log("✅ [LAYOUT] Página pública, skip auth check")
      setIsLoading(false)
      setIsAuthenticated(true) // Permitir renderizar
      return
    }

    const checkAuth = async () => {
      console.log("🔍 [LAYOUT] Verificando token...")
      
      // Esperar un momento para asegurar que localStorage está disponible
      await new Promise(resolve => setTimeout(resolve, 50))
      
      const token = localStorage.getItem("token")
      console.log("📦 [LAYOUT] Token:", { exists: !!token, length: token?.length })

      if (!token) {
        console.log("❌ [LAYOUT] No hay token, redirigiendo a login")
        setIsLoading(false)
        router.replace("/admin/login")
        return
      }

      // Validar token con el backend
      console.log("📡 [LAYOUT] Validando token con backend...")
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          cache: 'no-store'
        })
        
        console.log("📡 [LAYOUT] Respuesta validación:", { 
          status: response.status, 
          ok: response.ok 
        })

        if (!response.ok) {
          console.error("❌ [LAYOUT] Token inválido")
          localStorage.removeItem("token")
          setIsLoading(false)
          router.replace("/admin/login")
          return
        }

        const userData = await response.json()
        console.log("✅ [LAYOUT] Usuario autenticado:", userData)
        setIsAuthenticated(true)
        
      } catch (error) {
        console.error("💥 [LAYOUT] Error validando token:", error)
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
    console.log("📄 [LAYOUT] Renderizando página pública")
    return <>{children}</>
  }

  // Mostrar loading mientras verifica
  if (isLoading) {
    console.log("⏳ [LAYOUT] Mostrando loading...")
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
    console.log("🚫 [LAYOUT] No autenticado, no renderizar")
    return null
  }

  // Layout autenticado con sidebar
  console.log("✅ [LAYOUT] Renderizando layout con sidebar")
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
