import React from 'react';

// components/ui/logo.tsx
// sitecel-logo.svg should be placed in the public directory
import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image 
        src="/sitecel-logo.svg" 
        alt="Sitecel Technology" 
        width={40} 
        height={40}
        className="h-10 w-auto"
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold leading-none">Sitecel</span>
        <span className="text-xs text-muted-foreground leading-none">Technology</span>
      </div>
    </Link>
  )
}

