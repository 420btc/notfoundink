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
            <div className="animate-pulse w-12 h-12 rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full border-red-200 dark:border-red-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-red-600 dark:text-red-400">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

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
          {isActive && (
            <Badge variant="default" className="bg-green-600 hover:bg-green-700">
              Activa
            </Badge>
          )}
          {isFuture && goLiveDate && (
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500">
              Coming Soon
            </Badge>
          )}
          {!isActive && !isFuture && (
            <Badge variant="outline" className="bg-yellow-600 hover:bg-yellow-700">
              Inactiva
            </Badge>
          )}
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
          
          {goLiveDate && (
            <div className="text-center pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Fecha de lanzamiento: {goLiveDate.toLocaleString()}
              </p>
            </div>
          )}

          {price > 0 && (
            <div className="text-center pt-2 border-t">
              <p className="text-sm font-medium">
                Precio: <span className="text-primary">{price} SOL</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
