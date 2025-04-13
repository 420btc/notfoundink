"use client"

import { useState, useEffect, useCallback } from 'react'
import { useUmi } from '@/lib/metaplex'
import { 
  fetchCandyMachine, 
  mintV2, 
  safeFetchCandyGuard,
  CandyMachine,
  CandyGuard,
  publicKey, 
  sol, 
  some
} from '@/lib/mocks/metaplex-mocks'
import { useWallet } from '@solana/wallet-adapter-react'
import { useToast } from '@/hooks/use-toast'

export type CandyMachineState = {
  itemsAvailable: number
  itemsRedeemed: number
  itemsRemaining: number
  price: number
  isActive: boolean
  goLiveDate: Date | null
  isLoading: boolean
  error: string | null
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
    error: null
  })
  
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [txId, setTxId] = useState<string | null>(null)

  // Obtener el ID de la Candy Machine desde las variables de entorno
  const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID

  // Cargar los datos de la Candy Machine
  const fetchCandyMachineData = useCallback(async () => {
    if (!umi || !candyMachineId) return

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      // Obtener la Candy Machine
      const candyMachinePubkey = publicKey(candyMachineId)
      const fetchedCandyMachine = await fetchCandyMachine(umi, candyMachinePubkey)
      setCandyMachine(fetchedCandyMachine)
      
      // Obtener el Candy Guard si existe
      let guardData = null
      try {
        guardData = await safeFetchCandyGuard(umi, fetchedCandyMachine.mintAuthority)
        setCandyGuard(guardData)
      } catch (error) {
        console.log('No Candy Guard found or error fetching it:', error)
      }
      
      // Actualizar el estado
      const itemsAvailable = Number(fetchedCandyMachine.itemsAvailable)
      const itemsRedeemed = Number(fetchedCandyMachine.itemsRedeemed)
      const itemsRemaining = itemsAvailable - itemsRedeemed
      
      // Obtener el precio desde el Candy Guard si existe, o usar el precio por defecto
      let price = 0
      let isActive = false
      let goLiveDate: Date | null = null
      
      if (guardData) {
        // Buscar el guard de solPayment para obtener el precio
        const defaultGuards = guardData.guards.default
        if (defaultGuards?.solPayment) {
          price = Number(defaultGuards.solPayment.lamports) / 1_000_000_000 // Convertir lamports a SOL
        }
        
        // Buscar el guard de startDate para obtener la fecha de inicio
        if (defaultGuards?.startDate) {
          const startTimestamp = Number(defaultGuards.startDate.date)
          goLiveDate = new Date(startTimestamp * 1000) // Convertir a milisegundos
          isActive = Date.now() >= startTimestamp * 1000
        } else {
          // Si no hay guard de startDate, la Candy Machine está activa
          isActive = true
        }
      }
      
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
    } catch (error) {
      console.error('Error fetching candy machine data:', error)
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Error al cargar los datos de la Candy Machine' 
      }))
    }
  }, [umi, candyMachineId])

  // Mintear un NFT
  const mint = useCallback(async () => {
    if (!umi || !candyMachine || !wallet.publicKey) {
      toast({
        title: 'Error',
        description: 'Wallet no conectada o Candy Machine no disponible',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsMinting(true)
      setMintSuccess(false)
      setTxId(null)
      
      // Crear una nueva keypair para el NFT
      const nftMint = umi.eddsa.generateKeypair()
      
      // Crear la transacción de minteo
      let builder
      
      if (candyGuard) {
        // Si hay un Candy Guard, usar mintV2
        builder = await mintV2(umi, {
          candyMachine: publicKey(candyMachine.publicKey),
          candyGuard: publicKey(candyGuard.publicKey),
          nftMint,
          collectionMint: publicKey(candyMachine.collectionMint),
          collectionUpdateAuthority: publicKey(candyMachine.authority),
          mintArgs: {},
          group: some('default'), // Usar el grupo por defecto
        })
      } else {
        // Si no hay Candy Guard, mostrar error
        throw new Error('No se encontró un Candy Guard para esta Candy Machine')
      }
      
      // Enviar la transacción
      const { signature } = await builder.sendAndConfirm(umi, {
        confirm: { commitment: 'confirmed' },
      })
      
      // Actualizar el estado
      setTxId(signature)
      setMintSuccess(true)
      
      toast({
        title: '¡Éxito!',
        description: 'NFT minteado correctamente',
      })
      
      // Actualizar los datos de la Candy Machine
      fetchCandyMachineData()
    } catch (error) {
      console.error('Error minting NFT:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error desconocido al mintear',
        variant: 'destructive',
      })
    } finally {
      setIsMinting(false)
    }
  }, [umi, candyMachine, candyGuard, wallet.publicKey, fetchCandyMachineData, toast])

  // Cargar los datos de la Candy Machine cuando cambie la wallet o el ID de la Candy Machine
  useEffect(() => {
    if (umi && candyMachineId) {
      fetchCandyMachineData()
    }
  }, [umi, candyMachineId, fetchCandyMachineData])

  return {
    ...state,
    isMinting,
    mintSuccess,
    txId,
    mint,
    fetchCandyMachineData,
  }
}
