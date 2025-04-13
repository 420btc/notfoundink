"use client"

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, clusterApiUrl, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createSimpleTransaction, NFT_PRICE_SOL, NFT_PRICE_LAMPORTS, getRandomNFT } from '@/lib/simple-solana'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function SimpleMintButton() {
  const wallet = useWallet()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [txId, setTxId] = useState<string | null>(null)
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null)
  const [showInsufficientBalanceModal, setShowInsufficientBalanceModal] = useState(false)
  const [userBalance, setUserBalance] = useState<number>(0)

  const handleMint = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast({
        title: 'Wallet no conectada',
        description: 'Por favor conecta tu wallet para mintear un NFT',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    setMintSuccess(false)
    setTxId(null)
    setSelectedNFT(null)

    try {
      console.log('Iniciando proceso de mint con wallet:', wallet.publicKey.toString())
      
      // Crear conexión a Solana (devnet)
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
      
      // Verificar balance
      const balance = await connection.getBalance(wallet.publicKey)
      const balanceInSol = balance / LAMPORTS_PER_SOL
      setUserBalance(balanceInSol)
      console.log(`Balance actual: ${balanceInSol} SOL`)
      
      if (balance < NFT_PRICE_LAMPORTS) {
        // En lugar de lanzar un error, mostramos un modal
        setShowInsufficientBalanceModal(true)
        return // Detenemos la ejecución
      }
      
      // Crear transacción
      const transaction = await createSimpleTransaction(wallet.publicKey)
      
      // Obtener el blockhash reciente
      const { blockhash } = await connection.getLatestBlockhash('confirmed')
      transaction.recentBlockhash = blockhash
      transaction.feePayer = wallet.publicKey
      
      // Firmar la transacción
      console.log('Solicitando firma de la wallet...')
      const signedTransaction = await wallet.signTransaction(transaction)
      
      // Enviar la transacción
      console.log('Enviando transacción firmada...')
      const signature = await connection.sendRawTransaction(signedTransaction.serialize())
      
      // Confirmar la transacción
      console.log('Esperando confirmación de la transacción...')
      await connection.confirmTransaction(signature, 'confirmed')
      
      console.log('Transacción confirmada:', signature)
      
      // Seleccionar un NFT aleatorio
      const nft = getRandomNFT()
      setSelectedNFT(nft)
      setTxId(signature)
      setMintSuccess(true)
      
      toast({
        title: '¡NFT minteado con éxito!',
        description: `Has minteado un NFT por 0.20 SOL`,
      })
    } catch (error: any) {
      console.error('Error en el proceso de mint:', error)
      
      let errorMessage = 'Error desconocido'
      if (error.message) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error.code === 4001) {
        errorMessage = 'Transacción rechazada por el usuario'
      }
      
      toast({
        title: 'Error al mintear',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center bg-background/50 p-3 rounded-lg">
        <span className="text-sm font-medium">Precio</span>
        <span className="text-lg font-bold text-nfi-pink">0.20 SOL</span>
      </div>
      
      {/* Modal de balance insuficiente */}
      <Dialog open={showInsufficientBalanceModal} onOpenChange={setShowInsufficientBalanceModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Balance insuficiente
            </DialogTitle>
            <DialogDescription>
              No tienes suficiente SOL en tu wallet para completar esta transacción.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                Tu balance actual: <span className="font-bold">{userBalance.toFixed(5)} SOL</span>
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Balance requerido: <span className="font-bold">0.20 SOL</span> (0.0001 SOL para pruebas)
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Para mintear un NFT, necesitas tener al menos 0.20 SOL en tu wallet. 
              Para pruebas en devnet, solo necesitas 0.0001 SOL.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowInsufficientBalanceModal(false)}>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Button
        onClick={handleMint}
        disabled={!wallet.connected || loading}
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
            Mintear por 0.20 SOL
          </>
        )}
      </Button>
      
      {!wallet.connected && (
        <p className="text-sm text-center text-muted-foreground mt-2">
          Conecta tu wallet para mintear este NFT
        </p>
      )}
      
      {mintSuccess && txId && selectedNFT && (
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
              Transacción completada por 0.20 SOL
            </p>
          </div>
          <p className="text-xs text-muted-foreground break-all">
            TX ID: <a href={`https://explorer.solana.com/tx/${txId}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{txId}</a>
          </p>
        </div>
      )}
    </div>
  )
}
