"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Inicio" },
    { href: "/collection", label: "Colección" },
    { href: "/mint", label: "Mint" },
    { href: "/artist", label: "Artista" },
    { href: "/pedidos", label: "Pedidos" },
  ]

  // Sección visual de Obras Destacadas para el menú principal
  const featuredSection = (
    <div className="my-6">
      <section className="py-8 bg-gradient-to-b from-nfi-purple/10 to-background/80 rounded-xl shadow-md">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="relative">
              <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
              <h2 className="font-cartoon text-2xl md:text-3xl mb-4 md:mb-0 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue animate-shine px-2 pb-2 inline-block bg-[length:200%_100%] mr-1">
                  NFTs Destacados
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue"></div>
              </h2>
            </div>
            <Button asChild variant="outline" className="gap-2 border-nfi-pink text-nfi-pink hover:bg-nfi-pink/20">
              <Link href="/collection">
                Ver todos
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, image: "/images/trust-me.png", title: "Trust Me ✨" },
              { id: 11, image: "/images/skater-easy.png", title: "Hago que parezca fácil ✨" },
              { id: 3, image: "/images/shin-chan.png", title: "Corazón ✨" },
            ].map((nft) => (
              <Link
                href={`/nft/${nft.id}`}
                key={nft.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative bg-white/90 dark:bg-gray-900/90 rounded-lg overflow-hidden">
                    <div className="aspect-square relative overflow-hidden">
                      <img src={nft.image || "/placeholder.svg"} alt={nft.title} className="object-cover w-full h-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <p className="text-white font-cartoon text-lg">{nft.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-cartoon text-3xl tracking-wider text-nfi-yellow">
            Not Found <span className="text-nfi-pink">Ink</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-lg font-semibold transition-colors hover:text-nfi-blue ${
                pathname === route.href ? "text-nfi-pink" : "text-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
          <ConnectWallet />
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      {isOpen && (
        <div className="container md:hidden py-4">
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-lg font-semibold transition-colors hover:text-nfi-blue ${
                  pathname === route.href ? "text-nfi-pink" : "text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <ConnectWallet />
          </nav>
        </div>
      )}
    </header>
  )
}
