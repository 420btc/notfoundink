import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Share2, Heart } from "lucide-react"
import { artworksData } from "@/lib/data"

import { ShareButton } from "@/components/share-button"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const artwork = artworksData[id as keyof typeof artworksData]

  if (!artwork) {
    return {
      title: "Obra no encontrada | Not Found Ink",
    }
  }

  return {
    title: `${artwork.title} | Not Found Ink`,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} - Arte por Ana María`,
      description: artwork.description,
      images: [artwork.image],
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(artworksData).map((id) => ({
    id: id,
  }))
}

export default async function ArtworkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const artwork = artworksData[id as keyof typeof artworksData]

  if (!artwork) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Obra no encontrada</h1>
        <p className="mb-8">La obra que estás buscando no existe o ha sido eliminada.</p>
        <Button asChild>
          <Link href="/collection">Volver a la galería</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10 bg-gradient-to-b from-nfi-purple/5 to-background">
      <Link
        href="/collection"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la galería
      </Link>

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
        {/* Imagen de la Obra - Ocupa más espacio (3 columnas en desktop) */}
        <div className="lg:col-span-3 relative group flex flex-col">
          <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[80vh] overflow-hidden rounded-lg shadow-lg bg-white/90 dark:bg-gray-900/90">
            <Image 
              src={artwork.image || "/placeholder.svg"} 
              alt={artwork.title} 
              fill 
              className="object-contain" 
              priority 
            />
            {artwork.title.includes("✨") && (
              <span className="absolute top-4 right-4 text-3xl animate-float-medium">✨</span>
            )}
          </div>
        </div>

        {/* Detalles de la Obra - Ocupa menos espacio (2 columnas en desktop) */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-cartoon text-3xl md:text-4xl mb-2">{artwork.title}</h1>
              <p className="text-xl font-bold text-nfi-pink">#{artwork.id}/100</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <ShareButton title={artwork.title} text={artwork.description} />
            </div>
          </div>

          <div className="space-y-6 mt-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Descripción</h2>
              <p className="text-muted-foreground">{artwork.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Detalles</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Creador</p>
                  <p className="font-medium">
                    {artwork.owner} <span className="text-xs">✨</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de creación</p>
                  <p className="font-medium">{artwork.created}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow text-white font-bold py-6 text-lg shadow-lg transform transition-all hover:scale-105">
                    Adquirir Obra ✨
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                    Pieza única verificada digitalmente.
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Obras relacionadas */}
      <div className="mt-16">
        <div className="relative mb-6">
          <span className="absolute -top-6 -left-6 text-xl animate-float-slow">✨</span>
          <h2 className="font-cartoon text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
            También te puede gustar
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.values(artworksData)
            .filter((item) => item.id !== artwork.id)
            .slice(0, 4)
            .map((relatedArtwork) => (
              <Link
                href={`/collection/${relatedArtwork.id}`}
                key={relatedArtwork.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 overflow-hidden">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={relatedArtwork.image || "/placeholder.svg"}
                        alt={relatedArtwork.title}
                        fill
                        className="object-cover"
                      />
                      {relatedArtwork.title.includes("✨") && (
                        <span className="absolute top-2 right-2 text-lg animate-float-fast">✨</span>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-cartoon text-base md:text-lg">{relatedArtwork.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
