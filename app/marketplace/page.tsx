"use client"

import { useState } from "react"
import Image from "next/image"
import { useWallet } from "@/components/wallet-provider"
import { NFTMarketplace } from "@/components/nft-marketplace"

export default function MarketplacePage() {
  return (
    <div className="relative">
      {/* Fondo con patrón de perros y gatos */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/dogs-cats-pattern.jpeg"
          alt="Fondo de perros y gatos"
          fill
          className="object-cover blur-[2px] opacity-30"
        />
      </div>

      <div className="container py-10 relative z-10">
        <div className="relative mb-6">
          <span className="absolute -top-6 -left-6 text-2xl animate-float-slow">✨</span>
          <h1 className="font-cartoon text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
            Marketplace
          </h1>
        </div>
        <p className="text-lg mb-10 max-w-3xl">
          Explora, compra y vende NFTs de la colección "Not Found Ink". Cada NFT es único y representa el estilo 
          característico de Ana María, mezclando Los Simpson, Futurama y Shin Chan con toques japoneses.
        </p>

        <NFTMarketplace />
      </div>
    </div>
  )
}
