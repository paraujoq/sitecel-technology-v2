"use client"

interface ProjectImageProps {
  src: string
  alt: string
  caption?: string
}

export default function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  return (
    <div className="group">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23ddd" width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="16">Imagen no disponible</text></svg>'
          }}
        />
      </div>
      {caption && (
        <p className="text-sm text-gray-600 mt-2">{caption}</p>
      )}
    </div>
  )
}
