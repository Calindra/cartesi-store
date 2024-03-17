import { Database } from "sqlite";
import sqlite3 from 'sqlite3';

export class NFTProductRepository {

    constructor(private db: Database<sqlite3.Database, sqlite3.Statement>) {

    }

    async findAllByCollection(collection: string) {
        const stmt = await this.db.prepare(`
            SELECT * FROM nft_product
                WHERE collection = ?
            `)
        try {
            const items = await stmt.all(collection)
            return items.map(raw => {
                return {
                    ...raw,
                    currentPrice: BigInt(raw.currentPrice),
                    lastSale: BigInt(raw.lastSale),
                    tokenId: BigInt(raw.tokenId),
                }
            })
        } catch (e) {
            throw e
        } finally {
            stmt.finalize()
        }
    }

    async findByCollectionAddressAndTokenId(collection: string, tokenId: BigInt) {
        const stmt = await this.db.prepare(`
            SELECT * FROM nft_product
                WHERE collection = ? and tokenId = ?
            `)
        try {
            const raw = await stmt.get(collection, tokenId.toString())
            return {
                ...raw,
                currentPrice: BigInt(raw.currentPrice),
                lastSale: BigInt(raw.lastSale),
                tokenId: BigInt(raw.tokenId),
            }
        } catch (e) {
            throw e
        } finally {
            stmt.finalize()
        }
    }

    async create(nftProduct: NFTProduct) {
        const stmt = await this.db.prepare(`INSERT INTO nft_product VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )`);
        stmt.run(
            nftProduct.lastSale.toString().padStart(78, '0'),
            nftProduct.currentPrice.toString().padStart(78, '0'),
            nftProduct.collection,
            nftProduct.tokenId.toString(),
            nftProduct.coin,
            nftProduct.endDate,
            nftProduct.categoryId,
            nftProduct.categoryName,
            nftProduct.collectionName,
            nftProduct.owner,
        );
        stmt.finalize();
    }

    async createTable() {
        if (!this.db) {
            throw new Error('Missing db')
        }
        await this.db.run(`CREATE TABLE nft_product (
            lastSale TEXT,
            currentPrice TEXT,

            collection TEXT,
            tokenId TEXT,

            coin TEXT,

            endDate TEXT,

            categoryId INTEGER,
            categoryName TEXT,
            collectionName TEXT,

            owner TEXT
        )`);
    }
}

export interface NFTProduct {
    lastSale: BigInt
    currentPrice: BigInt

    /**
     * Address
     */
    collection: string
    tokenId: BigInt

    coin: string

    endDate: string

    categoryId: number
    categoryName: string
    collectionName: string

    owner: string
}
