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

// Precio de los NFTs en SOL (0.20 SOL)
export const NFT_PRICE_SOL = 0.20;
// Para pruebas en devnet, usamos un valor más bajo para que funcione con wallets de prueba
export const NFT_PRICE_LAMPORTS = 0.0001 * LAMPORTS_PER_SOL; // Solo 0.0001 SOL para pruebas

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
