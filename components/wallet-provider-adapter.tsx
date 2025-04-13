"use client"

import { FC, ReactNode, useMemo } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { WalletModalProvider as CustomWalletModalProvider } from "@/hooks/use-wallet-modal"

// Importa los estilos por defecto
import "@solana/wallet-adapter-react-ui/styles.css"

interface WalletContextProviderProps {
  children: ReactNode
  network?: WalletAdapterNetwork
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ 
  children,
  network = WalletAdapterNetwork.Devnet 
}) => {
  // El endpoint de la red de Solana
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // Lista de wallets que queremos integrar
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <CustomWalletModalProvider>
            {children}
          </CustomWalletModalProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
