'use client';

import Image from "next/image"
import { LupaMagnifier } from '@/components/LupaMagnifier'
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import TypewriterOnView from "@/components/TypewriterOnView";
import { useState, useMemo } from "react";

// Datos de ejemplo para la colección
const nfts = [
  { id: 1, image: "/images/trust-me.png", title: "Trust Me ✨" },
  { id: 2, image: "/images/mom-says.png", title: "But Mom Says" },
  { id: 3, image: "/images/bart-history.png", title: "Su historia..." },
  { id: 4, image: "/images/butterflies.png", title: "Mariposas ✨" },
  { id: 5, image: "/images/shin-chan.png", title: "Corazón" },
  { id: 6, image: "/images/homer-computer.png", title: "Empieza Ahora" },
  { id: 7, image: "/images/skull.png", title: "Skull ✨" },
  { id: 8, image: "/images/lisa-tv.png", title: "TV Off" },
  { id: 9, image: "/images/figure.png", title: "Figura" },
  { id: 10, image: "/images/dog.png", title: "Perrito ✨" },
  { id: 11, image: "/images/skater-easy.png", title: "Hago que parezca fácil ✨" },
  { id: 12, image: "/images/bichoraro.jpg", title: "Bicho Raro" },
  { id: 13, image: "/images/floress.jpg", title: "Flores Vibrantes ✨" },
  { id: 14, image: "/images/toitas.jpg", title: "El Pasado...✨" },
  { id: 15, image: "/images/lisa1.jpg", title: "Lisa 1" },
  { id: 16, image: "/images/toitas2.jpg", title: "Tan frio..." },
  { id: 17, image: "/images/lisa2.jpg", title: "Lisa 2 ✨" },
  { id: 18, image: "/images/Nuevo (1).jpg", title: "Asuntos del Corazón" },
  { id: 19, image: "/images/Nuevo (3).jpg", title: "¿Gesto de amor?✨" },
  { id: 20, image: "/images/Nuevo (4).jpg", title: "Aferrarse" },
  { id: 21, image: "/images/Nuevo (5).jpg", title: "Libertad ✨" },
  { id: 22, image: "/images/Nuevo (6).jpg", title: "Crisis Previa" },
  { id: 23, image: "/images/Nuevo (7).jpg", title: "Asuntos✨" },
  { id: 24, image: "/images/Nuevo (8).jpg", title: "Gesto de Amor ✨" },
]

export default function CollectionPage() {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  const sortedNfts = useMemo(() => {
    return [...nfts].sort((a, b) => {
      return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
    });
  }, [sortOrder]);

  return (
    <div className="container py-10 bg-gradient-to-b from-nfi-purple/5 to-background">
      <div className="relative mb-6">
        <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
        <h1 className="font-cartoon text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
          Galería de Arte
        </h1>
      </div>
      <TypewriterOnView
  text={"Explora la colección completa de 100 obras únicas creadas por Ana María. Cada pieza es irrepetible y ha sido concebida para transmitir una identidad propia, fusionando nostalgia, creatividad y un enfoque artístico contemporáneo."}
  className="text-lg mb-8 max-w-3xl"
  as="p"
>
  <span className="text-nfi-pink text-sm">✨</span>
</TypewriterOnView>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button 
            className="gap-2 bg-nfi-pink text-white font-bold hover:bg-nfi-yellow hover:text-nfi-blue transition-all duration-300"
            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
          >
            <ArrowUpDown className="h-4 w-4" />
            {sortOrder === 'newest' ? 'Más recientes' : 'Más antiguos'}
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </div>

      {/* Grid de NFTs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {sortedNfts.map((nft) => (
          <Link href={`/collection/${nft.id}`} key={nft.id} className="block transform transition-all duration-300 hover:scale-105">
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 overflow-hidden w-full h-full flex flex-col">
                <div className="relative overflow-hidden aspect-square">
                  <LupaMagnifier src={nft.image || "/placeholder.svg"} alt={nft.title} className="object-contain rounded-lg w-full h-full" />
                  {nft.title.includes("✨") && (
                    <span className="absolute top-2 right-2 text-lg animate-float-fast">✨</span>
                  )}
                </div>
                <CardContent className="p-4 bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-center h-full">
                    <h3 className="font-cartoon text-base md:text-lg">{nft.title}</h3>
                    <p className="text-sm font-bold text-nfi-pink">{nft.id}/100</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-10">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" disabled>
            &lt;
          </Button>
          <Button variant="default" size="icon">
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
