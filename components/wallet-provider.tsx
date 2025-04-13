"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

type WalletType = "phantom" | "solflare" | null

type WalletContextType = {
  connected: boolean
  connecting: boolean
  publicKey: string | null
  walletType: WalletType
  connect: (type: WalletType) => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  connecting: false,
  publicKey: null,
  walletType: null,
  connect: async () => {},
  disconnect: () => {},
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [walletType, setWalletType] = useState<WalletType>(null)
  const { toast } = useToast()

  // Simulación de conexión a wallet
  const connect = async (type: WalletType) => {
    try {
      if (!type) return

      setConnecting(true)
      setWalletType(type)

      // Simulamos una conexión
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generamos una clave pública aleatoria para simular
      const mockPublicKey = Array.from(
        { length: 44 },
        () => "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[Math.floor(Math.random() * 58)],
      ).join("")

      setPublicKey(mockPublicKey)
      setConnected(true)

      toast({
        title: `${type === "phantom" ? "Phantom" : "Solflare"} conectada`,
        description: "Tu wallet ha sido conectada exitosamente.",
      })
    } catch (error) {
      toast({
        title: "Error al conectar",
        description: "No se pudo conectar a la wallet.",
        variant: "destructive",
      })
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    setConnected(false)
    setPublicKey(null)
    setWalletType(null)
    toast({
      title: "Wallet desconectada",
      description: "Tu wallet ha sido desconectada.",
    })
  }

  // Verificar si hay una conexión guardada al cargar
  useEffect(() => {
    const savedConnection = localStorage.getItem("walletConnected")
    const savedPublicKey = localStorage.getItem("walletPublicKey")
    const savedWalletType = localStorage.getItem("walletType") as WalletType

    if (savedConnection === "true" && savedPublicKey && savedWalletType) {
      setConnected(true)
      setPublicKey(savedPublicKey)
      setWalletType(savedWalletType)
    }
  }, [])

  // Guardar estado de conexión
  useEffect(() => {
    if (connected && publicKey && walletType) {
      localStorage.setItem("walletConnected", "true")
      localStorage.setItem("walletPublicKey", publicKey)
      localStorage.setItem("walletType", walletType)
    } else {
      localStorage.removeItem("walletConnected")
      localStorage.removeItem("walletPublicKey")
      localStorage.removeItem("walletType")
    }
  }, [connected, publicKey, walletType])

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        publicKey,
        walletType,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
