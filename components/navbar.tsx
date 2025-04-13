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
  ]

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
              className={`text-lg font-medium transition-colors hover:text-nfi-blue ${
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
                className={`text-lg font-medium transition-colors hover:text-nfi-blue ${
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
