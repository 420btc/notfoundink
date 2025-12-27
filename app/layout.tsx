import type React from "react"
import type { Metadata } from "next"
import { Inter, Bangers } from "next/font/google"
import Image from "next/image"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FooterLogo } from "@/components/footer-logo"
import { IntroScreen } from "@/components/intro-screen"
import InactivityModal from "@/components/InactivityModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" })

export const metadata: Metadata = {
  title: "Not Found Ink | Arte por Ana María",
  description: "Colección de obras únicas con estilo Simpson-Futurama-Shin Chan con toques japoneses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="64x64" />
      </head>
      <body className={`${inter.variable} ${bangers.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light" disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            
            {/* Componente FooterLogo que solo se muestra en la página principal */}
            <FooterLogo />
            
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <InactivityModal />
      </body>
    </html>
  )
}

