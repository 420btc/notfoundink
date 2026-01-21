import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import { Carousel } from "@/components/carousel"
import ClientTypewriterSection from "@/components/ClientTypewriterSection";
import TypewriterOnView from "@/components/TypewriterOnView";

import { IntroScreen } from "@/components/intro-screen";

export default function Home() {
  return (
    <>
      <IntroScreen />
      <div className="flex flex-col bg-gradient-to-b from-nfi-purple/5 to-background">
        {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container-fluid p-0 relative z-10">
          <div className="relative w-full">
            <Image
              src="/images/nfi-collage.png"
              alt="Not Found Ink Collage"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-black/40 backdrop-blur-sm px-4 py-3 sm:px-10 sm:py-6 rounded-xl w-auto">
                <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
                <span className="absolute -top-4 -right-8 text-3xl animate-float-medium">✨</span>
                <h1 className="font-cartoon text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  <span className="text-nfi-yellow font-bold">Not Found</span>{" "}
                  <span className="text-nfi-pink font-bold">Ink</span>
                </h1>
                <span className="absolute bottom-2 right-0 text-xl animate-float-fast">✨</span>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6">
            <div className="text-xl md:text-2xl max-w-2xl mx-auto text-center mb-8">
              <p className="mb-3 leading-relaxed">
                Una colección exclusiva de 100 obras digitales creadas por Ana María. Fusionando nostalgia y arte contemporáneo, cada pieza reinterpreta iconos de la cultura pop con un estilo vibrante y único. ✨
              </p>
              <ClientTypewriterSection />
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
                    <Link href="/collection">Ver Galería</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Collection */}
      <section className="py-16 bg-white relative overflow-hidden mb-16 rounded-xl">
        <div className="absolute inset-0 rounded-xl p-[3px] bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-yellow animate-border-shine">
          <div className="absolute inset-0 rounded-[calc(0.75rem-1px)] bg-white"></div>
        </div>
        <div className="absolute -z-10 inset-0 bg-cartoon-pattern opacity-5"></div>
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-nfi-yellow/5 to-nfi-pink/5 rounded-xl"></div>
        <div className="container relative z-10">
          <div className="relative text-center mb-10">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-float-medium">✨</span>
            <h2 className="font-cartoon text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">Obras Destacadas</h2>
          </div>
          <Carousel 
            items={[
              { src: "/images/Nuevox (1).jpeg", title: "Nueva Perspectiva", category: "Arte" },
              { src: "/images/Nuevox (2).jpeg", title: "Horizontes", category: "Color" },
              { src: "/images/Nuevox (3).jpeg", title: "Reflejos Urbanos", category: "Urbano" },
              { src: "/images/Nuevox (4).jpeg", title: "Instante Fugaz", category: "Momento" },
              { src: "/images/Nuevox (5).jpeg", title: "Memorias", category: "Recuerdo" },
              { src: "/images/Nuevox (6).jpeg", title: "Ecos del Ayer", category: "Nostalgia" },
              { src: "/images/Nuevox (7).jpeg", title: "Sueños Lúcidos", category: "Onírico" },
              { src: "/images/Nuevox (8).jpeg", title: "Fragmentos", category: "Abstracto" },
              { src: "/images/Nuevox (9).jpeg", title: "Silencios", category: "Calma" },
              { src: "/images/Nuevox (10).jpeg", title: "Mirada Interior", category: "Retrato" },
              { src: "/images/Nuevox (11).jpeg", title: "Caminos Cruzados", category: "Vida" },
              { src: "/images/Nuevox (12).jpeg", title: "Destellos", category: "Luz" },
            ]}
            itemsPerView={4}
          />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-nfi-purple/5 to-background/80 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <div className="relative">
                <span className="absolute -top-6 -left-6 text-2xl animate-float-medium">✨</span>
                <h2 className="font-cartoon text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
                  Sobre la Colección
                </h2>
              </div>
              <TypewriterOnView text={'"Not Found Ink" es una colección única de 100 obras digitales creadas por la talentosa ilustradora Ana María, que fusiona el estilo icónico de Los Simpson y Futurama con la irreverencia de Shin Chan y elementos de la cultura japonesa.'} className="text-lg mb-4" as="p">
  <span className="text-nfi-pink text-sm">✨</span>
</TypewriterOnView>
<TypewriterOnView text={'Cada pieza es única y está disponible exclusivamente en nuestra galería digital, garantizando una experiencia artística auténtica y vibrante.'} className="text-lg mb-6" as="p" />
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Button
                  asChild
                  className="relative gap-2 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink hover:from-nfi-pink hover:via-nfi-purple hover:to-nfi-blue transition-all duration-500"
                >
                  <Link href="/artist">
                    Conoce a la artista <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/Nuevox (1).jpeg", alt: "Obra 1" },
                { src: "/images/Nuevox (2).jpeg", alt: "Obra 2" },
                { src: "/images/Nuevox (3).jpeg", alt: "Obra 3" },
                { src: "/images/Nuevox (4).jpeg", alt: "Obra 4" },
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

      {/* Featured NFTs - Destacados */}
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="relative">
            <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
            <h2 className="font-cartoon text-4xl md:text-6xl mb-4 md:mb-0 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue animate-shine px-2 pb-2 inline-block bg-[length:200%_100%] mr-1">
                Portfolio
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
            { id: 37, image: "/images/Nuevox (13).jpeg", title: "Esencia Pura ✨" },
            { id: 25, image: "/images/Nuevox (1).jpeg", title: "Nueva Perspectiva ✨" },
            { id: 26, image: "/images/Nuevox (2).jpeg", title: "Horizontes ✨" },
          ].map((nft) => (
            <Link
              href={`/collection/${nft.id}`}
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

      {/* Sección MintPage */}
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 rounded-lg p-6 mb-8">
        {/* Contenido existente de MintPage */}
      </div>

      {/* Videos Section */}
      <section className="py-20 bg-gradient-to-b from-background/80 to-nfi-purple/10 relative overflow-hidden">
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
        <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 z-10">
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
        <div className="container text-center mb-16">
          <p className="text-lg font-cartoon text-nfi-pink">
            ¡Gracias por visitar Not Found Ink! <span className="text-sm">✨</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
