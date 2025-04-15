"use client"

import { useRef, useState } from "react"
import { RefreshCw, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const [open, setOpen] = useState(false)

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }
  const restartModalVideo = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0
      modalVideoRef.current.play()
    }
  }

  return (
    <>
      <div className="relative group h-full cursor-pointer" onClick={() => setOpen(true)}>
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
              onClick={e => { e.stopPropagation(); restartVideo(); }}
              className={`bg-[${buttonColor}] hover:bg-[${buttonColor}]/80 text-[${buttonTextColor}] font-medium rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-lg`}
              aria-label="Reiniciar video"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          {sparkle && <span className="absolute top-4 right-4 text-2xl animate-float-medium">✨</span>}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl w-full bg-gradient-to-br from-nfi-purple/90 to-nfi-blue/80 p-0 rounded-2xl overflow-hidden shadow-2xl border-0 flex flex-col items-center justify-center">
          <div className="w-full flex justify-end p-4">
            <button
              onClick={() => setOpen(false)}
              className="bg-nfi-pink hover:bg-nfi-yellow text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-xl transition-colors"
              aria-label="Cerrar video"
            >
              <X className="h-7 w-7" />
            </button>
          </div>
          <div className="flex flex-col items-center w-full px-4 pb-6">
            <video
              ref={modalVideoRef}
              className="w-full h-auto rounded-xl aspect-video bg-black"
              controls
              autoPlay
              poster={poster}
              style={{ maxHeight: '60vh' }}
            >
              <source src={src} type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={restartModalVideo}
                className="bg-nfi-yellow hover:bg-nfi-pink text-nfi-blue font-bold rounded-full w-14 h-14 flex items-center justify-center text-xl shadow-lg transition-colors border-2 border-nfi-blue"
                aria-label="Repetir video"
              >
                <RefreshCw className="h-7 w-7" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-nfi-pink hover:bg-nfi-yellow text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-xl shadow-lg transition-colors border-2 border-nfi-yellow"
                aria-label="Cerrar video"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
