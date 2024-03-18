import type { Address } from "viem";
import { NFT, Store, Transaction, Wallet, Collection, Coin, Category } from ".";

export class MockStore implements Store {
  async listCollections(): Promise<Collection[]> {
    return [];
  }
}

export class NFTMock implements NFT {
  constructor(public tokenId: bigint) {}
}

export class TransactionMock implements Transaction {
  constructor(
    public readonly from: Address,
    public readonly to: Address,
    public readonly contract: Address,
    public readonly tokenId: bigint,
    public readonly coin: Address,
    public readonly amount: bigint,
    public readonly date: Date,
    public readonly categoryId: number,
    public readonly categoryName: string,
    public readonly collectionName: string
  ) {}

  getNFT(): Promise<NFT> {
    throw new Error("Method not implemented.");
  }
  getCoin(): Promise<Coin> {
    throw new Error("Method not implemented.");
  }
  getWallet(): Promise<Wallet> {
    throw new Error("Method not implemented.");
  }
}
export class WalletMock implements Wallet {
  address: Address;

  constructor(props: { address: Address }) {
    this.address = props.address;
  }
}
export class CollectionMock implements Collection {
  address: Address;
  name: string;

  constructor(props: { address: Address; name: string }) {
    this.address = props.address;
    this.name = props.name;
  }
  getNFTs(): Promise<NFT[]> {
    throw new Error("Method not implemented.");
  }
}
export class CoinMock implements Coin {
  address: Address;
  constructor(props: { address: Address }) {
    this.address = props.address;
  }
}
export class CategoryMock implements Category {
  id: number;
  name: string;

  constructor(props: { id: number; name: string }) {
    this.id = props.id;
    this.name = props.name;
  }
}
