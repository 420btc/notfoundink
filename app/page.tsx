import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import { Carousel } from "@/components/carousel"

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-nfi-purple/5 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container-fluid p-0 relative z-10">
          {/* Imagen de collage como fondo */}
          <div className="relative w-full">
            <Image
              src="/images/nfi-collage.png"
              alt="Not Found Ink Collage"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />

            {/* Título superpuesto sobre la imagen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-black/40 backdrop-blur-sm px-10 py-6 rounded-xl w-auto">
                <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
                <span className="absolute -top-4 -right-8 text-3xl animate-float-medium">✨</span>
                <h1 className="font-cartoon text-5xl md:text-7xl lg:text-8xl tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  <span className="text-nfi-yellow font-bold">Not Found</span>{" "}
                  <span className="text-nfi-pink font-bold">Ink</span>
                </h1>
                <span className="absolute bottom-2 right-0 text-xl animate-float-fast">✨</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6">
            <div className="text-xl md:text-2xl max-w-2xl mx-auto text-center mb-8">
              <p className="mb-3">
                Una <span className="text-nfi-yellow">serie</span> de 100 NFTs exclusivos con el distintivo estilo de Ana María, combinando <a href="https://www.instagram.com/thesimpsons/?hl=es" target="_blank" rel="noopener noreferrer" className="text-nfi-pink hover:underline">Los Simpson</a>, <a href="https://www.instagram.com/futuramaonhulu/?hl=es" target="_blank" rel="noopener noreferrer" className="text-nfi-blue hover:underline">Futurama</a> y <a href="https://www.instagram.com/shinchan_es_oficial/?hl=es" target="_blank" rel="noopener noreferrer" className="text-nfi-purple hover:underline">Shin Chan</a> ✨
              </p>
              <p className="text-nfi-pink font-semibold mb-3">
                Repartiendo arte porque esa es mi cualidad ❤‍🔥
              </p>
            </div>

            <div className="flex flex-col items-center mt-12 mb-16">
              <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl">
                <div className="relative group transform transition-transform hover:scale-105">
                  <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <Button
                    asChild
                    size="lg"
                    className="relative font-medium text-lg px-8 py-6 bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500 shadow-md"
                  >
                    <Link href="/collection">Ver Colección</Link>
                  </Button>
                </div>

                <div className="relative group transform transition-transform hover:scale-105">
                  <div className="absolute -inset-1 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <Button
                    asChild
                    size="lg"
                    className="relative font-medium text-lg px-8 py-6 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink hover:from-nfi-pink hover:via-nfi-purple hover:to-nfi-blue transition-all duration-500 shadow-lg shadow-nfi-pink/20"
                  >
                    <Link href="/mint" className="flex items-center gap-2">
                      Mint NFT
                      <span className="relative w-5 h-5">
                        <span className="absolute inset-0 animate-ping opacity-75 text-xs">✨</span>
                        <span className="relative text-xs">✨</span>
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured NFTs - Destacados */}
      <section className="py-20 bg-gradient-to-b from-nfi-purple/10 to-background/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nfi-purple/10 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="relative">
              <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
              <h2 className="font-cartoon text-4xl md:text-6xl mb-4 md:mb-0 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue animate-shine px-2 pb-2 inline-block bg-[length:200%_100%] mr-1">
                  NFTs Destacados
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue"></div>
              </h2>
            </div>
            <Button asChild variant="outline" className="gap-2 border-nfi-pink text-nfi-pink hover:bg-nfi-pink/20">
              <Link href="/collection">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <Image src={nft.image || "/placeholder.svg"} alt={nft.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <p className="text-white font-cartoon text-2xl">{nft.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About the Collection */}
      <section className="py-20 bg-gradient-to-b from-background to-nfi-purple/5">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <div className="relative">
                <span className="absolute -top-6 -left-6 text-2xl animate-float-medium">✨</span>
                <h2 className="font-cartoon text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
                  Sobre la Colección
                </h2>
              </div>
              <p className="text-lg mb-4">
                "Not Found Ink" es una colección única de 100 NFTs creados por la talentosa ilustradora Ana María, que
                fusiona el estilo icónico de Los Simpson y Futurama con la irreverencia de Shin Chan y elementos de la
                cultura japonesa. <span className="text-nfi-pink text-sm">✨</span>
              </p>
              <p className="text-lg mb-6">
                Cada pieza es única y está disponible exclusivamente en la blockchain de Solana, utilizando un sistema
                de candy machine para garantizar una distribución justa.
              </p>
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Button
                  asChild
                  className="relative gap-2 bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500"
                >
                  <Link href="/artist">
                    Conoce a la artista <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/mom-says.png", alt: "NFT Example 1" },
                { src: "/images/lisa-tv.png", alt: "NFT Example 2" },
                { src: "/images/butterflies.png", alt: "NFT Example 3" },
                { src: "/images/skull.png", alt: "NFT Example 4" },
              ].map((img, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      width={300}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                    {index === 1 && <span className="absolute top-2 right-2 text-xl animate-float-fast">✨</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Obras Destacadas */}
      <section className="py-16 bg-gradient-to-b from-nfi-purple/5 to-background/80 relative overflow-hidden mb-16 rounded-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nfi-purple/10 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="relative text-center mb-10">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-float-medium">
              ✨
            </span>
            <h2 className="font-cartoon text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
              Obras Destacadas
            </h2>
          </div>
          <Carousel 
            items={[
              { src: "/images/profesclase.png", title: "Profesor de Clase", category: "Educación" },
              { src: "/images/buenoluis.png", title: "Bueno Luis", category: "Amistad" },
              { src: "/images/parejita.png", title: "Parejita", category: "Amor" },
              { src: "/images/mihermano.png", title: "Mi Hermano", category: "Familia" },
              { src: "/images/sandrita.png", title: "Sandrita", category: "Retrato" },
              { src: "/images/claracuev.png", title: "Clara Cuev", category: "Personaje" },
              { src: "/images/Screenshot (44).png", title: "You Got This Girl", category: "Motivacional" },
              { src: "/images/Screenshot (45).png", title: "Nada Se Pierde", category: "Reflexión" },
              { src: "/images/Screenshot (46).png", title: "No Time For Negativity", category: "Positivismo" },
              { src: "/images/Screenshot (47).png", title: "Here Comes The Sun", category: "Inspiración" },
            ]}
            itemsPerView={4}
          />
        </div>
      </section>

      {/* How to Mint */}
      <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-nfi-purple/5 to-background/80 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="relative text-center mb-6 sm:mb-8 md:mb-12">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-2xl animate-float-slow">✨</span>
            <h2 className="font-cartoon text-3xl md:text-4xl">Cómo Conseguir tu NFT</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow to-nfi-yellow/50 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="rounded-full w-10 h-10 bg-nfi-yellow flex items-center justify-center mb-3">
                    <span className="font-cartoon text-xl">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Conecta tu Wallet</h3>
                  <p className="text-muted-foreground h-[60px]">
                    Conecta tu wallet de Solana para interactuar con la colección.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-pink to-nfi-pink/50 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="rounded-full w-10 h-10 bg-nfi-pink flex items-center justify-center mb-3">
                    <span className="font-cartoon text-xl">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Elige tu NFT <span className="text-sm">✨</span>
                  </h3>
                  <p className="text-muted-foreground h-[60px]">
                    Explora la colección y elige el NFT que más te guste.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-blue to-nfi-blue/50 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="rounded-full w-10 h-10 bg-nfi-blue flex items-center justify-center mb-3">
                    <span className="font-cartoon text-xl">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Compra y Mint</h3>
                  <p className="text-muted-foreground h-[60px]">
                    Utiliza nuestra rampa crypto para comprar SOL y mintea tu NFT.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Button
                asChild
                size="lg"
                className="relative px-8 py-6 text-lg gap-2 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink hover:from-nfi-pink hover:via-nfi-purple hover:to-nfi-blue transition-all duration-500 shadow-lg shadow-nfi-pink/20"
              >
                <Link href="/mint" className="flex items-center gap-2">
                  Mint Ahora
                  <Sparkles className="h-5 w-5" />
                  <span className="relative w-5 h-5">
                    <span className="absolute inset-0 animate-ping opacity-75 text-xs">✨</span>
                    <span className="relative text-xs">✨</span>
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 bg-gradient-to-b from-background/80 to-nfi-purple/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nfi-purple/10 via-transparent to-transparent"></div>
        <div className="container relative z-10">
          <div className="relative text-center mb-12">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-float-medium">
              ✨
            </span>
            <h2 className="font-cartoon text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
              Explora Nuestro Universo
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-10 h-[300px] md:h-[560px]">
            <VideoPlayer
              src="/videos/nft-video-1.mp4"
              poster="/images/trust-me.png"
              id="video1"
              gradientFrom="nfi-yellow"
              gradientTo="nfi-pink"
              buttonColor="nfi-yellow"
              buttonTextColor="black"
              sparkle={true}
            />
            <VideoPlayer
              src="/videos/nft-video-2.mp4"
              poster="/images/bart-history.png"
              id="video2"
              gradientFrom="nfi-pink"
              gradientTo="nfi-blue"
              buttonColor="nfi-pink"
              buttonTextColor="white"
              sparkle={true}
            />
          </div>
        </div>
      </section>

      {/* Footer with Shin Chan */}
      <div className="relative mt-10 pb-20">
        {/* Línea divisoria donde "camina" Shin Chan */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue"></div>

        {/* Shin Chan parado sobre la línea */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative w-32 md:w-40 h-auto">
            <Image
              src="/images/shin-chan-standing.jpeg"
              alt="Shin Chan"
              width={90}
              height={120}
              className="animate-float-slow"
            />
            <span className="absolute top-0 right-0 text-xl animate-float-fast">✨</span>
          </div>
        </div>

        {/* Mensaje adicional */}
        <div className="container text-center mb-16">
          <p className="text-lg font-cartoon text-nfi-pink">
            ¡Gracias por visitar Not Found Ink! <span className="text-sm">✨</span>
          </p>
        </div>
      </div>
    </div>
  )
}
