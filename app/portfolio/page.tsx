"use client";
import Image from "next/image";
import { useState } from "react";

const OBRAS = [
  {
    src: "/images/profesclase.png",
    title: "Profesor de Clase",
    category: "Educación",
  },
  {
    src: "/images/buenoluis.png",
    title: "Bueno Luis",
    category: "Amistad",
  },
  {
    src: "/images/parejita.png",
    title: "Parejita",
    category: "Amor",
  },
  {
    src: "/images/mihermano.png",
    title: "Mi Hermano",
    category: "Familia",
  },
  {
    src: "/images/sandrita.png",
    title: "Sandrita",
    category: "Retrato",
  },
  {
    src: "/images/claracuev.png",
    title: "Clara Cuev",
    category: "Personaje",
  },
  {
    src: "/images/Screenshot (44).png",
    title: "You Got This Girl",
    category: "Motivacional",
  },
  {
    src: "/images/Screenshot (45).png",
    title: "Nada Se Pierde",
    category: "Reflexión",
  },
  {
    src: "/images/Screenshot (46).png",
    title: "No Time For Negativity",
    category: "Positivismo",
  },
  {
    src: "/images/Screenshot (47).png",
    title: "Here Comes The Sun",
    category: "Inspiración",
  },
];

export default function PortfolioPage() {
  const [selected, setSelected] = useState<number|null>(null);

  return (
    <div className="container py-16 min-h-screen bg-gradient-to-b from-nfi-purple/5 to-background">
      <div className="text-center mb-12">
        <h1 className="font-cartoon text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue mb-2">
          Portfolio
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Obras destacadas de Ana María De Carvalho. Haz clic en cualquier obra para verla en modo exposición.
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-5 md:gap-6">
        {OBRAS.map((obra, idx) => (
          <div
            key={obra.src}
            className="group relative cursor-zoom-in"
            onClick={() => setSelected(idx)}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-nfi-pink bg-white hover:scale-105 transition-transform">
              <Image
                src={obra.src}
                alt={obra.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-nfi-pink/10 group-hover:ring-2 group-hover:ring-nfi-yellow/80 transition-all pointer-events-none"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de exposición */}
      {selected !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative max-w-3xl w-full p-6" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white bg-nfi-pink rounded-full p-2 hover:bg-nfi-yellow transition-colors"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-nfi-yellow bg-white flex items-center justify-center">
              <Image
                src={OBRAS[selected].src}
                alt={OBRAS[selected].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <button
                className="absolute bottom-4 right-4 bg-nfi-pink text-white rounded-full p-2 shadow-lg hover:bg-nfi-yellow transition-colors"
                onClick={() => window.open(OBRAS[selected].src, '_blank')}
                aria-label="Ver en grande"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
              </button>
            </div>
            <div className="mt-6 text-center">
              <h2 className="font-cartoon text-3xl text-nfi-pink mb-2">{OBRAS[selected].title}</h2>
              <span className="text-base text-nfi-yellow">{OBRAS[selected].category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
