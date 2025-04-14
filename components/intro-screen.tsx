"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function IntroScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Ocultar la pantalla de intro después de 3 segundos
    const timer = setTimeout(() => {
      setShow(false)
    }, 3000)

    // Guardar en localStorage que ya se mostró la intro para no mostrarla de nuevo en la misma sesión
    if (!localStorage.getItem("introShown")) {
      localStorage.setItem("introShown", "true")
    }

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden animate-fadeOut"
          style={{ animationDelay: '2.5s', animationDuration: '0.5s', animationFillMode: 'forwards' }}
        >
          {/* GIF animado como fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/introgif.gif"
                alt="Not Found Ink Animation"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Capa de oscurecimiento para mejorar legibilidad */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Estrellas animadas */}
            <div className="absolute top-1/3 left-1/5 text-5xl animate-float-slow">✨</div>
            <div className="absolute bottom-1/3 right-1/5 text-4xl animate-float-medium">✨</div>
            <div className="absolute top-2/3 left-1/3 text-3xl animate-float-fast">✨</div>
            <div className="absolute bottom-1/4 left-1/4 text-4xl animate-float-slow">✨</div>
            <div className="absolute top-1/4 right-1/4 text-3xl animate-float-medium">✨</div>
          </div>
          
          {/* Contenido central con animación */}
          <div
            className="relative z-10 animate-scaleIn"
            style={{ animationDuration: '0.6s', animationFillMode: 'forwards' }}
          >
            {/* Banner principal */}
            <div className="bg-black/40 backdrop-blur-sm px-10 py-6 rounded-xl w-auto relative">
              <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
              <span className="absolute -top-4 -right-8 text-3xl animate-float-medium">✨</span>
              
              <h1 
                className="font-cartoon text-5xl md:text-7xl lg:text-8xl tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-fadeIn"
                style={{ animationDelay: '0.4s', animationDuration: '0.6s' }}
              >
                <span 
                  className="text-nfi-yellow font-bold inline-block animate-slideInLeft"
                  style={{ animationDelay: '0.6s', animationDuration: '0.4s' }}
                >
                  Not Found
                </span>{" "}
                <span 
                  className="text-nfi-pink font-bold inline-block animate-slideInRight"
                  style={{ animationDelay: '0.8s', animationDuration: '0.4s' }}
                >
                  Ink
                </span>
              </h1>
              
              <span className="absolute bottom-2 right-0 text-xl animate-float-fast">✨</span>
              
              {/* Texto animado debajo del título */}
              <p 
                className="text-center text-white/80 mt-2 text-sm md:text-base animate-fadeIn"
                style={{ animationDelay: '1s', animationDuration: '0.5s' }}
              >
                Colección exclusiva de NFTs en Solana
              </p>
            </div>
            
            {/* Indicador de carga */}
            <div 
              className="mt-8 flex justify-center animate-fadeIn"
              style={{ animationDelay: '1.2s', animationDuration: '0.5s' }}
            >
              <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-nfi-yellow to-nfi-pink animate-loadingBar"
                  style={{ animationDuration: '2.8s', animationFillMode: 'forwards' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
