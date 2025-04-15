"use client";
import Link from "next/link"
import { Twitter, Instagram, Github } from "lucide-react"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname();
  const showPoscass = pathname === "/pedidos";
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-cartoon text-2xl tracking-wider text-nfi-yellow">
              Not Found <span className="text-nfi-pink">Ink</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">© 2025 Ana María. Todos los derechos reservados.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {showPoscass && (
  <div className="w-full flex justify-center md:justify-center my-6 md:my-0 gap-4 mx-auto">
    <div className="relative w-56 h-32 md:w-72 md:h-40 bg-white rounded-lg overflow-hidden border border-nfi-pink/10 shadow aspect-[9/5] flex items-center justify-center">
      <img
        src="/images/fujifilm2.png"
        alt="Fujifilm"
        className="object-contain w-full h-full"
        style={{ display: 'block' }}
        loading="lazy"
      />
    </div>
    <div className="relative w-56 h-32 md:w-72 md:h-40 bg-white rounded-lg overflow-hidden border border-nfi-pink/10 shadow aspect-[9/5] flex items-center justify-center">
      <img
        src="/images/poscass.JPG"
        alt="Poscass"
        className="object-contain w-full h-full"
        style={{ display: 'block' }}
        loading="lazy"
      />
    </div>
  </div>
)}
          <div className="flex items-center gap-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1DA1F2] text-white hover:bg-[#1A8CD8] transition-all rounded-md h-10 w-10 flex items-center justify-center shadow-md"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
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
