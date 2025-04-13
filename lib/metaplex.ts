"use client"

// Importar desde nuestras implementaciones simuladas en lugar de las dependencias reales
import { 
  createUmi, 
  walletAdapterIdentity, 
  mplCandyMachine,
  Umi 
} from '@/lib/mocks/metaplex-mocks'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { SOLANA_RPC_ENDPOINT, SOLANA_NETWORK } from './candy-machine-config'

// Crear una instancia de Umi con la configuración de la aplicación
export function useUmi() {
  const wallet = useWallet()
  const [umi, setUmi] = useState<Umi | null>(null)

  useEffect(() => {
    // Crear una instancia de Umi con el endpoint configurado
    // Ahora nuestra implementación simulada de createUmi acepta un endpoint opcional
    const umi = createUmi(SOLANA_RPC_ENDPOINT)
      .use(mplCandyMachine())

    // Si hay una wallet conectada, usar su identidad
    if (wallet.publicKey) {
      // La función walletAdapterIdentity espera un objeto que implemente la interfaz WalletAdapter
      // El objeto wallet de useWallet() ya implementa esta interfaz
      umi.use(walletAdapterIdentity(wallet as any))
    }

    setUmi(umi)

    console.log(`Umi inicializado en la red ${SOLANA_NETWORK} con endpoint ${SOLANA_RPC_ENDPOINT}`)
  }, [wallet.publicKey])

  return umi
}

// Convertir una PublicKey de Solana a una PublicKey de Umi
export function solanaPublicKeyToUmi(publicKey: PublicKey) {
  return publicKey.toBase58()
}

// Convertir una string de PublicKey a una PublicKey de Solana
export function stringToSolanaPublicKey(publicKey: string) {
  return new PublicKey(publicKey)
}
