import Image from "next/image"
import { LupaMagnifier } from '@/components/LupaMagnifier'
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import TypewriterOnView from "@/components/TypewriterOnView";


// Datos de ejemplo para la colección
const nfts = [
  { id: 1, image: "/images/trust-me.png", title: "Trust Me ✨", price: 1.5 },
  { id: 2, image: "/images/mom-says.png", title: "But Mom Says", price: 1.2 },
  { id: 3, image: "/images/bart-history.png", title: "Historia", price: 1.8 },
  { id: 4, image: "/images/butterflies.png", title: "Mariposas ✨", price: 1.3 },
  { id: 5, image: "/images/shin-chan.png", title: "Corazón", price: 1.6 },
  { id: 6, image: "/images/homer-computer.png", title: "Empieza Ahora", price: 1.4 },
  { id: 7, image: "/images/skull.png", title: "Skull ✨", price: 2.0 },
  { id: 8, image: "/images/lisa-tv.png", title: "TV Off", price: 1.7 },
  { id: 9, image: "/images/figure.png", title: "Figura", price: 1.9 },
  { id: 10, image: "/images/dog.png", title: "Perrito ✨", price: 1.5 },
  { id: 11, image: "/images/skater-easy.png", title: "Hago que parezca fácil ✨", price: 2.2 },
  { id: 12, image: "/images/bichoraro.jpg", title: "Bicho Raro", price: 2.8 },
  { id: 13, image: "/images/floress.jpg", title: "Flores Vibrantes ✨", price: 2.5 },
  { id: 14, image: "/images/toitas.jpg", title: "Toitas ✨", price: 2.3 },
  { id: 15, image: "/images/lisa1.jpg", title: "Lisa 1", price: 2.1 },
  { id: 16, image: "/images/toitas2.jpg", title: "Toitas 2", price: 2.4 },
  { id: 17, image: "/images/lisa2.jpg", title: "Lisa 2 ✨", price: 2.6 },
]

export default function CollectionPage() {
  return (
    <div className="container py-10 bg-gradient-to-b from-nfi-purple/5 to-background">
      <div className="relative mb-6">
        <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
        <h1 className="font-cartoon text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
          Colección NFT
        </h1>
      </div>
      <TypewriterOnView
  text={"Explora la colección completa de 100 NFTs únicos creados por Ana María. Cada obra es irrepetible y ha sido concebida para transmitir una identidad propia, fusionando creatividad, humor y un enfoque artístico contemporáneo."}
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
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </div>

      {/* Grid de NFTs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {nfts.map((nft) => (
          <Link href={`/nft/${nft.id}`} key={nft.id} className="block transform transition-all duration-300 hover:scale-105">
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
                    <p className="text-sm font-medium">{nft.price} SOL</p>
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
