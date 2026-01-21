"use client";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import "../../styles/animate-vibrate.css";
import "../../styles/animate-explode.css";
import "../../styles/animate-rotate-slow.css";
import { Instagram, ExternalLink, Palette, Brush, Sparkles, Star, Zap, MapPin, ArrowRightLeft } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import React, { useRef, useState, useEffect } from "react"
import TypewriterText from "@/components/TypewriterText"

export default function ArtistPage() {
  const [isMainImageFront, setIsMainImageFront] = useState(true);

  const toggleImages = () => {
    setIsMainImageFront(!isMainImageFront);
  };
  
  return (
     <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Modern Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
            {/* Background elements */}
             <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-nfi-purple/5 to-transparent -z-10" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-nfi-yellow/10 rounded-full blur-[100px] -z-10" />
             <div className="absolute top-20 right-20 w-64 h-64 bg-nfi-pink/10 rounded-full blur-[80px] -z-10" />
            
            <div className="container grid lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Text Content - Left (7 cols) */}
                <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nfi-pink/30 bg-nfi-pink/5 text-nfi-pink text-sm font-medium animate-fade-in backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Illustrator & Digital Artist</span>
                    </div>
                    
                    <h1 className="font-cartoon text-6xl sm:text-7xl md:text-8xl leading-[1.1] tracking-tight py-2 px-1">
                        Ana María <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue relative inline-block px-4 pb-2">
                            De Carvalho
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-nfi-yellow opacity-60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                        Creando mundos donde la <span className="font-bold text-foreground">nostalgia de los 90</span> se encuentra con el caos moderno. 
                        Una fusión vibrante de líneas limpias, colores explosivos y personajes inolvidables.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Link href="/portfolio" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-black text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg group">
                            <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Ver Portfolio
                        </Link>
                        <a href="https://www.instagram.com/notfoundink/" target="_blank" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-gray-800 font-medium group">
                            <Instagram className="w-5 h-5 text-nfi-pink group-hover:scale-110 transition-transform" />
                            Instagram
                        </a>
                    </div>

                    <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-nfi-blue" />
                            Málaga, España
                        </div>
                        <div className="flex items-center gap-2">
                            <Brush className="w-4 h-4 text-nfi-yellow" />
                            +100 Obras Únicas
                        </div>
                    </div>
                </div>

                {/* Image Content - Right (5 cols) */}
                <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center relative">
                     <div className="relative w-72 h-72 md:w-[450px] md:h-[500px]">
                        
                        {/* Carousel Toggle Button */}
                        <Button 
                            size="icon" 
                            className="absolute -top-4 -right-4 z-50 rounded-full w-14 h-14 shadow-xl bg-white text-black hover:bg-nfi-yellow hover:scale-110 transition-all duration-300 border-4 border-white"
                            onClick={toggleImages}
                        >
                            <ArrowRightLeft className="w-6 h-6" />
                        </Button>

                        {/* Second Image (Ana Mari Real) */}
                        <div 
                            className={`absolute w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-in-out ${
                                !isMainImageFront 
                                ? "z-20 top-0 left-0 rotate-3 scale-100" 
                                : "z-10 -bottom-10 -left-10 -rotate-6 brightness-50"
                            }`}
                        >
                             <Image src="/images/anamari.png" alt="Ana Mari Real" fill className="object-cover" />
                             
                             {/* Content visible when this image is front */}
                             <div className={`transition-opacity duration-300 ${!isMainImageFront ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <p className="text-white font-cartoon text-3xl mb-1">Ana María</p>
                                    <p className="text-white/80 text-sm font-light tracking-wide">REAL LIFE</p>
                                </div>
                             </div>
                        </div>
                        
                        {/* Main Image Container */}
                        <div 
                            className={`absolute w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-white transition-all duration-700 ease-in-out ${
                                isMainImageFront 
                                ? "z-20 top-0 left-0 rotate-3" 
                                : "z-10 -bottom-10 -left-10 -rotate-6 brightness-50"
                            }`}
                        >
                            <Image src="/images/image (2).jpg" alt="Ana María" fill className="object-cover transition-transform duration-700 hover:scale-110" priority />
                            
                            {/* Content visible when this image is front */}
                            <div className={`transition-opacity duration-300 ${isMainImageFront ? 'opacity-100' : 'opacity-0'}`}>
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                
                                {/* Floating Badge */}
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg transform rotate-12">
                                    <span className="text-2xl">👩‍🎨</span>
                                </div>

                                {/* Bottom Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <p className="text-white font-cartoon text-3xl mb-1">La Artista</p>
                                    <p className="text-white/80 text-sm font-light tracking-wide">MENTE CREATIVA</p>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Timeline / Bio Section - "El Viaje" */}
        <section className="py-24 container relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-nfi-pink/20 to-transparent -z-10"></div>
            
            <div className="text-center mb-16">
                <span className="text-nfi-blue font-bold tracking-widest text-sm uppercase mb-2 block">Trayectoria</span>
                <h2 className="font-cartoon text-4xl md:text-5xl">El Viaje Creativo</h2>
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 items-end">
                    {/* Card 1 - Smallest */}
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 relative group overflow-hidden h-[280px] flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-nfi-yellow/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>
                        <div className="w-12 h-12 bg-nfi-yellow rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-md rotate-3 group-hover:rotate-12 transition-transform">🖌️</div>
                        <div>
                            <div className="flex items-baseline justify-between mb-2">
                                <h3 className="font-bold text-lg">Los Inicios</h3>
                                <span className="font-cartoon text-nfi-yellow text-xl">2018</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Primeros bocetos y experimentación. La búsqueda de una voz propia.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 - Medium */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 relative group overflow-hidden h-[340px] flex flex-col justify-between">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-nfi-pink/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>
                        <div className="w-14 h-14 bg-nfi-pink rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-md -rotate-3 group-hover:-rotate-12 transition-transform">💻</div>
                        <div>
                            <div className="flex items-baseline justify-between mb-4">
                                <h3 className="font-bold text-xl">Era Digital</h3>
                                <span className="font-cartoon text-nfi-pink text-2xl">2020</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                Transición al arte digital. El descubrimiento del iPad y Procreate abrió un universo de posibilidades.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 - Largest */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-nfi-blue/20 hover:shadow-2xl transition-all hover:-translate-y-2 relative group overflow-hidden h-[400px] flex flex-col justify-between transform md:-translate-y-8">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-nfi-blue/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>
                        <div className="w-16 h-16 bg-nfi-blue rounded-2xl flex items-center justify-center mb-8 text-4xl shadow-md rotate-6 group-hover:rotate-0 transition-transform">🚀</div>
                        <div>
                            <div className="flex items-baseline justify-between mb-4">
                                <h3 className="font-bold text-2xl">Not Found Ink</h3>
                                <span className="font-cartoon text-nfi-blue text-3xl">2023</span>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Nace la marca. Una fusión de identidad, caos y color. Lanzamiento de la primera colección oficial de 100 obras.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Bento Grid Inspiration */}
        <section className="py-24 bg-secondary/30">
             <div className="container">
                <div className="text-center mb-12">
                    <span className="text-nfi-pink font-bold tracking-widest text-sm uppercase mb-2 block">Moodboard</span>
                    <h2 className="font-cartoon text-4xl md:text-5xl mb-4">Fuentes de Inspiración</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Un collage de influencias que dan forma a mi universo creativo.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                    {/* Large Item - Simpson */}
                    <div className="col-span-1 md:col-span-2 row-span-2 relative rounded-[2rem] overflow-hidden group shadow-lg cursor-pointer h-[300px] md:h-auto">
                        <Image src="/images/bart-smoking.jpeg" alt="Simpsons" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
                            <div>
                                <span className="bg-nfi-yellow text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">CLÁSICO</span>
                                <h3 className="text-white font-cartoon text-3xl">Estética 90s</h3>
                                <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">Líneas gruesas y colores planos</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tall Item - Futurama */}
                    <div className="col-span-1 md:col-span-1 row-span-2 relative rounded-[2rem] overflow-hidden group shadow-lg cursor-pointer h-[300px] md:h-auto">
                         <Image src="/images/bender-sketch.jpeg" alt="Futurama" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                            <div>
                                <span className="bg-nfi-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">SCIFI</span>
                                <h3 className="text-white font-bold text-xl">Humor Ácido</h3>
                            </div>
                        </div>
                    </div>

                    {/* Small Item 1 - Anime */}
                    <div className="col-span-1 md:col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden group shadow-lg cursor-pointer h-[200px] md:h-auto">
                         <Image src="/images/shin-chan-heart.jpeg" alt="Anime" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <h3 className="text-white font-cartoon text-2xl drop-shadow-lg">Anime</h3>
                        </div>
                    </div>

                    {/* Small Item 2 - Text */}
                    <div className="col-span-1 md:col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden group shadow-lg bg-gradient-to-br from-nfi-pink to-nfi-purple flex items-center justify-center p-6 text-center h-[200px] md:h-auto">
                        <div className="relative z-10">
                            <span className="text-5xl mb-2 block animate-bounce-slow">✨</span>
                            <h3 className="font-cartoon text-white text-xl">Pop Culture</h3>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                    </div>
                </div>
             </div>
        </section>

        {/* Expo Gallery (Horizontal Scroll - Film Strip) */}
        <section className="py-24 overflow-hidden">
            <div className="container mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <span className="text-nfi-yellow font-bold tracking-widest text-sm uppercase mb-2 block">Comunidad</span>
                    <h2 className="font-cartoon text-4xl md:text-5xl">Expo & Eventos</h2>
                </div>
                <div className="flex gap-2">
                    <div className="h-2 w-20 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-full"></div>
                </div>
            </div>
            
            {/* Film strip effect */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex gap-8 overflow-x-auto pb-12 px-4 md:px-12 snap-x container no-scrollbar" style={{ scrollPaddingLeft: '2rem' }}>
                    {/* Video Card 1 */}
                    <div className="min-w-[320px] md:min-w-[500px] snap-center shrink-0">
                         <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-black bg-black group">
                            <VideoPlayer 
                                src="/videos/feria1.mp4" 
                                poster="/images/placeholder.svg" 
                                id="v1" 
                                sparkle 
                                gradientFrom="#FDD835"
                                gradientTo="#EC407A"
                                buttonColor="#EC407A"
                                buttonTextColor="#FFFFFF"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1 rounded-full z-20">2024</div>
                         </div>
                         <div className="mt-6 flex justify-between items-start px-2">
                            <div>
                                <h3 className="font-cartoon text-2xl">Feria de Arte</h3>
                                <p className="text-muted-foreground text-sm">Exposición Principal • Madrid</p>
                            </div>
                            <Button size="icon" variant="ghost" className="rounded-full hover:bg-nfi-yellow/20 text-nfi-yellow">
                                <ExternalLink className="w-5 h-5" />
                            </Button>
                         </div>
                    </div>
                     {/* Video Card 2 */}
                    <div className="min-w-[320px] md:min-w-[500px] snap-center shrink-0">
                         <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-black bg-black group">
                            <VideoPlayer 
                                src="/videos/feria2.mp4" 
                                poster="/images/placeholder.svg" 
                                id="v2" 
                                sparkle 
                                gradientFrom="#FDD835"
                                gradientTo="#EC407A"
                                buttonColor="#EC407A"
                                buttonTextColor="#FFFFFF"
                            />
                             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1 rounded-full z-20">HIGHLIGHT</div>
                         </div>
                         <div className="mt-6 flex justify-between items-start px-2">
                             <div>
                                <h3 className="font-cartoon text-2xl">Encuentro con Fans</h3>
                                <p className="text-muted-foreground text-sm">Firma de Autógrafos • Barcelona</p>
                            </div>
                            <Button size="icon" variant="ghost" className="rounded-full hover:bg-nfi-pink/20 text-nfi-pink">
                                <ExternalLink className="w-5 h-5" />
                            </Button>
                         </div>
                    </div>
                    {/* Image Card */}
                    <div className="min-w-[320px] md:min-w-[500px] snap-center shrink-0">
                         <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-black group cursor-pointer">
                             <Image src="/images/feria5.jpg" alt="Expo" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full">
                                  <Instagram className="w-5 h-5" />
                              </div>
                         </div>
                         <div className="mt-6 flex justify-between items-start px-2">
                             <div>
                                <h3 className="font-cartoon text-2xl">Galería Central</h3>
                                <p className="text-muted-foreground text-sm">Instalación Permanente</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA - Modern Glassmorphism */}
        <section className="py-24 container text-center">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-[3rem] p-8 md:p-20 relative overflow-hidden shadow-2xl mx-auto max-w-5xl">
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
                        <Button asChild size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                            <Link href="/mint">Saber Más</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
     </div>
  )
}
