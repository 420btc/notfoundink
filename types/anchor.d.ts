declare module '@project-serum/anchor' {
  import { PublicKey, Transaction, ConfirmOptions } from '@solana/web3.js';

  export class BN {
    constructor(value: number | string | BN, base?: number);
    toNumber(): number;
    toString(): string;
  }

  export interface Wallet {
    publicKey: PublicKey;
    signTransaction(tx: Transaction): Promise<Transaction>;
    signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
  }
}

declare module '@solana/spl-token' {
  import { PublicKey, Connection, TransactionInstruction } from '@solana/web3.js';
  
  export function getAssociatedTokenAddress(
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve?: boolean,
    programId?: PublicKey,
    associatedTokenProgramId?: PublicKey
  ): Promise<PublicKey>;
  
  export function createAssociatedTokenAccountInstruction(
    payer: PublicKey,
    associatedToken: PublicKey,
    owner: PublicKey,
    mint: PublicKey,
    programId?: PublicKey,
    associatedTokenProgramId?: PublicKey
  ): TransactionInstruction;
}
