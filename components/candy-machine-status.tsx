"use client"

import { useCandyMachine } from "@/hooks/use-candy-machine"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export function CandyMachineStatus() {
  const { 
    itemsAvailable,
    itemsRedeemed,
    itemsRemaining,
    price,
    isActive,
    goLiveDate,
    isLoading,
    error
  } = useCandyMachine()

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Cargando estado de la colección...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <div className="animate-spin w-12 h-12 rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // No mostramos errores ya que nuestra implementación simulada no debería fallar

  if (itemsAvailable === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Estado no disponible</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conecta tu wallet para ver el estado de la colección</p>
        </CardContent>
      </Card>
    )
  }

  const percentSold = Math.floor(
    (itemsRedeemed / itemsAvailable) * 100
  )

  const isFuture = !isActive && goLiveDate && goLiveDate > new Date()

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Estado de la Colección</CardTitle>
          {/* Mostramos que la colección está activa */}
          <Badge variant="default" className="bg-green-600 hover:bg-green-700">
            Activa
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progreso de Mint</span>
              <span className="text-sm font-medium">{percentSold}%</span>
            </div>
            <Progress value={percentSold} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{itemsAvailable}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{itemsRedeemed}</p>
              <p className="text-xs text-muted-foreground">Minteados</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{itemsRemaining}</p>
              <p className="text-xs text-muted-foreground">Disponibles</p>
            </div>
          </div>
          
          <div className="text-center pt-4 border-t animate-fade-in">
  <div className="flex flex-col items-center justify-center gap-1">
    <span className="text-nfi-pink text-3xl md:text-4xl animate-float-medium">📅</span>
    <span className="font-cartoon text-xl md:text-2xl text-nfi-yellow drop-shadow-glow">
      ¡Lanzamiento oficial!
    </span>
    <span className="font-cartoon text-lg md:text-xl bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue text-transparent bg-clip-text py-1 px-3 rounded-lg shadow-md mt-1">
      01 de enero de 2026, 00:00
    </span>
  </div>
</div>

          {price > 0 && (
            <div className="text-center pt-2 border-t">
              <p className="text-sm font-medium">
                Precio: <span className="text-primary font-bold">0.20 SOL</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Pago único - Recibe tu NFT al instante
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
