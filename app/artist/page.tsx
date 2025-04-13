import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Instagram, ExternalLink } from "lucide-react"

export default function ArtistPage() {
  return (
    <div className="container py-10 bg-gradient-to-b from-nfi-purple/5 to-background">
      <div className="relative mb-6">
        <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
        <h1 className="font-cartoon text-4xl md:text-5xl">La Artista</h1>
      </div>

      {/* Sticker de encendedor rosa */}
      <div className="absolute top-24 right-8 md:right-16 w-16 md:w-20 h-auto transform rotate-12 z-10 animate-float-medium">
        <Image
          src="/images/pink-lighter.jpeg"
          alt="Sticker encendedor"
          width={100}
          height={200}
          className="drop-shadow-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-16 relative">
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-nfi-yellow/10 to-nfi-pink/10 rounded-xl"></div>
        <div className="absolute -z-10 inset-0 bg-cartoon-pattern opacity-10"></div>
        <div className="order-2 md:order-1 p-6">
          <h2 className="font-cartoon text-3xl mb-4">
            Ana María <span className="text-sm">✨</span>
          </h2>
          <p className="text-lg mb-4">
            Ana María es una ilustradora con un estilo único que mezcla la estética de Los Simpson, Futurama y Shin Chan
            con elementos de la cultura japonesa, creando piezas que son a la vez nostálgicas y contemporáneas.
          </p>
          <p className="text-lg mb-6">
            Su trabajo se caracteriza por líneas limpias, mensajes profundos y un sentido del humor que conecta con
            audiencias de todas las edades. "Not Found Ink" es su primera colección de NFTs, donde plasma su visión
            artística en 100 piezas únicas.
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline" size="icon">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href="https://www.instagram.com/notfoundink/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href="https://www.instagram.com/notfoundink/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Portfolio
              </Link>
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center p-6">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-nfi-pink animate-float">
            <div className="absolute inset-0 shine-effect"></div>
            <Image src="/images/mabel-pines.jpeg" alt="Ana María" fill className="object-cover" />
            <span className="absolute top-4 right-4 text-2xl animate-float-fast">✨</span>
          </div>
        </div>
      </div>

      <div className="relative text-center mb-6">
        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-2xl animate-float-medium">✨</span>
        <h2 className="font-cartoon text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
          Inspiración
        </h2>
      </div>

      {/* Sticker de encendedor y bolígrafo */}
      <div className="absolute top-[32rem] right-10 md:right-20 w-20 md:w-24 h-auto transform rotate-6 z-10 animate-float-medium">
        <Image
          src="/images/lighter-pen.jpeg"
          alt="Sticker encendedor y bolígrafo"
          width={120}
          height={150}
          className="drop-shadow-lg"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-16">
        {[
          {
            title: "Los Simpson",
            description:
              "La icónica serie animada creada por Matt Groening ha sido una gran influencia en el estilo de Ana María, especialmente en la forma de los personajes y el uso del color.",
            image: "/images/bart-smoking.jpeg",
          },
          {
            title: "Futurama ✨",
            description:
              "Otra creación de Matt Groening que ha influido en el trabajo de Ana María, aportando elementos futuristas y un sentido del humor más adulto a sus ilustraciones.",
            image: "/images/bender-sketch.jpeg",
          },
          {
            title: "Shin Chan",
            description:
              "El popular anime japonés aporta irreverencia y un toque de cultura japonesa a las ilustraciones de Ana María, creando una fusión única de estilos occidentales y orientales.",
            image: "/images/shin-chan-heart.jpeg",
          },
        ].map((item, index) => (
          <div key={index} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={`Inspiración ${item.title}`}
                    fill
                    className="object-contain bg-white"
                  />
                  {index === 1 && <span className="absolute top-2 right-2 text-xl animate-float-fast">✨</span>}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Sticker de lata Slurm */}
      <div className="absolute bottom-[32rem] left-6 md:left-12 w-20 md:w-24 h-auto transform -rotate-12 z-10 animate-float-slow">
        <Image
          src="/images/slurm-can.jpeg"
          alt="Sticker lata Slurm"
          width={120}
          height={150}
          className="drop-shadow-lg"
        />
      </div>

      <section className="py-16 bg-gradient-to-b from-background/80 to-nfi-purple/10 relative overflow-hidden mb-16 rounded-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nfi-purple/10 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="relative text-center mb-10">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-float-medium">
              ✨
            </span>
            <h2 className="font-cartoon text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
              Galería de Arte
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:grid-cols-4">
            {[
              { src: "/images/trust-me.png", title: "Trust Me ✨" },
              { src: "/images/mom-says.png", title: "But Mom Says" },
              { src: "/images/bart-history.png", title: "Historia" },
              { src: "/images/butterflies.png", title: "Mariposas ✨" },
              { src: "/images/shin-chan.png", title: "Corazón" },
              { src: "/images/homer-computer.png", title: "Empieza Ahora ✨" },
              { src: "/images/skull.png", title: "Skull" },
              { src: "/images/lisa-tv.png", title: "TV Off" },
            ].map((item, index) => (
              <div key={index} className="relative group transform transition-all duration-300 hover:scale-105">
                <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative bg-white/90 dark:bg-gray-900/90 rounded-lg overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <Image src={item.src || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-cartoon text-lg">{item.title}</p>
                    </div>
                    {(index === 0 || index === 3 || index === 5 || index === 7) && (
                      <span className="absolute top-2 right-2 text-lg animate-float-fast">✨</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center py-16 bg-gradient-to-b from-background to-nfi-purple/10 relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nfi-purple/10 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="relative mb-6">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-float-slow">✨</span>
            <h2 className="font-cartoon text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
              Descubre la Colección
            </h2>
          </div>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Explora las 100 piezas únicas creadas por Ana María y encuentra la que mejor conecte contigo. Cada NFT
            cuenta una historia diferente.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Button
                asChild
                size="lg"
                className="relative px-8 py-6 text-lg bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500"
              >
                <Link href="/collection">
                  Ver Colección <span className="ml-1">✨</span>
                </Link>
              </Button>
            </div>
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="relative px-8 py-6 text-lg border-nfi-pink text-nfi-pink hover:bg-nfi-pink/20"
              >
                <Link href="/mint">Mint NFT</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
