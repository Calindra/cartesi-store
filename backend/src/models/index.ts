import type { Address } from "viem";

export interface Transaction {
  from: Address;
  to: Address;
  contract: Address;
  tokenId: bigint;
  coin: Address;
  amount: bigint;
  // or maybe string
  date: Date;
  categoryId: number;
  categoryName: string;
  collectionName: string;

  getNFT(): Promise<NFT>;
  getCoin(): Promise<Coin>;
  getWallet(): Promise<Wallet>;
}

export interface NFT {
  tokenId: bigint;
}

export interface Collection {
  address: Address;
  name: string;
  getNFTs(): Promise<NFT[]>;
}

export interface Wallet {
  address: Address;
}

export interface Coin {
  address: Address;
}

export interface Category {
    id: number;
    name: string;
}

export interface Store {
  listCollections(): Promise<Collection[]>;
}
