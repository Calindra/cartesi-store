import type { Address } from "viem";

export interface Transaction {
  readonly from: Address;
  readonly to: Address;
  readonly contract: Address;
  readonly tokenId: bigint;
  readonly coin: Address;
  readonly amount: bigint;
  // or maybe string
  readonly date: Date;
  readonly categoryId: number;
  readonly categoryName: string;
  readonly collectionName: string;

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
