import Link from "next/link"
import { Twitter, Instagram, Github } from "lucide-react"

export function Footer() {
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
        <div className="flex items-center gap-4">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-nfi-blue transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://www.instagram.com/notfoundink/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-nfi-pink transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
