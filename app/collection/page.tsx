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
import { artworksArray } from "@/lib/data";
import { LayoutGrid, Grid2X2 } from "lucide-react"

export default function CollectionPage() {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [columns, setColumns] = useState<1 | 2>(2);
  
  const sortedNfts = useMemo(() => {
    return [...artworksArray].sort((a, b) => {
      return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
    });
  }, [sortOrder]);

  return (
    <div className="container py-10 bg-white">
      <div className="relative mb-6">
        <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
        <h1 className="font-cartoon text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
          Galería de Arte
        </h1>
      </div>
      <TypewriterOnView
  text={"Explora la colección completa de 100 obras únicas creadas por Ana María."}
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
          
          {/* Botón de cambio de vista para móvil */}
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden"
            onClick={() => setColumns(prev => prev === 1 ? 2 : 1)}
          >
            {columns === 1 ? <Grid2X2 className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Grid de NFTs */}
      <div className={`grid ${columns === 1 ? 'grid-cols-1' : 'grid-cols-2'} sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8`}>
        {sortedNfts.map((nft) => (
          <Link href={`/collection/${nft.id}`} key={nft.id} className="block transform transition-all duration-300 hover:scale-105">
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 overflow-hidden w-full h-full flex flex-col shadow-sm hover:shadow-md">
                <div className="relative overflow-hidden aspect-square">
                  <LupaMagnifier src={nft.image || "/placeholder.svg"} alt={nft.title} className="object-cover rounded-t-lg w-full h-full" />
                  {nft.title.includes("✨") && (
                    <span className="absolute top-1 right-1 sm:top-2 sm:right-2 text-sm sm:text-lg animate-float-fast">✨</span>
                  )}
                </div>
                <CardContent className="p-3 sm:p-4 bg-white dark:bg-gray-900">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-full gap-1">
                    <h3 className="font-cartoon text-sm sm:text-base md:text-lg leading-tight line-clamp-1">{nft.title}</h3>
                    <p className="text-xs sm:text-sm font-bold text-nfi-pink shrink-0">{nft.id}/100</p>
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
