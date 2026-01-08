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
    console.log("🔐 [LAYOUT] AdminLayout effect triggered, pathname:", pathname)
    
    const checkAuth = async () => {
      // Si está en login o raíz de admin, no verificar auth
      if (pathname === "/admin/login" || pathname === "/admin") {
        console.log("✅ [LAYOUT] Página de login/admin, skip auth check")
        setIsLoading(false)
        return
      }

      console.log("🔍 [LAYOUT] Checking authentication...")
      
      // Obtener token
      const token = localStorage.getItem("admin_token")
      console.log("📦 [LAYOUT] Token from localStorage:", { exists: !!token, length: token?.length })

      // Si no hay token, redirigir a login
      if (!token) {
        console.log("❌ [LAYOUT] No token found, redirecting to login")
        router.push("/admin/login")
        return
      }

      // Validar token con el backend
      console.log("📡 [LAYOUT] Validating token with backend...")
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        
        console.log("📡 [LAYOUT] Validation response:", { status: response.status, ok: response.ok })

        if (!response.ok) {
          console.error("❌ [LAYOUT] Token invalid or expired, redirecting to login")
          localStorage.removeItem("admin_token")
          router.push("/admin/login")
          return
        }

        console.log("✅ [LAYOUT] Token valid, user authenticated")
        setIsAuthenticated(true)
      } catch (error) {
        console.error("💥 [LAYOUT] Error validating token:", error)
        localStorage.removeItem("admin_token")
        router.push("/admin/login")
      } finally {
        console.log("🏁 [LAYOUT] Auth check complete")
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Página de login o admin root no usa el layout con sidebar
  if (pathname === "/admin/login" || pathname === "/admin") {
    console.log("📄 [LAYOUT] Rendering login/admin page without sidebar")
    return <>{children}</>
  }

  // Mostrar loading mientras verifica auth
  if (isLoading) {
    console.log("⏳ [LAYOUT] Showing loading screen")
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
    console.log("🚫 [LAYOUT] Not authenticated, rendering null")
    return null
  }

  // Layout con sidebar para todas las páginas admin (excepto login)
  console.log("✅ [LAYOUT] Rendering authenticated layout with sidebar")
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}