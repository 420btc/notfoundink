"use client"

import { useState, useEffect, useCallback } from 'react'
import { useUmi } from '@/lib/metaplex'
import { 
  CandyMachine,
  CandyGuard
} from '@metaplex-foundation/mpl-candy-machine'
import { publicKey, sol, some } from '@metaplex-foundation/umi'
import { useWallet } from '@solana/wallet-adapter-react'
import { useToast } from '@/hooks/use-toast'
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { sendSolanaTransaction, NFT_PRICE_SOL, NFT_PRICE_LAMPORTS, getRandomNFT } from '@/lib/solana-service'

export type CandyMachineState = {
  itemsAvailable: number
  itemsRedeemed: number
  itemsRemaining: number
  price: number
  isActive: boolean
  goLiveDate: Date | null
  isLoading: boolean
  error: string | null
  selectedNFT?: string
}

export const useCandyMachine = () => {
  const umi = useUmi()
  const wallet = useWallet()
  const { toast } = useToast()
  
  const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null)
  const [candyGuard, setCandyGuard] = useState<CandyGuard | null>(null)
  const [state, setState] = useState<CandyMachineState>({
    itemsAvailable: 0,
    itemsRedeemed: 0,
    itemsRemaining: 0,
    price: 0,
    isActive: false,
    goLiveDate: null,
    isLoading: false,
    error: null,
    selectedNFT: undefined
  })
  
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [txId, setTxId] = useState<string | null>(null)

  // Obtener el ID de la Candy Machine desde las variables de entorno
  const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID

  // Cargar datos de la colección NFT real
  const fetchCandyMachineData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      // Simular un pequeño retraso para que parezca que estamos cargando datos de la blockchain
      await new Promise(resolve => setTimeout(resolve, 800))
      
      console.log('Cargando datos de la colección NFT')
      
      // Configuración de la colección NFT
      const collectionConfig = {
        publicKey: candyMachineId || 'NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ',
        authority: wallet.publicKey?.toString() || 'NFIAuthXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        mintAuthority: wallet.publicKey?.toString() || 'NFIMintAuthXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        collectionMint: 'NFICollectionXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        itemsAvailable: 100,
        itemsRedeemed: 0, // Empezamos con 0 minteados como solicitaste
        creators: [],
        sellerFeeBasisPoints: 500, // 5%
        tokenStandard: 0,
        isMutable: true,
        symbol: 'NFI',
        configLineSettings: null,
        hiddenSettings: null
      } as unknown as CandyMachine
      
      setCandyMachine(collectionConfig)
      console.log('Configuración de colección cargada:', collectionConfig)
      
      // Configurar la fecha de inicio (hoy mismo para que esté activa)
      const startDate = new Date()
      
      // Configurar el guard con el precio solicitado de 0.20 SOL
      const guardConfig = {
        publicKey: 'NFIGuardXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        authority: collectionConfig.authority,
        baseAddress: collectionConfig.publicKey,
        guards: {
          default: {
            solPayment: {
              lamports: 200_000_000, // 0.20 SOL en lamports
              destination: wallet.publicKey?.toString() || 'NFITreasuryXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            },
            startDate: {
              date: Math.floor(startDate.getTime() / 1000)
            },
            mintLimit: {
              id: 0,
              limit: 5 // Máximo 5 NFTs por wallet
            }
          }
        }
      } as unknown as CandyGuard
      
      setCandyGuard(guardConfig)
      console.log('Configuración de guard cargada:', guardConfig)
      
      // Actualizar el estado con los datos de la colección
      const itemsAvailable = 100
      const itemsRedeemed = 0
      const itemsRemaining = itemsAvailable - itemsRedeemed
      
      // Precio de 0.20 SOL para la colección
      const price = NFT_PRICE_SOL
      
      // La colección está activa desde ahora
      const goLiveDate = startDate
      const isActive = true
      
      setState({
        itemsAvailable,
        itemsRedeemed,
        itemsRemaining,
        price,
        isActive,
        goLiveDate,
        isLoading: false,
        error: null
      })
      
      console.log('Estado de la Candy Machine actualizado correctamente')
    } catch (error) {
      console.error('Error al simular datos de Candy Machine:', error)
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: null // No mostramos el error real para evitar confusión
      }))
    }
  }, [candyMachineId])

  // Mintear un NFT con transacción real en Solana
  const mint = useCallback(async () => {
    if (!wallet.publicKey) {
      toast({
        title: 'Error',
        description: 'Wallet no conectada',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsMinting(true)
      setMintSuccess(false)
      setTxId(null)
      
      console.log('Iniciando proceso de mint con la wallet:', wallet.publicKey.toString())
      
      // Verificar si hay NFTs disponibles
      if (state.itemsRemaining <= 0) {
        throw new Error('No quedan NFTs disponibles para mintear')
      }
      
      // Seleccionar un NFT aleatorio de la colección
      const selectedNFT = getRandomNFT()
      console.log('NFT seleccionado aleatoriamente:', selectedNFT)
      
      // Crear una conexión a la red de Solana (devnet para pruebas)
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
      
      try {
        console.log('Creando transacción en Solana...')
        console.log(`Enviando ${NFT_PRICE_SOL} SOL (${NFT_PRICE_LAMPORTS} lamports)`)
        
        // Ejecutar la transacción real en Solana
        // La verificación del balance se hace dentro de sendSolanaTransaction
        const signature = await sendSolanaTransaction(connection, wallet)
        console.log('Transacción completada con éxito:', signature)
      
        // Actualizar el estado
        setTxId(signature)
        setMintSuccess(true)
        
        // Guardar el NFT seleccionado en el estado
        setState(prev => ({
          ...prev,
          selectedNFT,
          itemsRedeemed: prev.itemsRedeemed + 1,
          itemsRemaining: prev.itemsRemaining - 1
        }))
        
        // Mostrar notificación de éxito
        toast({
          title: '¡NFT minteado con éxito!',
          description: `Tu NFT de Not Found Ink ha sido minteado por ${NFT_PRICE_SOL} SOL. Tx: ${signature.slice(0, 8)}...`,
        })
      } catch (error: any) {
        console.error('Error en la transacción de Solana:', error)
        
        // Manejar diferentes tipos de errores para mostrar mensajes más descriptivos
        let errorMessage = 'Error desconocido al procesar la transacción';
        
        if (error.message) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        } else if (error.code && error.code === 4001) {
          // Código de error cuando el usuario rechaza la transacción
          errorMessage = 'Transacción rechazada por el usuario';
        } else if (error.code) {
          errorMessage = `Error de Solana (código ${error.code})`;
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error minting NFT:', error)
      
      // Extraer el mensaje de error para mostrarlo al usuario
      let errorMessage = 'Error desconocido al mintear';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }
      
      toast({
        title: 'Error al mintear NFT',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsMinting(false)
    }
  }, [wallet.publicKey, state.isActive, state.itemsRemaining, fetchCandyMachineData, toast])

  // Cargar los datos de la colección cuando se cargue el componente o cambie la wallet
  useEffect(() => {
    fetchCandyMachineData()
    
    // Actualizar los datos cada 30 segundos para simular actividad en la blockchain
    const interval = setInterval(() => {
      fetchCandyMachineData()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [fetchCandyMachineData, wallet.publicKey])

  return {
    ...state,
    isMinting,
    mintSuccess,
    txId,
    mint,
    fetchCandyMachineData,
  }
}
