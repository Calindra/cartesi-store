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
            await stmt.finalize()
        }
    }

    async findByCollectionAddressAndTokenId(collection: string, tokenId: BigInt) {
        const stmt = await this.db.prepare(`
            SELECT * FROM nft_product
                WHERE collection = ? and tokenId = ?
            `)
        try {
            const raw = await stmt.get(collection, tokenId.toString())
            if (!raw) {
                return null
            }
            return {
                ...raw,
                currentPrice: BigInt(raw.currentPrice),
                lastSale: BigInt(raw.lastSale),
                tokenId: BigInt(raw.tokenId),
            }
        } catch (e) {
            throw e
        } finally {
            await stmt.finalize()
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
            ?,
            ?
        )`);
        await stmt.run(
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
            nftProduct.status,
        );
        await stmt.finalize();
    }

    async update(nftProduct: NFTProduct) {
        const stmt = await this.db.prepare(`UPDATE nft_product
            SET
                lastSale = ?,
                currentPrice = ?,
                coin = ?,
                endDate = ?,
                categoryId = ?,
                categoryName = ?,
                collectionName = ?,
                owner = ?,
                status = ?
            WHERE collection = ? and tokenId = ?
        `);
        await stmt.run(
            nftProduct.lastSale.toString().padStart(78, '0'),
            nftProduct.currentPrice.toString().padStart(78, '0'),
            nftProduct.coin,
            nftProduct.endDate,
            nftProduct.categoryId,
            nftProduct.categoryName,
            nftProduct.collectionName,
            nftProduct.owner,
            nftProduct.status,

            nftProduct.collection,
            nftProduct.tokenId.toString(),
        );
        await stmt.finalize();
    }

    async createTable() {
        if (!this.db) {
            throw new Error('Missing db')
        }
        await this.db.run(`CREATE TABLE IF NOT EXISTS nft_product (
            lastSale TEXT,
            currentPrice TEXT,

            collection TEXT,
            tokenId TEXT,

            coin TEXT,

            endDate TEXT,

            categoryId INTEGER,
            categoryName TEXT,
            collectionName TEXT,

            owner TEXT,

            status TEXT
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

    status: 'LISTED' | 'UNLISTED'
}
