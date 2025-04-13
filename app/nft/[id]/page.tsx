import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Share2, Heart } from "lucide-react"

// Datos de ejemplo para los NFTs
const nftsData = {
  "1": {
    id: 1,
    title: "Trust Me ✨",
    description:
      "Dos personajes compartiendo un momento mágico de confianza mutua, representando la amistad y la complicidad.",
    image: "/images/trust-me.png",
    price: 1.5,
    owner: "Ana María",
    created: "2025-03-15",
  },
  "2": {
    id: 2,
    title: "But Mom Says",
    description:
      "Un personaje elegante que nos recuerda que a veces lo que dice mamá es lo que importa, con un toque de humor.",
    image: "/images/mom-says.png",
    price: 1.2,
    owner: "Ana María",
    created: "2025-03-16",
  },
  "3": {
    id: 3,
    title: "Historia",
    description:
      "Una reinterpretación de Bart Simpson con un mensaje profundo sobre la importancia de recordar nuestra historia.",
    image: "/images/bart-history.png",
    price: 1.8,
    owner: "Ana María",
    created: "2025-03-17",
  },
  "11": {
    id: 11,
    title: "Hago que parezca fácil ✨",
    description:
      "Un personaje confiado montando skateboard con estilo, recordándonos que la verdadera maestría hace que lo difícil parezca sencillo.",
    image: "/images/skater-easy.png",
    price: 2.2,
    owner: "Ana María",
    created: "2025-04-01",
  },
}

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const nft = nftsData[params.id as keyof typeof nftsData]

  if (!nft) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">NFT no encontrado</h1>
        <p className="mb-8">El NFT que estás buscando no existe o ha sido eliminado.</p>
        <Button asChild>
          <Link href="/collection">Volver a la colección</Link>
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
        Volver a la colección
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Imagen del NFT */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg bg-white/90 dark:bg-gray-900/90">
            <Image src={nft.image || "/placeholder.svg"} alt={nft.title} fill className="object-contain" />
            {nft.title.includes("✨") && (
              <span className="absolute top-4 right-4 text-2xl animate-float-medium">✨</span>
            )}
          </div>
        </div>

        {/* Detalles del NFT */}
        <div>
          <div className="flex justify-between items-start">
            <h1 className="font-cartoon text-3xl md:text-4xl mb-2">{nft.title}</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <p className="text-2xl font-bold mb-6">{nft.price} SOL</p>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Descripción</h2>
              <p className="text-muted-foreground">{nft.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Detalles</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Creador</p>
                  <p className="font-medium">
                    {nft.owner} <span className="text-xs">✨</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de creación</p>
                  <p className="font-medium">{nft.created}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID del Token</p>
                  <p className="font-medium">#{nft.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blockchain</p>
                  <p className="font-medium">Solana</p>
                </div>
              </div>
            </div>

            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Button
                className="w-full relative bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue hover:from-nfi-blue hover:via-nfi-pink hover:to-nfi-yellow transition-all duration-500"
                size="lg"
              >
                Comprar NFT <span className="ml-1">✨</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* NFTs relacionados */}
      <div className="mt-16">
        <div className="relative mb-6">
          <span className="absolute -top-6 -left-6 text-xl animate-float-slow">✨</span>
          <h2 className="font-cartoon text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
            También te puede gustar
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.values(nftsData)
            .filter((item) => item.id !== nft.id)
            .slice(0, 4)
            .map((relatedNft) => (
              <Link
                href={`/nft/${relatedNft.id}`}
                key={relatedNft.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 overflow-hidden">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={relatedNft.image || "/placeholder.svg"}
                        alt={relatedNft.title}
                        fill
                        className="object-cover"
                      />
                      {relatedNft.title.includes("✨") && (
                        <span className="absolute top-2 right-2 text-lg animate-float-fast">✨</span>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-cartoon text-lg">{relatedNft.title}</h3>
                        <p className="text-sm font-medium">{relatedNft.price} SOL</p>
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
