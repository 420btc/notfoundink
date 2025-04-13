import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

// Dirección del destinatario (wallet del usuario)
// Esta es la wallet real del usuario para que pueda verificar la transacción
const RECIPIENT_ADDRESS = '3YgATFoU9ZzHJkcnu23bUV5YE1gT78kQcNxjmizxp4Nv';

// Precio de los NFTs en SOL (0.20 SOL)
export const NFT_PRICE_SOL = 0.20;
export const NFT_PRICE_LAMPORTS = NFT_PRICE_SOL * LAMPORTS_PER_SOL;

// Función para crear y enviar una transacción
export async function sendSolanaTransaction(
  connection: Connection,
  fromWallet: any, // Wallet del usuario
  amount: number = NFT_PRICE_LAMPORTS
): Promise<string> {
  try {
    console.log('Iniciando transacción con wallet:', fromWallet.publicKey.toString());
    console.log('Monto a enviar:', amount, 'lamports (', amount / LAMPORTS_PER_SOL, 'SOL)');
    
    // Verificar que la wallet esté conectada
    if (!fromWallet.publicKey) {
      throw new Error('Wallet no conectada');
    }

    // Verificar el balance antes de la transacción
    const balance = await connection.getBalance(fromWallet.publicKey);
    console.log('Balance actual:', balance / LAMPORTS_PER_SOL, 'SOL');
    
    if (balance < amount) {
      throw new Error(`Balance insuficiente. Tienes ${balance / LAMPORTS_PER_SOL} SOL pero necesitas ${amount / LAMPORTS_PER_SOL} SOL`);
    }

    // Crear la transacción
    const transaction = new Transaction();
    
    // Añadir la instrucción de transferencia
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey: new PublicKey(RECIPIENT_ADDRESS),
        lamports: amount,
      })
    );

    // Obtener el blockhash reciente
    const { blockhash } = await connection.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromWallet.publicKey;

    console.log('Transacción creada, solicitando firma...');
    
    // Enviar la transacción para ser firmada por la wallet
    // Phantom y otras wallets modernas usan signAndSendTransaction
    if (fromWallet.signAndSendTransaction) {
      console.log('Usando signAndSendTransaction...');
      const { signature } = await fromWallet.signAndSendTransaction(transaction);
      console.log('Transacción enviada con firma:', signature);
      
      // Esperar a que la transacción se confirme
      await connection.confirmTransaction(signature, 'confirmed');
      console.log('Transacción confirmada');
      
      return signature;
    } 
    // Método alternativo para wallets que no soportan signAndSendTransaction
    else if (fromWallet.signTransaction) {
      console.log('Usando signTransaction...');
      const signedTransaction = await fromWallet.signTransaction(transaction);
      console.log('Transacción firmada, enviando...');
      
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      console.log('Transacción enviada con firma:', signature);
      
      // Esperar a que la transacción se confirme
      await connection.confirmTransaction(signature, 'confirmed');
      console.log('Transacción confirmada');
      
      return signature;
    } else {
      throw new Error('La wallet no soporta los métodos necesarios para firmar transacciones');
    }
  } catch (error) {
    console.error('Error en la transacción:', error);
    throw error;
  }
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
    // Añadir las 11 imágenes de la colección
  ];
}

// Función para seleccionar un NFT aleatorio
export function getRandomNFT() {
  const collection = getNFTCollection();
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}
