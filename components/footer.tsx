"use client";
import Link from "next/link"
import { Instagram, Github } from "lucide-react"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname();
  const showPoscass = pathname === "/" || pathname === "/pedidos";
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-cartoon text-2xl tracking-wider">
              <span 
                style={{
                  color: '#FFD93D',
                  textShadow: `
                    1px 1px 0 #E91E63,
                    2px 2px 0 #E91E63,
                    3px 3px 0 #C2185B,
                    4px 4px 0 #AD1457,
                    5px 5px 8px rgba(0,0,0,0.4)
                  `
                }}
              >Not Found</span>{" "}<span 
                style={{
                  color: '#E91E63',
                  textShadow: `
                    1px 1px 0 #FFD93D,
                    2px 2px 0 #FFD93D,
                    3px 3px 0 #FFC107,
                    4px 4px 0 #FF9800,
                    5px 5px 8px rgba(0,0,0,0.4)
                  `
                }}
              >Ink</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">© 2025 Ana María. Todos los derechos reservados.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/notfoundink/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-nfi-yellow to-nfi-pink text-white hover:from-nfi-pink hover:to-nfi-yellow transition-all rounded-md h-10 w-10 flex items-center justify-center shadow-md"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="/portfolio"
              className="bg-gradient-to-r from-nfi-yellow to-nfi-pink text-white hover:from-nfi-pink hover:to-nfi-yellow transition-all rounded-md h-10 w-28 flex items-center justify-center shadow-md font-bold text-sm"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
