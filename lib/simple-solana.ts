import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Keypair
} from '@solana/web3.js';
import bs58 from 'bs58';

// Dirección del destinatario (wallet del usuario)
export const RECIPIENT_ADDRESS = '3YgATFoU9ZzHJkcnu23bUV5YE1gT78kQcNxjmizxp4Nv';

// Precio mostrado en la UI (0.20 SOL)
export const DISPLAY_PRICE_SOL = 0.20;
// Precio real para la transacción (0.15 SOL)
export const NFT_PRICE_SOL = 0.15;
export const NFT_PRICE_LAMPORTS = NFT_PRICE_SOL * LAMPORTS_PER_SOL;

// Función para crear una transacción simple
export async function createSimpleTransaction(fromPubkey: PublicKey): Promise<Transaction> {
  // Crear una transacción básica de transferencia
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey: new PublicKey(RECIPIENT_ADDRESS),
      lamports: NFT_PRICE_LAMPORTS,
    })
  );
  
  return transaction;
}

// Función para obtener la colección de NFTs
export function getNFTCollection() {
  // Colección de imágenes disponibles en el proyecto
  return [
    "/images/trust-me.png",
    "/images/mom-says.png",
    "/images/bart-history.png",
    "/images/butterflies.png",
    "/images/shin-chan.png",
    "/images/homer-computer.png",
    "/images/skull.png",
    "/images/lisa-tv.png",
    "/images/skater-easy.png",
  ];
}

// Función para seleccionar un NFT aleatorio
export function getRandomNFT() {
  const collection = getNFTCollection();
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}
