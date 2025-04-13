"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWallet } from "@/components/wallet-provider"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sparkles } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"

// Componente para rotar NFTs cada 1.3 segundos
function NFTRotation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nftImages = [
    "/images/trust-me.png",
    "/images/mom-says.png",
    "/images/bart-history.png",
    "/images/butterflies.png",
    "/images/shin-chan.png",
    "/images/homer-computer.png",
    "/images/skull.png",
    "/images/lisa-tv.png",
    "/images/skater-easy.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % nftImages.length);
    }, 1300); // Cambiar cada 1.3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <Image 
      src={nftImages[currentIndex]} 
      alt="NFT Preview" 
      fill 
      className="object-contain opacity-50 transition-opacity duration-500" 
    />
  );
}

export default function MintPage() {
  const { connected } = useWallet()
  const { toast } = useToast()
  const [isMinting, setIsMinting] = useState(false)
  const [mintedNft, setMintedNft] = useState<null | { id: number; image: string; title: string }>(null)

  // Fecha objetivo para el contador (7 días a partir de ahora)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)

  // Función para simular el mint de un NFT
  const handleMint = async () => {
    if (!connected) {
      toast({
        title: "Wallet no conectada",
        description: "Conecta tu wallet para poder mintear un NFT.",
        variant: "destructive",
      })
      return
    }

    setIsMinting(true)

    try {
      // Simulamos el proceso de mint
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Seleccionamos un NFT aleatorio de nuestra colección
      const nftImages = [
        "/images/trust-me.png",
        "/images/mom-says.png",
        "/images/bart-history.png",
        "/images/butterflies.png",
        "/images/shin-chan.png",
        "/images/homer-computer.png",
        "/images/skull.png",
        "/images/lisa-tv.png",
        "/images/skater-easy.png",
      ]

      const nftTitles = [
        "Trust Me ✨",
        "But Mom Says",
        "Historia",
        "Mariposas ✨",
        "Corazón",
        "Empieza Ahora",
        "Skull ✨",
        "TV Off",
        "Hago que parezca fácil ✨",
      ]

      const randomIndex = Math.floor(Math.random() * nftImages.length)

      setMintedNft({
        id: Math.floor(Math.random() * 100) + 1,
        image: nftImages[randomIndex],
        title: nftTitles[randomIndex],
      })

      toast({
        title: "¡NFT minteado con éxito! ✨",
        description: "Tu NFT ha sido minteado y añadido a tu wallet.",
      })
    } catch (error) {
      toast({
        title: "Error al mintear",
        description: "Ha ocurrido un error durante el proceso de mint.",
        variant: "destructive",
      })
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="relative">
      {/* Fondo con patrón de perros y gatos */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/dogs-cats-pattern.jpeg"
          alt="Fondo de perros y gatos"
          fill
          className="object-cover blur-[2px] opacity-30"
        />
      </div>

      <div className="container py-10 relative z-10">
        <div className="relative text-center mb-6">
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-float-slow">✨</span>
          <h1 className="font-cartoon text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
            Mint tu NFT
          </h1>
        </div>
        <p className="text-lg mb-6 max-w-3xl mx-auto text-center">
          Mintea tu propio NFT de la colección "Not Found Ink" de Ana María. Cada NFT es único y se genera
          aleatoriamente de la colección. <span className="text-nfi-pink text-sm">✨</span>
        </p>

        {/* Contador de cuenta atrás */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="text-center mb-4">
            <h2 className="font-cartoon text-2xl md:text-3xl mb-2">
              El minteo comienza en <span className="text-nfi-pink">✨</span>
            </h2>
            <p className="text-muted-foreground">No te pierdas el lanzamiento de esta colección única</p>
          </div>
          <CountdownTimer targetDate={targetDate} />
        </div>

        <div className="max-w-md mx-auto">
          {mintedNft ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={mintedNft.image || "/placeholder.svg"}
                    alt={mintedNft.title}
                    fill
                    className="object-contain"
                  />
                  {mintedNft.title.includes("✨") && (
                    <span className="absolute top-4 right-4 text-2xl animate-float-medium">✨</span>
                  )}
                </div>
                <CardContent className="p-6 text-center">
                  <h2 className="font-cartoon text-2xl mb-2">{mintedNft.title}</h2>
                  <p className="text-muted-foreground mb-4">NFT #{mintedNft.id}</p>
                  <p className="mb-6">¡Felicidades! Has minteado este NFT único de la colección "Not Found Ink".</p>
                  <div className="flex gap-4 justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                      <Button
                        onClick={() => setMintedNft(null)}
                        className="relative bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink hover:from-nfi-pink hover:via-nfi-purple hover:to-nfi-blue transition-all duration-500 shadow-lg shadow-nfi-pink/20"
                      >
                        <div className="flex items-center gap-2">
                          Mintear otro
                          <span className="relative w-5 h-5">
                            <span className="absolute inset-0 animate-ping opacity-75 text-xs">✨</span>
                            <span className="relative text-xs">✨</span>
                          </span>
                        </div>
                      </Button>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                      <Button variant="outline" className="relative border-nfi-pink text-nfi-pink hover:bg-nfi-pink/20">
                        Ver en Explorer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="aspect-square relative mb-6 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="relative w-3/4 h-3/4">
                      {/* Rotación de NFTs difuminados */}
                      <NFTRotation />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm">
                        <Sparkles className="h-16 w-16 text-nfi-yellow animate-pulse absolute left-10" />
                        <span className="absolute bottom-10 right-10 text-3xl animate-float-slow">✨</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-center">
                    <h2 className="font-cartoon text-2xl">
                      Mintea tu NFT <span className="text-sm">✨</span>
                    </h2>
                    <p className="text-muted-foreground">Precio: 1.5 SOL</p>
                    <div className="relative group w-full">
                      <div className="absolute -inset-1 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                      <Button
                        onClick={handleMint}
                        disabled={isMinting || !connected}
                        className="w-full relative bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink hover:from-nfi-pink hover:via-nfi-purple hover:to-nfi-blue transition-all duration-500 shadow-lg shadow-nfi-pink/20"
                        size="lg"
                      >
                        {isMinting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Minteando...
                          </>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            <span>Mintear NFT</span>
                            <span className="relative w-5 h-5">
                              <span className="absolute inset-0 animate-ping opacity-75 text-xs">✨</span>
                              <span className="relative text-xs">✨</span>
                            </span>
                          </div>
                        )}
                      </Button>
                    </div>
                    {!connected && (
                      <p className="text-sm text-muted-foreground">Conecta tu wallet para mintear un NFT</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Información sobre el proceso de mint */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative text-center mb-6">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-2xl animate-float-medium">
              ✨
            </span>
            <h2 className="font-cartoon text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
              Sobre el Proceso de Mint
            </h2>
          </div>
          <div className="grid gap-6">
            {[
              {
                title: "¿Qué es un Candy Machine? ✨",
                description:
                  "El Candy Machine es un programa en la blockchain de Solana que permite la distribución justa y eficiente de NFTs. Garantiza que cada NFT sea único y que el proceso de mint sea transparente.",
                color: "nfi-yellow",
              },
              {
                title: "Rampa Crypto",
                description:
                  "Nuestra aplicación incluye una rampa crypto que te permite comprar SOL directamente con tu tarjeta de crédito o débito, facilitando el proceso de adquisición de NFTs incluso si no tienes experiencia previa con criptomonedas.",
                color: "nfi-pink",
              },
              {
                title: "Gastos de Red",
                description:
                  "Al mintear un NFT en Solana, pagarás una pequeña tarifa de red (gas fee) además del precio del NFT. Estas tarifas son significativamente más bajas en Solana comparado con otras blockchains.",
                color: "nfi-blue",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div
                  className={`absolute -inset-1 bg-gradient-to-r from-${item.color} to-${item.color}/50 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
                ></div>
                <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    {index === 0 && <span className="absolute top-2 right-2 text-lg animate-float-fast">✨</span>}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
