import type React from "react"
import type { Metadata } from "next"
import { Inter, Bangers } from "next/font/google"
import Image from "next/image"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WalletContextProvider } from "@/components/wallet-provider-adapter"
import { WalletModalProvider } from "@/hooks/use-wallet-modal"
import { IntroScreen } from "@/components/intro-screen"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" })

export const metadata: Metadata = {
  title: "Not Found Ink | NFT Collection by Ana María",
  description: "Colección de 100 NFTs únicos con estilo Simpson-Futurama-Shin Chan con toques japoneses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${bangers.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <WalletContextProvider>
            <WalletModalProvider>
              <div className="flex min-h-screen flex-col">
                <IntroScreen />
                <Navbar />
                <main className="flex-1">{children}</main>
                
                {/* Banner con logo y línea divisoria */}
                <div className="relative py-8">
                  {/* Línea divisoria morada */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue"></div>
                  
                  {/* Logo centrado sobre la línea */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                    <Image
                      src="/images/notfoundink.png"
                      alt="Not Found Ink Logo"
                      width={200}
                      height={100}
                      className="mb-1" /* Ajusta el margen para que encaje perfectamente con la línea */
                    />
                  </div>
                </div>
                
                <Footer />
              </div>
            </WalletModalProvider>
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

