"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface WalletModalContextProps {
  visible: boolean
  setVisible: (open: boolean) => void
}

const WalletModalContext = createContext<WalletModalContextProps>({
  visible: false,
  setVisible: () => {},
})

export function WalletModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)

  return (
    <WalletModalContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
    </WalletModalContext.Provider>
  )
}

export const useWalletModal = () => useContext(WalletModalContext)
