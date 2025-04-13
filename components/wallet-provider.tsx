"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

type WalletType = "phantom" | "solflare" | null

type WalletContextType = {
  connected: boolean
  connecting: boolean
  publicKey: string | null
  walletType: WalletType
  connect: (type: WalletType) => Promise<void>
  disconnect: () => void
  solanaConnection: Connection | null
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  connecting: false,
  publicKey: null,
  walletType: null,
  connect: async () => {},
  disconnect: () => {},
  solanaConnection: null,
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [walletType, setWalletType] = useState<WalletType>(null)
  const [phantomWallet, setPhantomWallet] = useState<PhantomWalletAdapter | null>(null)
  const [solflareWallet, setSolflareWallet] = useState<SolflareWalletAdapter | null>(null)
  const { toast } = useToast()

  // Crear la conexión a la red de Solana (mainnet-beta para producción)
  const solanaConnection = useMemo(() => {
    // Usamos un endpoint público de Alchemy para mainnet
    const endpoint = 'https://solana-mainnet.g.alchemy.com/v2/demo'
    return new Connection(endpoint, "confirmed")
  }, [])
  
  // Mostrar un mensaje claro sobre la red que estamos usando
  useEffect(() => {
    if (connected) {
      toast({
        title: 'Red Solana: MAINNET',
        description: 'Esta aplicación está conectada a la red principal de Solana. Las transacciones usarán SOL real.',
      })
    }
  }, [connected, toast])

  // Inicializar adaptadores de wallet
  useEffect(() => {
    // Inicializar adaptadores solo en el cliente
    if (typeof window !== "undefined") {
      const phantomAdapter = new PhantomWalletAdapter()
      const solflareAdapter = new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet })
      
      setPhantomWallet(phantomAdapter)
      setSolflareWallet(solflareAdapter)

      // Limpiar al desmontar
      return () => {
        if (phantomAdapter.connected) phantomAdapter.disconnect()
        if (solflareAdapter.connected) solflareAdapter.disconnect()
      }
    }
  }, [])

  // Conexión real a la wallet
  const connect = async (type: WalletType) => {
    try {
      if (!type) return

      setConnecting(true)
      setWalletType(type)
      
      // Mostrar mensaje sobre la red mainnet
      toast({
        title: 'Usando red MAINNET',
        description: 'Esta aplicación usa la red principal de Solana. Las transacciones usarán SOL real.',
      })

      const adapter = type === "phantom" ? phantomWallet : solflareWallet
      
      if (!adapter) {
        throw new Error(`Adaptador de ${type} no disponible`)
      }

      // Verificar si la wallet está instalada
      try {
        // En lugar de verificar .ready (que no existe en estos adaptadores),
        // intentamos conectar y manejamos cualquier error
        const walletUrl = type === "phantom" ? "https://phantom.app/" : "https://solflare.com/"
        
        // Intentar detectar si la wallet está instalada
        const isInstalled = type === "phantom" 
          ? window.hasOwnProperty('phantom')
          : window.hasOwnProperty('solflare')
          
        if (!isInstalled) {
          toast({
            title: `${type === "phantom" ? "Phantom" : "Solflare"} no detectada`,
            description: "Por favor instala la extensión o app y recarga la página.",
            variant: "destructive",
          })
          
          // Abrir la página de la wallet
          window.open(walletUrl, "_blank")
          setConnecting(false)
          return
        }
        
        // Asegurarnos de que el adaptador existe
        if (!adapter) {
          throw new Error(`Adaptador de ${type} no disponible`)
        }

        // Conectar a la wallet
        await adapter.connect()
        
        // Verificar si la conexión fue exitosa
        if (adapter.connected && adapter.publicKey) {
          setPublicKey(adapter.publicKey.toString())
          setConnected(true)
          
          toast({
            title: `${type === "phantom" ? "Phantom" : "Solflare"} conectada`,
            description: "Tu wallet ha sido conectada exitosamente.",
          })
        } else {
          throw new Error("La conexión falló")
        }
      } catch (error: any) {
        // Manejar errores de conexión
        console.error("Error al conectar wallet:", error)
        toast({
          title: "Error al conectar",
          description: error.message || "No se pudo conectar a la wallet",
          variant: "destructive",
        })
        setConnecting(false)
      }
    } catch (error: any) {
      console.error("Error al conectar wallet:", error)
      
      // Manejar diferentes tipos de errores
      if (error.name === "WalletNotReadyError") {
        toast({
          title: "Wallet no disponible",
          description: "Por favor instala la extensión o app y recarga la página.",
          variant: "destructive",
        })
      } else if (error.name === "WalletConnectionError") {
        toast({
          title: "Conexión rechazada",
          description: "Has rechazado la solicitud de conexión.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error al conectar",
          description: error.message || "No se pudo conectar a la wallet.",
          variant: "destructive",
        })
      }
      
      // Limpiar el estado en caso de error
      setWalletType(null)
    } finally {
      setConnecting(false)
    }
  }

  // Desconexión real de la wallet
  const disconnect = async () => {
    try {
      const adapter = walletType === "phantom" ? phantomWallet : solflareWallet
      
      if (adapter && adapter.connected) {
        await adapter.disconnect()
      }
      
      setConnected(false)
      setPublicKey(null)
      setWalletType(null)
      
      toast({
        title: "Wallet desconectada",
        description: "Tu wallet ha sido desconectada exitosamente.",
      })
    } catch (error) {
      console.error("Error al desconectar wallet:", error)
      toast({
        title: "Error al desconectar",
        description: "Ocurrió un error al desconectar la wallet.",
        variant: "destructive",
      })
    }
  }

  // Verificar estado de conexión al iniciar
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Verificar si hay una wallet conectada
        if (phantomWallet && phantomWallet.connected && phantomWallet.publicKey) {
          setConnected(true)
          setPublicKey(phantomWallet.publicKey.toString())
          setWalletType("phantom")
        } else if (solflareWallet && solflareWallet.connected && solflareWallet.publicKey) {
          setConnected(true)
          setPublicKey(solflareWallet.publicKey.toString())
          setWalletType("solflare")
        }
      } catch (error) {
        console.error("Error al verificar conexión de wallet:", error)
      }
    }

    if (phantomWallet || solflareWallet) {
      checkWalletConnection()
    }
  }, [phantomWallet, solflareWallet])

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        publicKey,
        walletType,
        connect,
        disconnect,
        solanaConnection,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
