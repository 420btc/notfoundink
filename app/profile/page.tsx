"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useWallet } from "@/components/wallet-provider"
import { getUserNFTs, type NFT } from "@/lib/nft-utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, ExternalLink, Copy, Check } from "lucide-react"

export default function ProfilePage() {
  const { connected, publicKey, walletType, solanaConnection } = useWallet()
  const [userNFTs, setUserNFTs] = useState<NFT[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Cargar los NFTs del usuario cuando se conecta
  useEffect(() => {
    async function loadUserNFTs() {
      if (connected && publicKey && solanaConnection) {
        setLoading(true)
        try {
          const nfts = await getUserNFTs(solanaConnection, publicKey)
          setUserNFTs(nfts)
        } catch (error) {
          console.error("Error al cargar NFTs:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setUserNFTs([])
      }
    }

    loadUserNFTs()
  }, [connected, publicKey, solanaConnection])

  // Función para truncar la dirección
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Función para copiar la dirección al portapapeles
  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!connected) {
    return (
      <div className="container py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="relative mb-8">
            <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
            <h1 className="font-cartoon text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
              Mi Colección
            </h1>
          </div>
          <p className="text-lg mb-8">
            Conecta tu wallet para ver tus NFTs de la colección "Not Found Ink".
          </p>
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <Link href="/" className="relative inline-block">
              <Button className="gap-2 bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500">
                <Wallet className="h-4 w-4" />
                Ir a Inicio y Conectar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10 bg-gradient-to-b from-nfi-purple/5 to-background">
      <div className="relative mb-6">
        <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
        <h1 className="font-cartoon text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
          Mi Colección
        </h1>
      </div>

      {/* Información de la wallet */}
      <div className="relative group mb-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative">
                  <Image
                    src={walletType === "phantom" ? "/images/phantom-icon.png" : "/images/solflare-icon.png"}
                    alt={walletType === "phantom" ? "Phantom" : "Solflare"}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Wallet Conectada</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{truncateAddress(publicKey || "")}</p>
                    <button
                      onClick={copyAddress}
                      className="text-nfi-pink hover:text-nfi-blue transition-colors"
                      aria-label="Copiar dirección"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="gap-2 border-nfi-pink text-nfi-pink hover:bg-nfi-pink/20"
                  asChild
                >
                  <Link href={`https://explorer.solana.com/address/${publicKey}?cluster=devnet`} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                    Ver en Explorer
                  </Link>
                </Button>
                <Button
                  className="gap-2 bg-gradient-to-r from-nfi-yellow to-nfi-pink hover:from-nfi-pink hover:to-nfi-yellow transition-all duration-500"
                  asChild
                >
                  <Link href="/mint">
                    Mint Nuevo NFT
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para NFTs */}
      <Tabs defaultValue="collection" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="collection">Colección</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
        </TabsList>
        
        <TabsContent value="collection">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-nfi-pink mb-4"></div>
              <p>Cargando tus NFTs...</p>
            </div>
          ) : userNFTs.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
              {userNFTs.map((nft) => (
                <div key={nft.mint} className="transform transition-all duration-300 hover:scale-105">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 overflow-hidden">
                      <div className="aspect-square relative">
                        <Image
                          src={nft.metadata?.image || "/placeholder.svg"}
                          alt={nft.metadata?.name || "NFT"}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <div>
                            <p className="text-white font-cartoon text-lg">{nft.metadata?.name}</p>
                            {nft.metadata?.attributes.find(attr => attr.trait_type === "Rarity") && (
                              <p className="text-white text-sm">
                                {nft.metadata?.attributes.find(attr => attr.trait_type === "Rarity")?.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg mb-6">Aún no tienes NFTs de la colección "Not Found Ink".</p>
              <div className="relative group inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Button
                  asChild
                  className="relative gap-2 bg-gradient-to-r from-nfi-blue via-nfi-purple to-nfi-pink hover:from-nfi-pink hover:via-nfi-purple hover:to-nfi-blue transition-all duration-500"
                >
                  <Link href="/mint">
                    Mint tu primer NFT
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow to-nfi-pink rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Actividad Reciente</h3>
                {userNFTs.length > 0 ? (
                  <div className="space-y-4">
                    {userNFTs.map((nft, index) => (
                      <div key={`activity-${nft.mint}`} className="flex items-center gap-4 pb-4 border-b last:border-0">
                        <div className="w-12 h-12 relative rounded-md overflow-hidden">
                          <Image
                            src={nft.metadata?.image || "/placeholder.svg"}
                            alt={nft.metadata?.name || "NFT"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{nft.metadata?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Minteado hace {Math.floor(Math.random() * 30) + 1} días
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`https://explorer.solana.com/address/${nft.mint}?cluster=devnet`} target="_blank">
                            Ver
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No hay actividad reciente para mostrar.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
