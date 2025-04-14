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
    if (!wallet) return "/images/solana-sol.png";
    const walletName = wallet.adapter.name.toLowerCase();
    if (walletName.includes("phantom")) {
      return "/images/phantom3506.jpg";
    } else if (walletName.includes("solflare")) {
      return "/images/6323b698c42eaa7561f81542_public.png";
    } else if (walletName.includes("brave")) {
      return "/images/brave-logo-dark.png";
    } else {
      return "/images/solana-sol.png";
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
            <div className="relative w-40 h-40 mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-nfi-yellow to-nfi-pink rounded-full animate-pulse-slow blur-md"></div>
              <div className="relative w-full h-full flex items-center justify-center bg-black rounded-full border-2 border-nfi-yellow overflow-hidden p-0">
                <Image 
                  src="/images/solana-sol.png" 
                  alt="Solana" 
                  fill 
                  className="object-cover" 
                />
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
            {installedWallets
              .filter(wallet => {
                const name = wallet.adapter.name.toLowerCase();
                return name.includes("phantom") || name.includes("solflare") || name.includes("brave");
              })
              .map((wallet) => {
                const name = wallet.adapter.name.toLowerCase();
                let walletIcon = "/images/solana-sol.png";
                let gradientColors = "from-nfi-yellow to-nfi-pink";
                if (name.includes("phantom")) {
                  walletIcon = "/images/phantom3506.jpg";
                  gradientColors = "from-[#AB9FF2] to-[#4C3EF7]";
                } else if (name.includes("solflare")) {
                  walletIcon = "/images/6323b698c42eaa7561f81542_public.png";
                  gradientColors = "from-[#FE8F1F] to-[#FE5F1F]";
                } else if (name.includes("brave")) {
                  walletIcon = "/images/brave-logo-dark.png";
                  gradientColors = "from-orange-400 to-orange-600";
                }
                return (
                  <div key={wallet.adapter.name} className="relative group transition-all duration-300 transform hover:scale-[1.02]">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColors} rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300`}></div>
                    <Button
                      variant="outline"
                      className="relative w-full h-auto py-5 flex items-center gap-5 border-none bg-white dark:bg-gray-900 rounded-lg shadow-sm"
                      onClick={() => handleWalletSelect(wallet.adapter.name)}
                    >
                      <div className="w-14 h-14 relative flex-shrink-0 ml-1">
                        <Image 
                          src={walletIcon}
                          alt={wallet.adapter.name} 
                          fill 
                          className="object-contain p-0.5" 
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-xl">{wallet.adapter.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Conectar ahora
                        </span>
                      </div>
                      <div className="ml-auto bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full mr-2">
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
              .filter(wallet => {
                const name = wallet.adapter.name.toLowerCase();
                return name.includes("phantom") || name.includes("solflare") || name.includes("brave");
              })
              .map((wallet) => {
                const name = wallet.adapter.name.toLowerCase();
                let walletIcon = "/images/solana-sol.png";
                let walletUrl = "https://solana.com/";
                let gradientColors = "from-nfi-yellow to-nfi-pink";
                if (name.includes("phantom")) {
                  walletIcon = "/images/phantom3506.jpg";
                  walletUrl = "https://phantom.app/";
                  gradientColors = "from-[#AB9FF2] to-[#4C3EF7]";
                } else if (name.includes("solflare")) {
                  walletIcon = "/images/6323b698c42eaa7561f81542_public.png";
                  walletUrl = "https://solflare.com/";
                  gradientColors = "from-[#FE8F1F] to-[#FE5F1F]";
                } else if (name.includes("brave")) {
                  walletIcon = "/images/brave-logo-dark.png";
                  walletUrl = "https://brave.com/wallet/";
                  gradientColors = "from-orange-400 to-orange-600";
                }
                return (
                  <div key={wallet.adapter.name} className="relative group transition-all duration-300 transform hover:scale-[1.02]">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColors} rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300`}></div>
                    <Button
                      variant="outline"
                      className="relative w-full h-auto py-5 flex items-center gap-5 border-none bg-white dark:bg-gray-900 rounded-lg shadow-sm"
                      onClick={() => handleExternalWalletClick(walletUrl)}
                    >
                      <div className="w-14 h-14 relative flex-shrink-0 ml-1">
                        <Image 
                          src={walletIcon}
                          alt={wallet.adapter.name} 
                          fill 
                          className="object-contain p-0.5" 
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-xl">{wallet.adapter.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          Visitar sitio web oficial
                        </span>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full mr-2">
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
                className="relative w-full h-auto py-5 flex items-center gap-5 border-none bg-white dark:bg-gray-900 rounded-lg shadow-sm"
                onClick={() => handleExternalWalletClick("https://phantom.app/")}
              >
                <div className="w-14 h-14 relative flex-shrink-0 ml-1">
                  <Image src="/images/phantom3506.jpg" alt="Phantom" fill className="object-contain p-0.5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-xl">Phantom</span>
                  <span className="text-xs text-muted-foreground">
                    La wallet más popular para Solana
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full mr-2">
                  <ExternalLink className="h-3 w-3" /> Instalar
                </div>
              </Button>
            </div>

            {/* Solflare */}
            <div className="relative group transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FE8F1F] to-[#FE5F1F] rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300"></div>
              <Button
                variant="outline"
                className="relative w-full h-auto py-5 flex items-center gap-5 border-none bg-white dark:bg-gray-900 rounded-lg shadow-sm"
                onClick={() => handleExternalWalletClick("https://solflare.com/")}
              >
                <div className="w-14 h-14 relative flex-shrink-0 ml-1">
                  <Image src="/images/6323b698c42eaa7561f81542_public.png" alt="Solflare" fill className="object-contain p-0.5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-xl">Solflare</span>
                  <span className="text-xs text-muted-foreground">
                    Wallet segura y fácil de usar
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full mr-2">
                  <ExternalLink className="h-3 w-3" /> Instalar
                </div>
              </Button>
            </div>
            {/* Brave */}
            <div className="relative group transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition duration-300"></div>
              <Button
                variant="outline"
                className="relative w-full h-auto py-5 flex items-center gap-5 border-none bg-white dark:bg-gray-900 rounded-lg shadow-sm"
                onClick={() => handleExternalWalletClick("https://brave.com/wallet/")}
              >
                <div className="w-14 h-14 relative flex-shrink-0 ml-1">
                  <Image src="/images/brave-logo-dark.png" alt="Brave" fill className="object-contain p-0.5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-xl">Brave</span>
                  <span className="text-xs text-muted-foreground">
                    Wallet integrada en el navegador Brave
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full mr-2">
                  <ExternalLink className="h-3 w-3" /> Instalar
                </div>
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-5 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-center text-muted-foreground">
            Al conectar tu wallet, aceptas los <span className="text-nfi-yellow hover:underline cursor-pointer">términos de servicio</span> y la <span className="text-nfi-pink hover:underline cursor-pointer">política de privacidad</span>.
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-full px-3 py-1">
              <div className="w-4 h-4 relative flex-shrink-0">
                <Image src="/images/solana-sol.png" alt="Solana" fill className="object-contain" />
              </div>
              <p className="text-xs font-medium text-yellow-800 dark:text-yellow-400">Conectado a Solana Mainnet</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
