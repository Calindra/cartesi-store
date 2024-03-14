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
  from: Address;
  to: Address;
  contract: Address;
  tokenId: bigint;
  coin: Address;
  amount: bigint;
  date: Date;
  categoryId: number;
  categoryName: string;
  collectionName: string;

  constructor(props: {
    from: Address;
    to: Address;
    contract: Address;
    tokenId: bigint;
    coin: Address;
    amount: bigint;
    date: Date;
    categoryId: number;
    categoryName: string;
    collectionName: string;
  }) {
    this.from = props.from;
    this.to = props.to;
    this.contract = props.contract;
    this.tokenId = props.tokenId;
    this.coin = props.coin;
    this.amount = props.amount;
    this.date = props.date;
    this.categoryId = props.categoryId;
    this.categoryName = props.categoryName;
    this.collectionName = props.collectionName;
  }

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
