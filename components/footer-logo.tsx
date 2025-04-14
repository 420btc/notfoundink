"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"

export function FooterLogo() {
  const pathname = usePathname()
  
  // Solo mostrar en la página principal (ruta '/')
  if (pathname !== '/') return null
  
  return (
    <div className="relative py-8">
      {/* Línea divisoria morada */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue"></div>
      
      {/* Logo centrado sobre la línea */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <Image
          src="/images/notfoundink.png"
          alt="Not Found Ink Logo"
          width={200}
          height={100}
          className="mb-1" /* Ajusta el margen para que encaje perfectamente con la línea */
        />
      </div>
    </div>
  )
}
