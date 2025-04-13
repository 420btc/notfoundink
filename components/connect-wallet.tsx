"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletReadyState, WalletName } from "@solana/wallet-adapter-base"
import { Loader2, Wallet, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWalletModal } from "@/hooks/use-wallet-modal"
import Image from "next/image"

export function ConnectWallet() {
  const { connected, connecting, publicKey, wallet, wallets, select, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [isOpen, setIsOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [installedWallets, setInstalledWallets] = useState<any[]>([])
  const [notInstalledWallets, setNotInstalledWallets] = useState<any[]>([])

  // Obtener las wallets disponibles
  useEffect(() => {
    // Separar las wallets instaladas de las que necesitan instalación
    const installed = wallets.filter(
      (wallet) => wallet.readyState === WalletReadyState.Installed
    )
    
    const notInstalled = wallets.filter(
      (wallet) => wallet.readyState !== WalletReadyState.Installed
    )
    
    setInstalledWallets(installed)
    setNotInstalledWallets(notInstalled)
  }, [wallets])

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const handleWalletSelect = (walletName: WalletName) => {
    // Seleccionar la wallet y mostrar el modal de conexión
    select(walletName)
    setVisible(true)
    setIsDialogOpen(false)
  }

  const handleExternalWalletClick = (url: string) => {
    // Abrir la URL en una nueva pestaña
    window.open(url, "_blank")
    setIsDialogOpen(false)
  }

  // Obtener el icono de la wallet conectada
  const getWalletIcon = () => {
    if (!wallet) return "/images/solana-icon.png"
    
    const walletName = wallet.adapter.name.toLowerCase()
    if (walletName.includes("phantom")) {
      return "/images/phantom-icon.png"
    } else if (walletName.includes("solflare")) {
      return "/images/solflare-icon.png"
    } else {
      return "/images/solana-icon.png"
    }
  }

  if (connected && publicKey) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 border-nfi-pink hover:bg-nfi-pink/10 hover:text-nfi-pink transition-all duration-300"
          >
            <Image 
              src={getWalletIcon()} 
              alt={wallet?.adapter.name || "Wallet"} 
              width={16} 
              height={16} 
            />
            {truncateAddress(publicKey.toString())}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(publicKey.toString())
              setIsOpen(false)
            }}
          >
            Copiar dirección
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              disconnect()
              setIsOpen(false)
            }}
          >
            Desconectar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
          disabled={connecting}
          className="gap-2 bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500"
        >
          {connecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Conectando...
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4" />
              Conectar Wallet
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-cartoon text-2xl text-center mb-2">Conecta tu Wallet</DialogTitle>
          <DialogDescription className="text-center">
            Selecciona una de las siguientes opciones para conectar tu wallet de Solana.
          </DialogDescription>
        </DialogHeader>
        
        {/* Wallets instaladas */}
        {installedWallets.length > 0 && (
          <div className="grid grid-cols-2 gap-4 py-4">
            {installedWallets.map((wallet) => (
              <div key={wallet.adapter.name} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Button
                  variant="outline"
                  className="relative w-full h-auto py-6 flex flex-col items-center gap-2 border-none bg-white/90 dark:bg-gray-900/90"
                  onClick={() => handleWalletSelect(wallet.adapter.name)}
                >
                  <div className="w-12 h-12 relative">
                    <Image 
                      src={wallet.adapter.name.toLowerCase().includes("phantom") 
                        ? "/images/phantom-icon.png" 
                        : wallet.adapter.name.toLowerCase().includes("solflare")
                          ? "/images/solflare-icon.png"
                          : "/images/solana-icon.png"} 
                      alt={wallet.adapter.name} 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <span className="font-medium">{wallet.adapter.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    Conectar
                  </span>
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {/* Wallets no instaladas */}
        {notInstalledWallets.length > 0 && (
          <div className="grid grid-cols-2 gap-4 py-4">
            {notInstalledWallets
              .filter(wallet => 
                wallet.adapter.name.toLowerCase().includes("phantom") || 
                wallet.adapter.name.toLowerCase().includes("solflare")
              )
              .map((wallet) => (
                <div key={wallet.adapter.name} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <Button
                    variant="outline"
                    className="relative w-full h-auto py-6 flex flex-col items-center gap-2 border-none bg-white/90 dark:bg-gray-900/90"
                    onClick={() => handleExternalWalletClick(
                      wallet.adapter.name.toLowerCase().includes("phantom")
                        ? "https://phantom.app/"
                        : "https://solflare.com/"
                    )}
                  >
                    <div className="w-12 h-12 relative">
                      <Image 
                        src={wallet.adapter.name.toLowerCase().includes("phantom") 
                          ? "/images/phantom-icon.png" 
                          : "/images/solflare-icon.png"} 
                        alt={wallet.adapter.name} 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    <span className="font-medium">{wallet.adapter.name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" /> Instalar
                    </span>
                  </Button>
                </div>
            ))}
          </div>
        )}
        
        {/* Si no hay wallets, mostrar opciones por defecto */}
        {installedWallets.length === 0 && notInstalledWallets.length === 0 && (
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Button
                variant="outline"
                className="relative w-full h-auto py-6 flex flex-col items-center gap-2 border-none bg-white/90 dark:bg-gray-900/90"
                onClick={() => handleExternalWalletClick("https://phantom.app/")}
              >
                <div className="w-12 h-12 relative">
                  <Image src="/images/phantom-icon.png" alt="Phantom" fill className="object-contain" />
                </div>
                <span className="font-medium">Phantom</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> Instalar
                </span>
              </Button>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Button
                variant="outline"
                className="relative w-full h-auto py-6 flex flex-col items-center gap-2 border-none bg-white/90 dark:bg-gray-900/90"
                onClick={() => handleExternalWalletClick("https://solflare.com/")}
              >
                <div className="w-12 h-12 relative">
                  <Image src="/images/solflare-icon.png" alt="Solflare" fill className="object-contain" />
                </div>
                <span className="font-medium">Solflare</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> Instalar
                </span>
              </Button>
            </div>
          </div>
        )}
        
        <p className="text-xs text-center text-muted-foreground">
          Al conectar tu wallet, aceptas los términos de servicio y la política de privacidad.
        </p>
      </DialogContent>
    </Dialog>
  )
}
