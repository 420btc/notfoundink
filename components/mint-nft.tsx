"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useWallet } from "@/components/wallet-provider"
import { mintNFT } from "@/lib/nft-utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

// ID simulado del Candy Machine
const CANDY_MACHINE_ID = "NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ"

export function MintNFT({ selectedNFT }: { selectedNFT: string }) {
  const { connected, publicKey, solanaConnection } = useWallet()
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [mintedNFT, setMintedNFT] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleMint = async () => {
    if (!connected || !publicKey || !solanaConnection) {
      toast({
        title: "Wallet no conectada",
        description: "Por favor conecta tu wallet para mintear un NFT.",
        variant: "destructive",
      })
      return
    }

    setIsMinting(true)
    try {
      const result = await mintNFT(solanaConnection, publicKey, CANDY_MACHINE_ID)
      
      if (result.success && result.mint) {
        setMintSuccess(true)
        setMintedNFT(result.mint)
        toast({
          title: "¡NFT minteado con éxito!",
          description: "Tu NFT ha sido minteado y añadido a tu colección.",
        })
      } else {
        throw new Error(result.error || "Error desconocido al mintear")
      }
    } catch (error: any) {
      console.error("Error al mintear NFT:", error)
      toast({
        title: "Error al mintear NFT",
        description: error.message || "Ocurrió un error al mintear tu NFT. Por favor intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsMinting(false)
    }
  }

  const viewCollection = () => {
    router.push("/profile")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="relative overflow-hidden border-2 border-nfi-pink/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-nfi-yellow/20 via-nfi-pink/20 to-nfi-blue/20 z-0"></div>
        <CardContent className="p-6 relative z-10">
          {!mintSuccess ? (
            <>
              <div className="aspect-square relative mb-6 rounded-xl overflow-hidden">
                <Image
                  src={selectedNFT}
                  alt="NFT a mintear"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent flex items-end p-4">
                  <div>
                    <p className="text-white font-cartoon text-xl">Not Found Ink</p>
                    <p className="text-white text-sm">Edición Limitada</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">Precio</p>
                    <p className="text-2xl font-cartoon text-nfi-pink">0.5 SOL</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">Disponibles</p>
                    <p className="text-2xl font-cartoon text-nfi-blue">42/100</p>
                  </div>
                </div>
                
                <Button
                  onClick={handleMint}
                  disabled={isMinting || !connected}
                  className="w-full h-12 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue hover:from-nfi-blue hover:via-nfi-pink hover:to-nfi-yellow transition-all duration-500"
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Minteando...
                    </>
                  ) : (
                    "Mintear NFT"
                  )}
                </Button>
                
                {!connected && (
                  <p className="text-sm text-center text-muted-foreground">
                    Conecta tu wallet para mintear este NFT
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src="/images/success-check.gif"
                    alt="Éxito"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-cartoon mt-4 mb-2 text-nfi-pink">¡Minteado con éxito!</h3>
                <p className="text-muted-foreground mb-6">
                  Tu NFT ha sido minteado y añadido a tu colección.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={viewCollection}
                  className="w-full bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500"
                >
                  Ver mi colección
                </Button>
                
                <div className="text-sm text-center">
                  <p className="text-muted-foreground">ID de la transacción:</p>
                  <p className="font-mono text-xs break-all">{mintedNFT}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
