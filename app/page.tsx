import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
      <div className="flex flex-col bg-white">
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
                <span className="hidden sm:block absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
                <span className="hidden sm:block absolute -top-4 -right-8 text-3xl animate-float-medium">✨</span>
                <h1 className="font-cartoon text-4xl xs:text-5xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wide">
                  <span 
                    className="font-bold"
                    style={{
                      color: '#FFD93D',
                      textShadow: `
                        2px 2px 0 #E91E63,
                        4px 4px 0 #E91E63,
                        6px 6px 0 #C2185B,
                        8px 8px 0 #AD1457,
                        10px 10px 15px rgba(0,0,0,0.5)
                      `
                    }}
                  >Not Found</span>{" "}
                  <span 
                    className="font-bold"
                    style={{
                      color: '#E91E63',
                      textShadow: `
                        2px 2px 0 #FFD93D,
                        4px 4px 0 #FFD93D,
                        6px 6px 0 #FFC107,
                        8px 8px 0 #FF9800,
                        10px 10px 15px rgba(0,0,0,0.5)
                      `
                    }}
                  >Ink</span>
                </h1>
                <span className="hidden sm:block absolute bottom-2 right-0 text-xl animate-float-fast">✨</span>
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
              <div className="relative group transform transition-transform hover:scale-105">
                  <Button
                    asChild
                    size="lg"
                    className="relative font-medium text-lg px-8 py-6 bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500 shadow-lg hover:shadow-xl"
                  >
                    <Link href="/collection">Ver Galería</Link>
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Collection */}
      <section className="py-16 bg-white relative overflow-hidden mb-16 rounded-xl">
        <div className="absolute inset-0 bg-white"></div>
        <div className="container relative z-10">
          <div className="relative text-center mb-10">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-float-medium">✨</span>
            <h2 
              className="font-cartoon text-3xl md:text-5xl"
              style={{
                color: '#FFD93D',
                textShadow: `
                  1px 1px 0 #E91E63,
                  2px 2px 0 #E91E63,
                  3px 3px 0 #C2185B,
                  4px 4px 0 #AD1457,
                  5px 5px 10px rgba(0,0,0,0.3)
                `
              }}
            >Obras Destacadas</h2>
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

      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <div className="relative">
                <span className="absolute -top-6 -left-6 text-2xl animate-float-medium">✨</span>
                <h2 
                  className="font-cartoon text-3xl md:text-5xl mb-6"
                  style={{
                    color: '#E91E63',
                    textShadow: `
                      1px 1px 0 #FFD93D,
                      2px 2px 0 #FFD93D,
                      3px 3px 0 #FFC107,
                      4px 4px 0 #FF9800,
                      5px 5px 10px rgba(0,0,0,0.3)
                    `
                  }}
                >Sobre la Colección</h2>
              </div>
              <TypewriterOnView text={'"Not Found Ink" es una colección única de 100 obras digitales creadas por la talentosa ilustradora Ana María, que fusiona el estilo icónico de Los Simpson y Futurama con la irreverencia de Shin Chan y elementos de la cultura japonesa.'} className="text-lg mb-4" as="p">
  <span className="text-nfi-pink text-sm">✨</span>
</TypewriterOnView>
<TypewriterOnView text={'Cada pieza es única y está disponible exclusivamente en nuestra galería digital, garantizando una experiencia artística auténtica y vibrante.'} className="text-lg mb-6" as="p" />
              <div className="relative inline-block group">
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
            <div className="grid grid-cols-2 gap-8 sm:gap-12 place-items-center">
              {[
                { src: "/images/Nuevox (11).jpeg", alt: "Obra 11" },
                { src: "/images/Nuevox (12).jpeg", alt: "Obra 12" },
                { src: "/images/Nuevox (13).jpeg", alt: "Obra 13" },
                { src: "/images/Nuevox (10).jpeg", alt: "Obra 10" },
              ].map((img, index) => (
                <div key={index} className="relative group w-full max-w-[250px]">
                  {/* Glow Effect */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue opacity-40 blur-xl -z-10 rounded-xl transition-opacity duration-500 group-hover:opacity-70"></div>
                  
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover aspect-square transform transition-transform duration-500 group-hover:scale-105"
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
              <span 
                className="px-2 pb-2 inline-block mr-1"
                style={{
                  color: '#FFD93D',
                  textShadow: `
                    1px 1px 0 #E91E63,
                    2px 2px 0 #E91E63,
                    3px 3px 0 #C2185B,
                    4px 4px 0 #AD1457,
                    5px 5px 10px rgba(0,0,0,0.3)
                  `
                }}
              >Portfolio</span>
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
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="relative text-center mb-12">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-float-medium">
              ✨
            </span>
            <h2 
              className="font-cartoon text-4xl md:text-5xl"
              style={{
                color: '#E91E63',
                textShadow: `
                  1px 1px 0 #FFD93D,
                  2px 2px 0 #FFD93D,
                  3px 3px 0 #FFC107,
                  4px 4px 0 #FF9800,
                  5px 5px 10px rgba(0,0,0,0.3)
                `
              }}
            >Explora Nuestro Universo</h2>
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

      {/* CTA Section */}
      <section className="py-24 container text-center">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-[3rem] p-8 md:p-20 relative overflow-hidden shadow-2xl mx-auto max-w-5xl">
          {/* Video Background */}
          <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
              <source src="/videos/fondotarjeta.mp4" type="video/mp4" />
          </video>
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nfi-blue/30 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nfi-pink/30 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <Badge variant="outline" className="border-white/30 text-white mb-6 px-4 py-1 tracking-widest bg-white/5">COLECCIÓN 2025</Badge>
            
            <h2 className="font-cartoon text-5xl md:text-7xl mb-6 leading-tight py-4 px-2">
              ¿Listo para tener <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow to-nfi-pink inline-block pb-2 px-1">tu propia obra?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              Cada pieza es única e irrepetible. Únete a una comunidad exclusiva de coleccionistas y amantes del arte digital.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Button asChild size="lg" className="rounded-full px-10 h-16 text-lg bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all shadow-xl font-bold">
                  <Link href="/collection">Explorar Colección</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-sm">
                  <Link href="/pedidos">Saber Más</Link>
                </Button>
              </div>
          </div>
        </div>
      </section>

      {/* Footer with Shin Chan */}
      <div className="container text-center mb-16 mt-10 pb-20">
          <p 
            className="text-lg font-cartoon"
            style={{
              color: '#FFD93D',
              textShadow: `
                1px 1px 0 #E91E63,
                2px 2px 0 #E91E63,
                3px 3px 0 #C2185B,
                4px 4px 0 #AD1457,
                5px 5px 10px rgba(0,0,0,0.3)
              `
            }}
          >
            ¡Gracias por Visitar<span 
              style={{
                color: '#E91E63',
                textShadow: `
                  1px 1px 0 #FFD93D,
                  2px 2px 0 #FFD93D,
                  3px 3px 0 #FFC107,
                  4px 4px 0 #FF9800,
                  5px 5px 10px rgba(0,0,0,0.3)
                `,
                marginLeft: '2rem'
              }}
            >Not Found Ink</span>!
          </p>
        </div>
    </div>
    </>
  );
}
