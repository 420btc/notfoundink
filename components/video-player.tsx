"use client"

import { useRef } from "react"
import { RefreshCw } from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster: string
  id: string
  gradientFrom: string
  gradientTo: string
  buttonColor: string
  buttonTextColor: string
  sparkle?: boolean
}

export function VideoPlayer({
  src,
  poster,
  id,
  gradientFrom,
  gradientTo,
  buttonColor,
  buttonTextColor,
  sparkle = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div className="relative group h-full">
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
      ></div>
      <div className="relative bg-white/90 dark:bg-gray-900/90 rounded-lg overflow-hidden h-full">
        <video
          ref={videoRef}
          id={id}
          className="w-full h-full object-cover rounded-lg aspect-video"
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={restartVideo}
            className={`bg-${buttonColor} hover:bg-${buttonColor}/80 text-${buttonTextColor} font-medium rounded-full w-10 h-10 flex items-center justify-center transition-colors`}
            aria-label="Reiniciar video"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
        {sparkle && <span className="absolute top-4 right-4 text-2xl animate-float-medium">✨</span>}
      </div>
    </div>
  )
}
