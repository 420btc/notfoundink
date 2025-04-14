"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { VideoPlayer } from "@/components/video-player"

interface MediaItem {
  type: "video" | "image"
  src: string
  title: string
  description?: string
}

interface MediaCarouselProps {
  items: MediaItem[]
  itemsPerView?: number
}

export function MediaCarousel({ items, itemsPerView = 1 }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const totalSlides = Math.ceil(items.length / itemsPerView)
  const maxIndex = totalSlides - 1

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      handleNext()
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      handlePrev()
    }
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 8000) // Longer interval for videos

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={carouselRef}
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full flex-shrink-0">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
                {items
                  .slice(
                    slideIndex * itemsPerView,
                    slideIndex * itemsPerView + itemsPerView
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="relative group transform transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                      <div className="relative bg-black/80 rounded-lg overflow-hidden">
                        <div className="aspect-video relative overflow-hidden max-h-[320px]">
                          {item.type === "video" ? (
                            <VideoPlayer
                              src={item.src}
                              poster="/images/placeholder.svg"
                              id={`video-${index}`}
                              gradientFrom="#FDD835"
                              gradientTo="#EC407A"
                              buttonColor="#EC407A"
                              buttonTextColor="#FFFFFF"
                              sparkle
                            />
                          ) : (
                            <Image
                              src={item.src}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <p className="text-white font-cartoon text-lg">
                              {item.title}
                            </p>
                            {item.description && (
                              <p className="text-white/70 text-sm">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <span className="absolute top-2 right-2 text-lg animate-float-fast">
                            ✨
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentIndex === index
                ? "bg-nfi-pink w-4"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
