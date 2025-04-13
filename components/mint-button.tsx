"use client"

import { Button } from '@/components/ui/button'
import { Loader2, Sparkles } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useCandyMachine } from '@/hooks/use-candy-machine'

interface MintButtonProps {
  onClick?: () => Promise<void>
  loading?: boolean
  disabled?: boolean
  showPrice?: boolean
}

export function MintButton({ 
  onClick, 
  loading: externalLoading, 
  disabled: externalDisabled,
  showPrice = true
}: MintButtonProps) {
  const wallet = useWallet()
  const { 
    mint, 
    isMinting, 
    isActive, 
    itemsRemaining,
    price
  } = useCandyMachine()

  // Usar los valores del hook si no se proporcionan externamente
  const handleClick = onClick || mint
  const loading = externalLoading !== undefined ? externalLoading : isMinting
  const disabled = externalDisabled !== undefined ? externalDisabled : !isActive || itemsRemaining === 0

  return (
    <div className="w-full space-y-4">
      {showPrice && price > 0 && (
        <div className="flex justify-between items-center bg-background/50 p-3 rounded-lg">
          <span className="text-sm font-medium">Precio</span>
          <span className="text-lg font-bold text-nfi-pink">{price} SOL</span>
        </div>
      )}
      
      <Button
        onClick={handleClick}
        disabled={!wallet.connected || disabled || loading}
        className="w-full h-12 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue hover:from-nfi-blue hover:via-nfi-pink hover:to-nfi-yellow transition-all duration-500 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-nfi-yellow/10 via-nfi-pink/10 to-nfi-blue/10 group-hover:opacity-0 transition-opacity duration-300"></span>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Minteando...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4 animate-bounce-slow" />
            Mintear NFT
          </>
        )}
      </Button>
      
      {!wallet.connected && (
        <p className="text-sm text-center text-muted-foreground mt-2">
          Conecta tu wallet para mintear este NFT
        </p>
      )}
      
      {wallet.connected && !isActive && (
        <p className="text-sm text-center text-yellow-500 dark:text-yellow-400 mt-2 font-medium">
          <span className="inline-block animate-pulse">✨</span> La colección estará disponible próximamente <span className="inline-block animate-pulse">✨</span>
        </p>
      )}
      
      {wallet.connected && isActive && itemsRemaining === 0 && (
        <p className="text-sm text-center text-muted-foreground mt-2">
          Todos los NFTs han sido minteados
        </p>
      )}
    </div>
  )
}
