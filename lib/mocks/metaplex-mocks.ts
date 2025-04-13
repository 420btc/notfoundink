/**
 * Implementaciones simuladas de las dependencias de Metaplex
 * Esto es una solución temporal mientras se resuelven los problemas de instalación
 */

// Simulación de @metaplex-foundation/umi
export type Umi = any;
export const publicKey = (value: string | any) => value;
export const sol = (amount: number) => ({ amount });
export const some = <T>(value: T) => ({ value, isSome: true, isNone: false });
export const none = () => ({ isSome: false, isNone: true });
export type TransactionBuilder = any;
export const transactionBuilder = (instructions: any[]) => ({ instructions });
export type Option<T> = { isSome: boolean; isNone: boolean; value?: T };

// Simulación de @metaplex-foundation/umi-bundle-defaults
export const createUmi = (endpoint?: string) => ({
  rpc: { endpoint: endpoint || 'https://api.devnet.solana.com' },
  use: (plugin: any) => ({ rpc: { endpoint: endpoint || 'https://api.devnet.solana.com' }, use: () => ({}) }),
});

// Simulación de @metaplex-foundation/umi-signer-wallet-adapters
export const walletAdapterIdentity = (wallet: any) => ({
  publicKey: wallet.publicKey?.toString(),
  signMessage: async () => new Uint8Array(),
  signTransaction: async () => ({}),
  signAllTransactions: async () => ([]),
});

// Simulación de @metaplex-foundation/mpl-candy-machine
export type CandyMachine = {
  publicKey: string;
  mintAuthority: string;
  collectionMint: string;
  authority: string;
  itemsAvailable: number;
  itemsRedeemed: number;
};

export type CandyGuard = {
  publicKey: string;
  guards: {
    default?: {
      solPayment?: {
        lamports: number;
        destination: string;
      };
      startDate?: {
        date: number;
      };
      botTax?: {
        lamports: number;
        lastInstruction: boolean;
      };
    };
  };
};

export const mplCandyMachine = () => ({});

export const fetchCandyMachine = async (umi: any, candyMachine: any): Promise<CandyMachine> => ({
  publicKey: "NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ",
  mintAuthority: "NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ",
  collectionMint: "NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ",
  authority: "NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ",
  itemsAvailable: 100,
  itemsRedeemed: 20,
});

export const safeFetchCandyGuard = async (umi: any, candyGuard: any): Promise<CandyGuard> => ({
  publicKey: "NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ",
  guards: {
    default: {
      solPayment: {
        lamports: 500000000, // 0.5 SOL
        destination: "NFIcm1D3vR5yJ7FzpTzs2X9YgQPKjH6WqKm4KLZxVnZ",
      },
      startDate: {
        date: Math.floor(Date.now() / 1000) + 86400, // 1 día en el futuro
      },
    },
  },
});

export const mintV2 = async (umi: any, input: any): Promise<any> => ({
  instructions: [],
  signature: "mock-signature",
});
