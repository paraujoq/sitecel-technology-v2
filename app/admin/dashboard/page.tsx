"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Verificar token
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    // Redirigir a proyectos
    router.push("/admin/projects")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  )
}
