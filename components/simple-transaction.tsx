"use client"

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { Loader2, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { getNFTCollection } from '@/lib/simple-solana'

export function SimpleTransaction() {
  const wallet = useWallet()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null)

  const handleMint = async () => {
    if (!wallet.publicKey) {
      toast({
        title: 'Wallet no conectada',
        description: 'Por favor conecta tu wallet para mintear un NFT',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    
    try {
      // En lugar de hacer una transacción real, simulamos el éxito
      // Esto nos permite probar la UI sin depender de la blockchain
      
      // Esperamos un segundo para simular el proceso
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Seleccionamos un NFT aleatorio
      const collection = getNFTCollection()
      const randomIndex = Math.floor(Math.random() * collection.length)
      const nft = collection[randomIndex]
      
      // Actualizamos el estado
      setSelectedNFT(nft)
      setSuccess(true)
      
      toast({
        title: '¡NFT minteado con éxito!',
        description: 'Has minteado un NFT por 0.20 SOL (simulado)',
      })
    } catch (error) {
      console.error('Error en la simulación:', error)
      toast({
        title: 'Error',
        description: 'Hubo un error al simular el minteo',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const resetDemo = () => {
    setSuccess(false)
    setSelectedNFT(null)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center bg-background/50 p-3 rounded-lg">
        <span className="text-sm font-medium">Precio</span>
        <span className="text-lg font-bold text-nfi-pink">0.20 SOL</span>
      </div>
      
      {!success ? (
        <Button
          onClick={handleMint}
          disabled={!wallet.connected || loading}
          className="w-full h-12 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue hover:from-nfi-blue hover:via-nfi-pink hover:to-nfi-yellow transition-all duration-500 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-nfi-yellow/10 via-nfi-pink/10 to-nfi-blue/10 group-hover:opacity-0 transition-opacity duration-300"></span>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-bounce-slow" />
              Mintear por 0.20 SOL (Demo)
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={resetDemo}
          className="w-full h-12 bg-green-500 hover:bg-green-600 transition-colors"
        >
          Mintear otro NFT
        </Button>
      )}
      
      {!wallet.connected && (
        <p className="text-sm text-center text-muted-foreground mt-2">
          Conecta tu wallet para mintear este NFT
        </p>
      )}
      
      {success && selectedNFT && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-green-600 dark:text-green-400 font-medium mb-2">
            ¡NFT minteado con éxito!
          </p>
          <div className="flex flex-col items-center my-3">
            <div className="relative w-32 h-32 mb-2 border-2 border-green-500 rounded-lg overflow-hidden">
              <Image 
                src={selectedNFT} 
                alt="Tu NFT" 
                fill 
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-end justify-center p-2">
                <p className="text-xs text-white font-medium">Tu nuevo NFT</p>
              </div>
            </div>
            <p className="text-sm font-medium text-center mb-2">
              Transacción completada por 0.20 SOL (simulada)
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Nota: Esta es una demostración. En la versión final, se realizará una transacción real en la blockchain.
          </p>
        </div>
      )}
      
      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          <strong>Modo demostración:</strong> Esta versión simula el minteo sin realizar transacciones reales en la blockchain.
        </p>
      </div>
    </div>
  )
}
