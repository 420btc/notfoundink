"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Image from "next/image";

export const inspiracionesExtra = [
  {
    nombre: "Pokémon",
    info: "La franquicia de Pokémon, creada por Satoshi Tajiri, es un fenómeno mundial que mezcla aventura, criaturas coleccionables y valores de amistad. Su universo colorido y personajes icónicos han inspirado a generaciones.",
    imagen: "/images/piakchu.jpg",
    alt: "Inspiración Pokémon",
  },
  {
    nombre: "Los Simpson",
    info: "La icónica serie animada creada por Matt Groening ha sido una gran influencia en el estilo de Ana María, especialmente en la forma de los personajes y el uso del color.",
    imagen: "/images/bart.jpg",
    alt: "Inspiración Los Simpson",
  },
  {
    nombre: "Supernenas",
    info: "Las Supernenas (The Powerpuff Girls) son una serie animada estadounidense creada por Craig McCracken. Sus protagonistas, tres niñas con superpoderes, combinan ternura y acción, y han dejado huella en la cultura pop.",
    imagen: "/images/supernenas2.jpg",
    alt: "Inspiración Supernenas",
  },
  {
    nombre: "Mabel Pines",
    info: "Mabel Pines es uno de los personajes principales de Gravity Falls. Su personalidad optimista, creativa y extravagante la han convertido en un icono entrañable de la animación contemporánea.",
    imagen: "/images/mabelpines.jpg",
    alt: "Inspiración Mabel Pines",
  },
];

interface InspiracionItem {
  nombre: string;
  info: string;
  imagen: string;
  alt: string;
}

interface InspiracionCarruselProps {
  items: InspiracionItem[];
}

export function InspiracionCarrusel({ items }: InspiracionCarruselProps) {
  return (
    <div className="py-10 px-2 md:px-8">

      <div className="relative">
        <Carousel>
          <CarouselContent>
            {items.map((item: InspiracionItem, idx: number) => (
              <CarouselItem
                key={item.nombre}
                className="flex gap-x-2 basis-full md:basis-1/3"
              >
                <div className="relative group flex flex-col items-center w-full min-h-[270px] max-h-[270px]">
                  {/* Fondo neón mejorado y centrado */}
                  <div className="absolute inset-0 flex justify-center items-center z-0">
                    <div className="w-5/6 h-5/6 rounded-2xl bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue blur-2xl opacity-60 group-hover:opacity-90 transition duration-700 group-hover:duration-200"></div>
                  </div>
                  <div className="p-3 w-full h-full bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg flex flex-col items-center justify-center relative z-10">
                    <h3 className="text-base md:text-lg font-bold mb-2 text-center">{item.nombre}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 text-center">{item.info}</p>
                    <div className="aspect-video relative rounded-lg overflow-hidden w-full max-w-[140px] md:max-w-[160px]">
                      <Image src={item.imagen} alt={item.alt} fill className="object-contain bg-white" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-nfi-pink to-nfi-purple text-white shadow-lg hover:brightness-110 border-none" />
          <CarouselNext className="-right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-nfi-pink to-nfi-purple text-white shadow-lg hover:brightness-110 border-none" />
        </Carousel>
      </div>
    </div>
  );
}

