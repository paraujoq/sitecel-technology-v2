"use client"

import { API_URL } from "@/lib/config"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function LoginPage() {
  console.log("🎬 [LOGIN] Componente LoginPage montado")
  
  const router = useRouter()
  console.log("🧭 [LOGIN] Router inicializado:", { router })
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Logging cuando cambian los estados
  useEffect(() => {
    console.log("📊 [LOGIN] Estado actualizado:", { email, passwordLength: password.length, error, loading })
  }, [email, password, error, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("🚀 [LOGIN] Iniciando proceso de login...")
    
    setError("")
    setLoading(true)

    try {
      console.log("📝 [LOGIN] Preparando formData...")
      const formData = new URLSearchParams()
      formData.append("username", email)
      formData.append("password", password)
      console.log("✅ [LOGIN] FormData preparado:", { email, passwordLength: password.length })

      console.log("🌐 [LOGIN] Haciendo fetch a:", `${API_URL}/auth/login`)
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData
      })
      console.log("📡 [LOGIN] Response recibida:", { status: response.status, ok: response.ok })

      if (!response.ok) {
        console.error("❌ [LOGIN] Response no OK")
        const errorData = await response.json()
        console.error("❌ [LOGIN] Error data:", errorData)
        throw new Error(errorData.detail || "Credenciales inválidas")
      }

      console.log("📦 [LOGIN] Parseando JSON...")
      const data = await response.json()
      console.log("✅ [LOGIN] Data recibida:", { hasToken: !!data.access_token, tokenLength: data.access_token?.length })
      
      console.log("💾 [LOGIN] Guardando token en localStorage...")
      localStorage.setItem("token", data.access_token)
      console.log("✅ [LOGIN] Token guardado")
      
      // Verificar que se guardó
      const savedToken = localStorage.getItem("token")
      console.log("🔍 [LOGIN] Verificación token guardado:", { exists: !!savedToken, length: savedToken?.length })
      
      console.log("🔄 [LOGIN] Iniciando redirect a /admin/projects...")
      console.log("🔄 [LOGIN] Método 1: router.push")
      router.push("/admin/projects")
      
      console.log("⏱️ [LOGIN] Esperando 100ms para fallback...")
      setTimeout(() => {
        console.log("🔄 [LOGIN] Método 2: window.location.href")
        window.location.href = "/admin/projects"
      }, 100)
      
      console.log("✅ [LOGIN] handleSubmit completado (esperando redirects)")
      
    } catch (err: any) {
      console.error("💥 [LOGIN] Error capturado:", err)
      console.error("💥 [LOGIN] Error message:", err.message)
      console.error("💥 [LOGIN] Error stack:", err.stack)
      setError(err.message || "Error al iniciar sesión")
    } finally {
      console.log("🏁 [LOGIN] Finally block - setLoading(false)")
      setLoading(false)
    }
  }

  // ... resto del componente
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
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          © 2025 Sitecel Technology SpA
        </p>
      </div>
    </div>
  )
}