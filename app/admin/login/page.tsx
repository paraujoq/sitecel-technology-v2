"use client"

import { API_URL } from "@/lib/config"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("🚀 [LOGIN] Iniciando proceso de login...")
    
    setError("")
    setLoading(true)

    try {
      // Construir URL completa del endpoint
      const loginUrl = `${API_URL}/auth/login`
      console.log("🌐 [LOGIN] URL completa:", loginUrl)

      const formData = new URLSearchParams()
      formData.append("username", email)
      formData.append("password", password)

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData
      })

      console.log("📡 [LOGIN] Response:", { 
        status: response.status, 
        ok: response.ok,
        url: response.url 
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("❌ [LOGIN] Error:", errorData)
        throw new Error(errorData.detail || "Credenciales inválidas")
      }

      const data = await response.json()
      console.log("✅ [LOGIN] Login exitoso, token recibido:", { 
        hasToken: !!data.access_token,
        tokenLength: data.access_token?.length 
      })
      
      // Guardar token
      localStorage.setItem("token", data.access_token)
      console.log("💾 [LOGIN] Token guardado en localStorage")
      
      // Verificar que se guardó correctamente
      const savedToken = localStorage.getItem("token")
      if (!savedToken) {
        throw new Error("Error al guardar el token")
      }
      console.log("✅ [LOGIN] Token verificado en localStorage")
      
      // Pequeño delay para asegurar que localStorage se actualizó
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Redirigir usando window.location para forzar recarga completa
      console.log("🔄 [LOGIN] Redirigiendo a /admin/projects")
      window.location.href = "/admin/projects"
      
    } catch (err: any) {
      console.error("💥 [LOGIN] Error:", err)
      setError(err.message || "Error al iniciar sesión")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sitecel Technology
          </h1>
          <p className="text-gray-600">Panel de Administración</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="pedro@sitecel.cl"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Debug info - ELIMINAR EN PRODUCCIÓN */}
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono">
            <p className="text-gray-600">API URL: {API_URL}</p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          © 2025 Sitecel Technology SpA
        </p>
      </div>
    </div>
  )
}
