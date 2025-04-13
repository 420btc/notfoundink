/**
 * Configuración para la Candy Machine v3
 * Este archivo contiene las configuraciones necesarias para interactuar con la Candy Machine
 */

// ID de la Candy Machine (debe configurarse en .env.local)
export const CANDY_MACHINE_ID = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || ''

// Configuración de la red de Solana
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
export const SOLANA_RPC_ENDPOINT = 
  process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || 
  (SOLANA_NETWORK === 'mainnet-beta' 
    ? 'https://api.mainnet-beta.solana.com' 
    : 'https://api.devnet.solana.com')

// Configuración de la colección
export const COLLECTION_NAME = 'Not Found Ink'
export const COLLECTION_DESCRIPTION = 'Colección de NFTs con un estilo artístico que mezcla Los Simpson, Futurama y Shin Chan con toques japoneses.'

// Configuración de la Candy Machine
export const DEFAULT_GUARD_GROUP = 'default'

// Configuración de la UI
export const UI_ELEMENTS = {
  // Colores principales (corresponden a las clases de Tailwind en tailwind.config.js)
  colors: {
    primary: 'nfi-pink',
    secondary: 'nfi-blue',
    accent: 'nfi-yellow',
  },
  
  // Mensajes personalizados
  messages: {
    mintSuccess: '¡Enhorabuena! Has minteado tu NFT con éxito.',
    mintError: 'Ha ocurrido un error al mintear tu NFT. Por favor, inténtalo de nuevo.',
    walletNotConnected: 'Conecta tu wallet para mintear un NFT.',
    notLive: 'El minteo aún no está activo. Vuelve más tarde.',
    soldOut: 'Todos los NFTs han sido minteados. ¡La colección está agotada!',
  }
}

// Función para validar la configuración
export function validateConfig() {
  const missingEnvVars = []
  
  if (!CANDY_MACHINE_ID) {
    missingEnvVars.push('NEXT_PUBLIC_CANDY_MACHINE_ID')
  }
  
  if (missingEnvVars.length > 0) {
    console.warn(`⚠️ Faltan variables de entorno: ${missingEnvVars.join(', ')}`)
    return false
  }
  
  return true
}
