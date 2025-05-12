"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sparkles, ArrowRightLeft, Tag, Wallet } from "lucide-react"

// Datos simulados de NFTs en el marketplace
const MARKETPLACE_NFTS = [
  {
    id: "nft1",
    name: "Trust Me ✨",
    image: "/images/trust-me.png",
    price: 2.5,
    seller: "NFT8xQ...3kPz",
    rarity: "Legendary",
  },
  {
    id: "nft2",
    name: "But Mom Says",
    image: "/images/mom-says.png",
    price: 1.8,
    seller: "7Gh5r...9jKm",
    rarity: "Epic",
  },
  {
    id: "nft3",
    name: "Historia",
    image: "/images/bart-history.png",
    price: 1.2,
    seller: "3pQw7...2zLx",
    rarity: "Rare",
  },
  {
    id: "nft4",
    name: "Mariposas ✨",
    image: "/images/butterflies.png",
    price: 3.0,
    seller: "9vBn2...5cRt",
    rarity: "Legendary",
  },
  {
    id: "nft5",
    name: "Corazón",
    image: "/images/shin-chan.png",
    price: 1.5,
    seller: "2xZq8...7mWp",
    rarity: "Uncommon",
  },
  {
    id: "nft6",
    name: "Empieza Ahora",
    image: "/images/homer-computer.png",
    price: 0.9,
    seller: "5tYu3...1jHg",
    rarity: "Common",
  },
  {
    id: "nft7",
    name: "Bicho Raro",
    image: "/images/bichoraro.jpg",
    price: 2.2,
    seller: "8bCh0...r4Ro",
    rarity: "Rare",
  },
]

export function NFTMarketplace() {
  const { connected, publicKey } = useWallet()
  const [selectedNFT, setSelectedNFT] = useState<typeof MARKETPLACE_NFTS[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sellingPrice, setSellingPrice] = useState("")
  const [isListingNFT, setIsListingNFT] = useState(false)
  const { toast } = useToast()

  // Función para comprar un NFT
  const handleBuyNFT = async (nft: typeof MARKETPLACE_NFTS[0]) => {
    if (!connected) {
      toast({
        title: "Wallet no conectada",
        description: "Conecta tu wallet para comprar este NFT.",
        variant: "destructive",
      })
      return
    }

    setSelectedNFT(nft)
    setIsLoading(true)

    try {
      // Simulamos la transacción
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "¡NFT comprado con éxito!",
        description: `Has comprado "${nft.name}" por ${nft.price} SOL.`,
      })

      // Redirigir al usuario a su colección después de un breve retraso
      setTimeout(() => {
        window.location.href = "/profile"
      }, 1500)
    } catch (error) {
      toast({
        title: "Error al comprar NFT",
        description: "Ha ocurrido un error durante la transacción.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setSelectedNFT(null)
    }
  }

  // Función para listar un NFT para la venta
  const handleListNFT = async () => {
    if (!connected) {
      toast({
        title: "Wallet no conectada",
        description: "Conecta tu wallet para listar tu NFT.",
        variant: "destructive",
      })
      return
    }

    if (!sellingPrice || isNaN(parseFloat(sellingPrice)) || parseFloat(sellingPrice) <= 0) {
      toast({
        title: "Precio inválido",
        description: "Por favor ingresa un precio válido mayor que cero.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulamos el proceso de listado
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "¡NFT listado con éxito!",
        description: `Tu NFT ha sido listado en el marketplace por ${sellingPrice} SOL.`,
      })

      // Limpiar el formulario
      setSellingPrice("")
      setIsListingNFT(false)
    } catch (error) {
      toast({
        title: "Error al listar NFT",
        description: "Ha ocurrido un error durante el proceso de listado.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      {/* Sección de NFTs en venta */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-cartoon text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
            NFTs en Venta <span className="text-nfi-pink">✨</span>
          </h2>
          <Button
            variant="outline"
            className="gap-2 border-nfi-pink text-nfi-pink hover:bg-nfi-pink/20"
            onClick={() => setIsListingNFT(true)}
            disabled={!connected}
          >
            <Tag className="h-4 w-4" />
            Vender mi NFT
          </Button>
        </div>

        {/* Grid de NFTs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {MARKETPLACE_NFTS.map((nft) => (
            <div key={nft.id} className="transform transition-all duration-300 hover:scale-105">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="w-full">
                        <p className="text-white font-cartoon text-lg">{nft.name}</p>
                        <p className="text-white text-sm">{nft.rarity}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-white font-bold">{nft.price} SOL</p>
                          <Button
                            size="sm"
                            className="bg-nfi-pink hover:bg-nfi-pink/80"
                            onClick={() => handleBuyNFT(nft)}
                            disabled={isLoading && selectedNFT?.id === nft.id}
                          >
                            {isLoading && selectedNFT?.id === nft.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Comprar"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para listar un NFT */}
      {isListingNFT && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75"></div>
            <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <h3 className="font-cartoon text-2xl mb-4 text-center">Vender mi NFT</h3>
                
                <div className="space-y-4">
                  <div className="relative aspect-square w-40 mx-auto mb-4">
                    <Image
                      src="/images/trust-me.png"
                      alt="Tu NFT"
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Precio en SOL</label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        className="pl-10"
                      />
                      <ArrowRightLeft className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsListingNFT(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="flex-1 gap-2 bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500"
                      onClick={handleListNFT}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Tag className="h-4 w-4" />
                          Listar NFT
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Sección de información sobre el marketplace */}
      <div className="mt-16">
        <h2 className="font-cartoon text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink mb-6">
          Sobre el Marketplace <span className="text-nfi-blue">✨</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Compra Segura",
              description: "Todas las transacciones están respaldadas por contratos inteligentes en la blockchain de Solana, garantizando seguridad y transparencia.",
              icon: <Wallet className="h-8 w-8 text-nfi-yellow" />,
            },
            {
              title: "Comisiones Bajas",
              description: "Nuestro marketplace cobra solo un 2.5% de comisión por venta, muy por debajo del estándar de la industria.",
              icon: <ArrowRightLeft className="h-8 w-8 text-nfi-pink" />,
            },
            {
              title: "Royalties para Artistas",
              description: "El 5% de cada venta secundaria va directamente a Ana María, la artista detrás de la colección, apoyando su trabajo creativo.",
              icon: <Sparkles className="h-8 w-8 text-nfi-blue" />,
            },
          ].map((item, index) => (
            <Card key={index} className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Llamada a la acción */}
      {!connected && (
        <div className="mt-10 text-center">
          <p className="text-lg mb-4">Conecta tu wallet para comprar y vender NFTs</p>
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <Link href="/" className="relative inline-block">
              <Button className="gap-2 bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500">
                <Wallet className="h-4 w-4" />
                Conectar Wallet
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
