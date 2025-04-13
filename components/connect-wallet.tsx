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
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-nfi-yellow/30 dark:border-nfi-yellow/20 shadow-xl">
        <DialogHeader>
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
              <div className="absolute inset-0 bg-gradient-to-r from-nfi-yellow to-nfi-pink rounded-full animate-pulse-slow blur-md"></div>
              <div className="relative w-full h-full flex items-center justify-center bg-white dark:bg-gray-900 rounded-full border-2 border-nfi-yellow">
                <Image src="/images/solana-icon.png" alt="Solana" width={32} height={32} className="object-contain" />
              </div>
            </div>
            <DialogTitle className="font-cartoon text-3xl text-center mb-2 bg-gradient-to-r from-nfi-yellow to-nfi-pink bg-clip-text text-transparent">Conecta tu Wallet</DialogTitle>
            <DialogDescription className="text-center max-w-xs mx-auto">
              Selecciona una de las siguientes opciones para conectar tu wallet de Solana y comenzar a mintear NFTs.
            </DialogDescription>
          </div>
        </DialogHeader>
        
        {/* Wallets instaladas */}
        {installedWallets.length > 0 && (
          <div className="grid grid-cols-1 gap-4 py-4">
            {installedWallets.map((wallet) => {
              const isPhantom = wallet.adapter.name.toLowerCase().includes("phantom");
              const isSolflare = wallet.adapter.name.toLowerCase().includes("solflare");
              const walletIcon = isPhantom ? "/images/phantom-icon.png" : 
                                isSolflare ? "/images/solflare-icon.png" : 
                                "/images/solana-icon.png";
              const gradientColors = isPhantom ? "from-[#AB9FF2] to-[#4C3EF7]" : 
                                    isSolflare ? "from-[#FE8F1F] to-[#FE5F1F]" : 
                                    "from-nfi-yellow to-nfi-pink";
              
              return (
                <div key={wallet.adapter.name} className="relative group transition-all duration-300 transform hover:scale-[1.02]">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColors} rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300`}></div>
                  <Button
                    variant="outline"
                    className="relative w-full h-auto py-4 flex items-center gap-4 border-none bg-white dark:bg-gray-900 rounded-lg"
                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                  >
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image 
                        src={walletIcon}
                        alt={wallet.adapter.name} 
                        fill 
                        className="object-contain p-1" 
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-lg">{wallet.adapter.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Conectar ahora
                      </span>
                    </div>
                    <div className="ml-auto bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Instalado
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Wallets no instaladas */}
        {notInstalledWallets.length > 0 && (
          <div className="grid grid-cols-1 gap-4 py-4">
            {notInstalledWallets
              .filter(wallet => 
                wallet.adapter.name.toLowerCase().includes("phantom") || 
                wallet.adapter.name.toLowerCase().includes("solflare")
              )
              .map((wallet) => {
                const isPhantom = wallet.adapter.name.toLowerCase().includes("phantom");
                const walletIcon = isPhantom ? "/images/phantom-icon.png" : "/images/solflare-icon.png";
                const walletUrl = isPhantom ? "https://phantom.app/" : "https://solflare.com/";
                const gradientColors = isPhantom ? "from-[#AB9FF2] to-[#4C3EF7]" : "from-[#FE8F1F] to-[#FE5F1F]";
                
                return (
                  <div key={wallet.adapter.name} className="relative group transition-all duration-300 transform hover:scale-[1.02]">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColors} rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300`}></div>
                    <Button
                      variant="outline"
                      className="relative w-full h-auto py-4 flex items-center gap-4 border-none bg-white dark:bg-gray-900 rounded-lg"
                      onClick={() => handleExternalWalletClick(walletUrl)}
                    >
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image 
                          src={walletIcon}
                          alt={wallet.adapter.name} 
                          fill 
                          className="object-contain p-1" 
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-lg">{wallet.adapter.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          Visitar sitio web oficial
                        </span>
                      </div>
                      <div className="ml-auto flex items-center gap-1 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        <ExternalLink className="h-3 w-3" /> Instalar
                      </div>
                    </Button>
                  </div>
                );
              })}
          </div>
        )}
        
        {/* Si no hay wallets, mostrar opciones por defecto */}
        {installedWallets.length === 0 && notInstalledWallets.length === 0 && (
          <div className="grid grid-cols-1 gap-4 py-4">
            {/* Phantom */}
            <div className="relative group transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#AB9FF2] to-[#4C3EF7] rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300"></div>
              <Button
                variant="outline"
                className="relative w-full h-auto py-4 flex items-center gap-4 border-none bg-white dark:bg-gray-900 rounded-lg"
                onClick={() => handleExternalWalletClick("https://phantom.app/")}
              >
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src="/images/phantom-icon.png" alt="Phantom" fill className="object-contain p-1" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-lg">Phantom</span>
                  <span className="text-xs text-muted-foreground">
                    La wallet más popular para Solana
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  <ExternalLink className="h-3 w-3" /> Instalar
                </div>
              </Button>
            </div>

            {/* Solflare */}
            <div className="relative group transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FE8F1F] to-[#FE5F1F] rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300"></div>
              <Button
                variant="outline"
                className="relative w-full h-auto py-4 flex items-center gap-4 border-none bg-white dark:bg-gray-900 rounded-lg"
                onClick={() => handleExternalWalletClick("https://solflare.com/")}
              >
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src="/images/solflare-icon.png" alt="Solflare" fill className="object-contain p-1" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-lg">Solflare</span>
                  <span className="text-xs text-muted-foreground">
                    Wallet segura y fácil de usar
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  <ExternalLink className="h-3 w-3" /> Instalar
                </div>
              </Button>
            </div>
            
            {/* Backpack */}
            <div className="relative group transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFAA] to-[#00BBFF] rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300"></div>
              <Button
                variant="outline"
                className="relative w-full h-auto py-4 flex items-center gap-4 border-none bg-white dark:bg-gray-900 rounded-lg"
                onClick={() => handleExternalWalletClick("https://www.backpack.app/")}
              >
                <div className="w-12 h-12 relative flex-shrink-0 flex items-center justify-center">
                  <Image src="/images/solana-icon.png" alt="Backpack" width={40} height={40} className="object-contain" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-lg">Backpack</span>
                  <span className="text-xs text-muted-foreground">
                    Nueva wallet con funciones avanzadas
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  <ExternalLink className="h-3 w-3" /> Instalar
                </div>
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-2 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-center text-muted-foreground">
            Al conectar tu wallet, aceptas los <span className="text-nfi-yellow hover:underline cursor-pointer">términos de servicio</span> y la <span className="text-nfi-pink hover:underline cursor-pointer">política de privacidad</span>.
          </p>
          <div className="flex justify-center mt-3">
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-full px-3 py-1">
              <div className="w-4 h-4 relative flex-shrink-0">
                <Image src="/images/solana-icon.png" alt="Solana" fill className="object-contain" />
              </div>
              <p className="text-xs font-medium text-yellow-800 dark:text-yellow-400">Conectado a Solana Mainnet</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
