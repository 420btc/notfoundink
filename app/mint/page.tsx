"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useWallet } from "@solana/wallet-adapter-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { MintButton } from "@/components/mint-button"
import { Card, CardContent } from "@/components/ui/card"
import { CandyMachineStatus } from "@/components/candy-machine-status"
import { useCandyMachine } from "@/hooks/use-candy-machine"

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
    <div className="relative w-full h-full">
      <Image 
        src={nftImages[currentIndex]} 
        alt="NFT Preview" 
        fill 
        className="object-contain opacity-50 transition-opacity duration-500 blur-[1px]" 
      />
    </div>
  );
}

export default function MintPage() {
  const { connected } = useWallet()
  const [selectedNFTIndex, setSelectedNFTIndex] = useState(0)
  const { 
    mintSuccess, 
    txId, 
    mint, 
    isMinting, 
    isActive, 
    goLiveDate,
    price,
    itemsAvailable,
    itemsRedeemed,
    itemsRemaining
  } = useCandyMachine()
  
  // Usar la fecha de lanzamiento de la Candy Machine o una fecha por defecto
  const targetDate = goLiveDate || new Date(2025, 4, 1) // 1 de mayo de 2025 por defecto
  
  // ID de la Candy Machine (esto debería venir de una variable de entorno en producción)
  // Por ahora usamos un ID de ejemplo
  const CANDY_MACHINE_ID = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || "NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ"
  
  // Colección de NFTs disponibles para la vista previa
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
  
  // Cambiar el NFT seleccionado cada 800ms para la vista previa (mucho más rápido)
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedNFTIndex((prevIndex) => (prevIndex + 1) % nftImages.length)
    }, 800)
    
    return () => clearInterval(interval)
  }, [])
  
  // Ya no necesitamos este manejador porque usamos el hook useCandyMachine

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

        {/* Contador de cuenta atrás o estado actual */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="text-center mb-4">
            {!isActive ? (
              <>
                <h2 className="font-cartoon text-2xl md:text-3xl mb-2">
                  El minteo comienza en <span className="text-nfi-pink">✨</span>
                </h2>
                <p className="text-muted-foreground">No te pierdas el lanzamiento de esta colección única</p>
                <CountdownTimer targetDate={targetDate} />
              </>
            ) : (
              <>
                <h2 className="font-cartoon text-2xl md:text-3xl mb-2">
                  ¡El minteo está <span className="text-nfi-pink">ACTIVO</span>! ✨
                </h2>
                <div className="grid grid-cols-3 gap-4 mt-6 max-w-lg mx-auto">
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Disponibles</p>
                    <p className="text-2xl font-bold">{itemsAvailable}</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Minteados</p>
                    <p className="text-2xl font-bold">{itemsRedeemed}</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Restantes</p>
                    <p className="text-2xl font-bold">{itemsRemaining}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center max-w-4xl mx-auto">
          <div className="w-full max-w-md">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 rounded-lg p-6">
                <div className="aspect-square relative mb-6 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center overflow-hidden backdrop-blur-xl">
                  <Image
                    src={nftImages[selectedNFTIndex]}
                    alt="NFT Preview"
                    width={300}
                    height={300}
                    className="object-contain blur-[3px]"
                  />
                </div>
                
                {/* Estado de la Candy Machine */}
                <div className="mb-6">
                  <CandyMachineStatus />
                </div>
                
                {/* Integración con Candy Machine v2 */}
                <MintButton 
                  onClick={mint}
                  loading={isMinting}
                  disabled={isMinting}
                />
                
                {mintSuccess && txId && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                      ¡NFT minteado con éxito!
                    </p>
                    <p className="text-xs text-muted-foreground break-all">
                      TX ID: {txId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
