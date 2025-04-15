"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function SolanaPriceBanner() {
  const [price, setPrice] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string>("")

  useEffect(() => {
    const fetchSolanaPrice = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT')
        
        if (!response.ok) {
          throw new Error('Error al obtener el precio de Solana')
        }
        
        const data = await response.json()
        // Formatear el precio a 2 decimales
        const formattedPrice = parseFloat(data.price).toFixed(2)
        setPrice(formattedPrice)
        setError(null)
        setLastUpdate(new Date().toLocaleTimeString())
      } catch (err) {
        console.error('Error fetching Solana price:', err)
        setError('No se pudo obtener el precio actual')
        setPrice(null)
      } finally {
        setLoading(false)
      }
    }

    // Obtener el precio inicialmente
    fetchSolanaPrice()
    
    // Actualizar el precio cada 30 segundos
    const interval = setInterval(fetchSolanaPrice, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-nfi-blue/10 via-nfi-purple/20 to-nfi-blue/10 p-6 shadow-xl border border-nfi-purple/30">
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-nfi-blue/0 via-nfi-purple/20 to-nfi-blue/0 animate-shimmer"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image 
                src="/images/solana-sol.png" 
                alt="Solana Logo" 
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="font-cartoon text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
                Precio de Solana
              </h2>
              <p className="text-sm text-muted-foreground">
                Actualizado en tiempo real desde Binance
              </p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 w-32 bg-nfi-purple/20 rounded"></div>
                <div className="h-4 w-24 bg-nfi-purple/10 rounded mt-2"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <p className="font-cartoon text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
                  ${price} USD
                </p>
                <p className="text-sm text-muted-foreground">
                  {lastUpdate}
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* Estrellas decorativas */}
        <span className="absolute top-2 right-2 text-xl animate-float-slow">✨</span>
        <span className="absolute bottom-2 left-2 text-lg animate-float-medium">✨</span>
      </div>
    </div>
  )
}
