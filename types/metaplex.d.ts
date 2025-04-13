declare module '@metaplex-foundation/umi' {
  export type Umi = any;
  export function publicKey(value: string | any, validate?: boolean): any;
  export function sol(amount: number): any;
  export function some<T>(value: T): any;
  export const none: () => any;
  export type TransactionBuilder = any;
  export function transactionBuilder(instructions: any[]): any;
  export type Option<T> = any;
  export type OptionOrNullable<T> = any;
  export const ACCOUNT_HEADER_SIZE: number;
}

// Definición para @/hooks/use-candy-machine
declare module '@/hooks/use-candy-machine' {
  import { CandyMachine, CandyGuard } from '@metaplex-foundation/mpl-candy-machine';
  
  export type CandyMachineState = {
    itemsAvailable: number;
    itemsRedeemed: number;
    itemsRemaining: number;
    price: number;
    isActive: boolean;
    goLiveDate: Date | null;
    isLoading: boolean;
    error: string | null;
  };
  
  export function useCandyMachine(): {
    candyMachine: CandyMachine | null;
    candyGuard: CandyGuard | null;
    isLoading: boolean;
    error: string | null;
    isMinting: boolean;
    mintSuccess: boolean;
    txId: string | null;
    mint: () => Promise<void>;
    itemsAvailable: number;
    itemsRedeemed: number;
    itemsRemaining: number;
    price: number;
    isActive: boolean;
    goLiveDate: Date | null;
  };
}

declare module '@metaplex-foundation/umi-bundle-defaults' {
  import { Umi } from '@metaplex-foundation/umi';
  export function createUmi(endpoint?: string): Umi;
}

// Definición para nuestra implementación simulada
declare module '@/lib/mocks/metaplex-mocks' {
  export type Umi = any;
  export function publicKey(value: string | any): any;
  export function sol(amount: number): any;
  export function some<T>(value: T): any;
  export const none: () => any;
  export type TransactionBuilder = any;
  export function transactionBuilder(instructions: any[]): any;
  export type Option<T> = { isSome: boolean; isNone: boolean; value?: T };
  export function createUmi(endpoint: string): any;
  export function walletAdapterIdentity(wallet: any): any;
  export function mplCandyMachine(): any;
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
  export function fetchCandyMachine(umi: any, candyMachine: any): Promise<CandyMachine>;
  export function safeFetchCandyGuard(umi: any, candyGuard: any): Promise<CandyGuard>;
  export function mintV2(umi: any, input: any): Promise<any>;
}

declare module '@metaplex-foundation/umi-signer-wallet-adapters' {
  import { Umi } from '@metaplex-foundation/umi';
  import { WalletAdapter } from '@solana/wallet-adapter-base';
  export function walletAdapterIdentity(wallet: WalletAdapter): any;
}

declare module '@metaplex-foundation/mpl-candy-machine' {
  import { Umi, TransactionBuilder, Option } from '@metaplex-foundation/umi';
  
  export function mplCandyMachine(): any;
  
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
  
  export function fetchCandyMachine(
    umi: Umi,
    candyMachine: any
  ): Promise<CandyMachine>;
  
  export function safeFetchCandyGuard(
    umi: Umi,
    candyGuard: any
  ): Promise<CandyGuard>;
  
  export function mintV2(
    umi: Umi,
    input: {
      candyMachine: any;
      candyGuard?: any;
      nftMint: any;
      collectionMint: any;
      collectionUpdateAuthority: any;
      mintArgs?: any;
      group?: Option<string>;
    }
  ): Promise<TransactionBuilder>;
}

declare module '@/hooks/use-toast' {
  export function useToast(): {
    toast: (props: {
      title?: string;
      description?: string;
      variant?: 'default' | 'destructive';
    }) => void;
  };
}
