import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Share2, Heart } from "lucide-react"

// Datos de ejemplo para las obras
const artworksData = {
  "1": {
    id: 1,
    title: "Trust Me ✨",
    description:
      "Dos personajes compartiendo un momento mágico de confianza mutua, representando la amistad y la complicidad.",
    image: "/images/trust-me.png",
    owner: "Ana María",
    created: "2025-03-15",
  },
  "2": {
    id: 2,
    title: "But Mom Says",
    description:
      "Un personaje elegante que nos recuerda que a veces lo que dice mamá es lo que importa, con un toque de humor.",
    image: "/images/mom-says.png",
    owner: "Ana María",
    created: "2025-03-16",
  },
  "3": {
    id: 3,
    title: "Historia",
    description:
      "Una reinterpretación de Bart Simpson con un mensaje profundo sobre la importancia de recordar nuestra historia.",
    image: "/images/bart-history.png",
    owner: "Ana María",
    created: "2025-03-17",
  },
  "4": {
    id: 4,
    title: "Mariposas ✨",
    description:
      "Una representación delicada de la belleza y la transformación, simbolizada por mariposas que rodean al personaje principal.",
    image: "/images/butterflies.png",
    owner: "Ana María",
    created: "2025-03-18",
  },
  "5": {
    id: 5,
    title: "Corazón",
    description:
      "Una interpretación de Shin Chan que explora el tema del amor y la amistad con el estilo característico de Ana María.",
    image: "/images/shin-chan.png",
    owner: "Ana María",
    created: "2025-03-19",
  },
  "6": {
    id: 6,
    title: "Empieza Ahora",
    description:
      "Un homenaje a Homer Simpson frente a la computadora, recordando que nunca es tarde para comenzar algo nuevo.",
    image: "/images/homer-computer.png",
    owner: "Ana María",
    created: "2025-03-20",
  },
  "7": {
    id: 7,
    title: "Skull ✨",
    description:
      "Una calavera estilizada que combina elementos de la cultura pop con un mensaje sobre la fugacidad de la vida.",
    image: "/images/skull.png",
    owner: "Ana María",
    created: "2025-03-21",
  },
  "8": {
    id: 8,
    title: "TV Off",
    description:
      "Lisa Simpson nos invita a apagar la televisión y explorar el mundo real, con un mensaje sobre la desconexión digital.",
    image: "/images/lisa-tv.png",
    owner: "Ana María",
    created: "2025-03-22",
  },
  "9": {
    id: 9,
    title: "Figura",
    description:
      "Una silueta enigmática que invita al espectador a completar la historia con su propia interpretación.",
    image: "/images/figure.png",
    owner: "Ana María",
    created: "2025-03-23",
  },
  "10": {
    id: 10,
    title: "Perrito ✨",
    description:
      "Un adorable perro con el estilo característico de Ana María, simbolizando la lealtad y la amistad incondicional.",
    image: "/images/dog.png",
    owner: "Ana María",
    created: "2025-03-24",
  },
  "11": {
    id: 11,
    title: "Hago que parezca fácil ✨",
    description:
      "Un personaje confiado montando skateboard con estilo, recordándonos que la verdadera maestría hace que lo difícil parezca sencillo.",
    image: "/images/skater-easy.png",
    owner: "Ana María",
    created: "2025-04-01",
  },
}

export default function ArtworkDetailPage({ params }: { params: { id: string } }) {
  const artwork = artworksData[params.id as keyof typeof artworksData]

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

      <div className="grid md:grid-cols-2 gap-10">
        {/* Imagen de la Obra */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg bg-white/90 dark:bg-gray-900/90">
            <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-contain" />
            {artwork.title.includes("✨") && (
              <span className="absolute top-4 right-4 text-2xl animate-float-medium">✨</span>
            )}
          </div>
        </div>

        {/* Detalles de la Obra */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-cartoon text-3xl md:text-4xl mb-2">{artwork.title}</h1>
              <p className="text-xl font-bold text-nfi-pink">#{artwork.id}/100</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
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
