"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useWallet } from "@solana/wallet-adapter-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { MintButton } from "@/components/mint-button"
import { Card, CardContent } from "@/components/ui/card"
import { CandyMachineStatus } from "@/components/candy-machine-status"
import { useCandyMachine } from "@/hooks/use-candy-machine"
import { SimpleMintButton } from "@/components/simple-mint-button"
import { GetDevnetSol } from "@/components/get-devnet-sol"
import { SimpleTransaction } from "@/components/simple-transaction"

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
            {/* Mostramos que la colección está activa */}
            <h2 className="font-cartoon text-2xl md:text-3xl mb-2">
              ¡El minteo está <span className="text-nfi-pink animate-pulse">ACTIVO</span>! ✨
            </h2>
            <p className="text-muted-foreground">Mintea tu NFT de Not Found Ink ahora mismo</p>
            
            {/* Añadimos un banner informativo con estilo mejorado */}
            <div className="mt-6 p-4 bg-green-900 border-2 border-green-400 rounded-lg max-w-lg mx-auto shadow-lg shadow-green-900/50 animate-pulse-slow relative overflow-hidden">
              {/* Efecto de brillo neón */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/30 to-green-500/0 animate-shimmer"></div>
              <p className="text-lg font-medium text-green-300 drop-shadow-md relative z-10 text-center">
                <span className="font-bold text-green-100">COLECCIÓN ACTIVA</span> - Consigue tu NFT por solo <span className="font-extrabold text-xl text-white drop-shadow-glow">0.20 SOL</span>
              </p>
            </div>
            
            {/* Estadísticas de la colección */}
            <div className="grid grid-cols-3 gap-4 mt-6 max-w-lg mx-auto">
              <div className="bg-background/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{itemsAvailable}</p>
              </div>
              <div className="bg-background/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Minteados</p>
                <p className="text-2xl font-bold">{itemsRedeemed}</p>
              </div>
              <div className="bg-background/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Disponibles</p>
                <p className="text-2xl font-bold">{itemsRemaining}</p>
                <p className="text-xs text-green-600 dark:text-green-400 animate-pulse">Solo 0.20 SOL</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center max-w-4xl mx-auto">
          <div className="w-full max-w-md">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 rounded-lg p-6">
                <div className="aspect-square relative mb-6 rounded-lg flex items-center justify-center overflow-hidden group bg-white dark:bg-white">
                  {/* Fondo blanco puro */}
                  <div className="absolute inset-0 bg-white"></div>
                  <Image
                    src={nftImages[selectedNFTIndex]}
                    alt="NFT Preview"
                    width={300}
                    height={300}
                    className="object-contain z-10 transition-all duration-500 group-hover:scale-105 blur-[3px] group-hover:blur-[1px]"
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <p className="text-sm font-medium bg-black/60 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                      Precio: 0.20 SOL
                    </p>
                  </div>
                </div>
                
                {/* Estado de la Candy Machine */}
                <div className="mb-6">
                  <CandyMachineStatus />
                </div>
                
                {/* Integración real con Solana Mainnet */}
                <SimpleMintButton />
                
                {mintSuccess && txId && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                      ¡NFT minteado con éxito!
                    </p>
                    <div className="flex flex-col items-center my-3">
                      {mintSuccess && (
                        <div className="relative w-32 h-32 mb-2 border-2 border-green-500 rounded-lg overflow-hidden">
                          <Image 
                            src={nftImages[selectedNFTIndex]} 
                            alt="Tu NFT" 
                            fill 
                            className="object-contain"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-end justify-center p-2">
                            <p className="text-xs text-white font-medium">Tu nuevo NFT</p>
                          </div>
                        </div>
                      )}
                      <p className="text-sm font-medium text-center mb-2">
                        Transacción completada por {price} SOL
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground break-all">
                      TX ID: <a href={`https://explorer.solana.com/tx/${txId}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{txId}</a>
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
            <span className="absolute -top-4 left-1/3 transform -translate-x-1/2 text-xl animate-float-slow">
              ✨
            </span>
            <span className="absolute -top-8 right-1/3 transform -translate-x-1/2 text-xl animate-float-fast">
              ✨
            </span>
            <h2 className="font-cartoon text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
              Sobre el Proceso de Mint
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Colección Activa ✨",
                description:
                  "La colección Not Found Ink está activa y lista para mintear. Cada NFT cuesta solo 0.20 SOL y se asigna aleatoriamente de nuestra colección de arte único que mezcla Los Simpson, Futurama y Shin Chan con toques japoneses.",
                color: "nfi-yellow",
              },
              {
                title: "Transacción Real en Solana",
                description:
                  "Al mintear un NFT, realizas una transacción real en la blockchain de Solana. El pago de 0.20 SOL se procesa de forma segura y transparente, y tu NFT se envía directamente a tu wallet conectada.",
                color: "nfi-pink",
              },
              {
                title: "Colección Limitada",
                description:
                  "Not Found Ink es una colección limitada de 100 NFTs únicos. Cada pieza es un artículo de colección digital con un estilo artístico distintivo que combina elementos de la cultura pop y el arte japonés.",
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
