"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
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
import Image from "next/image"

export function ConnectWallet() {
  const { connected, connecting, publicKey, walletType, connect, disconnect } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const handleExternalWalletClick = (type: "phantom" | "solflare") => {
    // Abrir la URL en una nueva pestaña
    const url = type === "phantom" ? "https://phantom.app/" : "https://solflare.com/"

    window.open(url, "_blank")

    // Simular que el usuario volvió y se conectó
    setTimeout(() => {
      connect(type)
      setIsDialogOpen(false)
    }, 1500)
  }

  if (connected && publicKey) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 border-nfi-pink hover:bg-nfi-pink/10 hover:text-nfi-pink transition-all duration-300"
          >
            {walletType === "phantom" ? (
              <Image src="/images/phantom-icon.png" alt="Phantom" width={16} height={16} />
            ) : (
              <Image src="/images/solflare-icon.png" alt="Solflare" width={16} height={16} />
            )}
            {truncateAddress(publicKey)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(publicKey)
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
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Button
              variant="outline"
              className="relative w-full h-auto py-6 flex flex-col items-center gap-2 border-none bg-white/90 dark:bg-gray-900/90"
              onClick={() => handleExternalWalletClick("phantom")}
            >
              <div className="w-12 h-12 relative">
                <Image src="/images/phantom-icon.png" alt="Phantom" fill className="object-contain" />
              </div>
              <span className="font-medium">Phantom</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <ExternalLink className="h-3 w-3" /> Abrir app
              </span>
            </Button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Button
              variant="outline"
              className="relative w-full h-auto py-6 flex flex-col items-center gap-2 border-none bg-white/90 dark:bg-gray-900/90"
              onClick={() => handleExternalWalletClick("solflare")}
            >
              <div className="w-12 h-12 relative">
                <Image src="/images/solflare-icon.png" alt="Solflare" fill className="object-contain" />
              </div>
              <span className="font-medium">Solflare</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <ExternalLink className="h-3 w-3" /> Abrir app
              </span>
            </Button>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Al conectar tu wallet, aceptas los términos de servicio y la política de privacidad.
        </p>
      </DialogContent>
    </Dialog>
  )
}
