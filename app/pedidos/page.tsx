"use client";

import { useState, useRef } from "react";
import "../../styles/animate-bounce-slow.css";

const EMAIL_CONTACTO = "mamadopoulass@gmail.com";

export default function PedidosPage() {
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_CONTACTO);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-nfi-blue/5 via-nfi-pink/10 to-nfi-yellow/5 overflow-hidden">
      {/* Fondo decorativo: pikachuu.png */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none select-none">
        <img
          src="/images/pikachuu.png"
          alt="Fondo Pedidos Pikachuu"
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-xl max-w-lg w-full p-8 border border-nfi-purple/30">
        <h1 
          className="text-3xl md:text-4xl font-cartoon text-center mb-6"
          style={{
            color: '#E91E63',
            textShadow: `
              1px 1px 0 #FFD93D,
              2px 2px 0 #FFD93D,
              3px 3px 0 #FFC107,
              4px 4px 0 #FF9800,
              5px 5px 10px rgba(0,0,0,0.3)
            `
          }}
        >Solicita tu Dibujo Personalizado</h1>
        <div className="flex justify-center mb-6">
          {/* Imagen con lupa */}
          {(() => {
            const [zoom, setZoom] = useState(false);
            // offset: porcentaje. mouse: coordenadas para la lupa
            const [offset, setOffset] = useState({ x: 50, y: 50 });
            const [mouse, setMouse] = useState({ lensLeft: 0, lensTop: 0, bgX: 0, bgY: 0 });
            const imgContainerRef = useRef<HTMLDivElement>(null);

            const handleMouseMove = (e: React.MouseEvent) => {
              if (!zoom || !imgContainerRef.current) return;
              const rect = imgContainerRef.current.getBoundingClientRect();
              // Coordenadas relativas al contenedor
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const percentX = (x / rect.width) * 100;
              const percentY = (y / rect.height) * 100;
              setOffset({ x: percentX, y: percentY });

              // Lupa de 120px, zoom 2x
              const lensSize = 120;
              const zoomLevel = 2;
              // Posición de la lupa (centrada en el cursor)
              const lensLeft = x - lensSize / 2;
              const lensTop = y - lensSize / 2;
              // Posición del fondo de la lupa
              const bgX = x * zoomLevel - lensSize / 2;
              const bgY = y * zoomLevel - lensSize / 2;
              setMouse({ lensLeft, lensTop, bgX, bgY });
            };

            return (
              <div
                ref={imgContainerRef}
                className="relative max-h-80 w-auto rounded-lg shadow-lg overflow-hidden"
                style={{ display: 'inline-block' }}
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src="/images/collage.png"
                  alt="Collage Not Found Ink"
                  className="object-contain max-h-80 w-auto"
                  style={{ display: 'block' }}
                />
                {/* Lupa real usando background-image */}
                {zoom && imgContainerRef.current && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${mouse.lensLeft}px`,
                      top: `${mouse.lensTop}px`,
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      pointerEvents: 'none',
                      zIndex: 10,
                      border: '4px solid #ec407a99',
                      boxShadow: '0 0 0 2px #fff, 0 0 16px 4px #ec407a55',
                      backgroundImage: `url(/images/collage.png)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: `${imgContainerRef.current.offsetWidth * 2}px ${imgContainerRef.current.offsetHeight * 2}px`,
                      backgroundPosition: `-${mouse.bgX}px -${mouse.bgY}px`,
                    }}
                  />
                )}
              </div>
            );
          })()}
        </div>
        <p className="text-center text-muted-foreground mb-8">
          ¿Quieres un dibujo único hecho por Anamari? ¡Escríbenos y cuéntanos tu idea!
        </p>

        {/* Sección de Email con estilo moderno */}
        <div className="flex flex-col items-center gap-6">
          {/* Icono de email */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue flex items-center justify-center shadow-lg animate-bounce-slow">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Email destacado */}
          <div className="w-full bg-gradient-to-r from-nfi-purple/10 via-nfi-pink/10 to-nfi-blue/10 rounded-xl p-6 border-2 border-nfi-pink/30 shadow-md">
            <p className="text-center text-sm text-muted-foreground mb-3 font-medium">Contáctanos por email:</p>
            <a
              href={`mailto:${EMAIL_CONTACTO}?subject=Pedido de Dibujo Personalizado`}
              className="block text-center text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue hover:scale-105 transition-transform cursor-pointer"
            >
              {EMAIL_CONTACTO}
            </a>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Botón Enviar Email */}
            <a
              href={`mailto:${EMAIL_CONTACTO}?subject=Pedido de Dibujo Personalizado`}
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue text-white font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar Email
            </a>

            {/* Botón Copiar */}
            <button
              onClick={handleCopiar}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 ${
                copiado
                  ? "bg-green-500 text-white"
                  : "bg-white dark:bg-gray-800 border-2 border-nfi-pink/50 text-nfi-pink hover:bg-nfi-pink/10"
              }`}
            >
              {copiado ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  ¡Copiado!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar Email
                </>
              )}
            </button>
          </div>

          {/* Mensaje adicional */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Incluye en tu mensaje una descripción de lo que te gustaría y cualquier imagen de referencia. ¡Anamari te responderá pronto!
          </p>
        </div>
      </div>
    </div>
  );
}
