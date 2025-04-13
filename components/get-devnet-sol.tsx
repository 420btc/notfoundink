"use client"

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export function GetDevnetSol() {
  const wallet = useWallet()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const requestDevnetSol = async () => {
    if (!wallet.publicKey) {
      toast({
        title: 'Wallet no conectada',
        description: 'Por favor conecta tu wallet primero',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      // Mostrar instrucciones para obtener SOL manualmente ya que los faucets API son poco confiables
      toast({
        title: 'Instrucciones para obtener SOL',
        description: 'Te mostraremos cómo obtener SOL para pruebas',
      })
      
      // Abrir el faucet en una nueva pestaña
      window.open(`https://solfaucet.com/?recipient=${wallet.publicKey.toString()}`, '_blank')
      
      toast({
        title: 'Sigue estos pasos',
        description: '1. En la página que se abrió, selecciona "Devnet". 2. Haz clic en "Request SOL". 3. Vuelve a esta página cuando termines.',
      })
    } catch (error) {
      console.error('Error al solicitar SOL:', error)
      toast({
        title: 'Error',
        description: 'Hubo un problema al abrir el faucet. Visita https://solfaucet.com manualmente.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      <Button 
        onClick={requestDevnetSol} 
        disabled={!wallet.connected || loading}
        variant="outline"
        size="sm"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Abriendo faucet...
          </>
        ) : (
          'Obtener SOL para pruebas (abre faucet)'
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground mt-1">
        Solicita SOL gratis para probar en devnet
      </p>
    </div>
  )
}
