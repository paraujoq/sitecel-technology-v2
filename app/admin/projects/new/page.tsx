"use client"

import ProjectForm from "@/components/admin/ProjectForm"

export default function NewProjectPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Proyecto</h1>
        <p className="text-gray-600 mt-1">Crear un nuevo proyecto para Sitecel</p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-4xl">
        <ProjectForm mode="create" />
      </div>
    </div>
  )
}