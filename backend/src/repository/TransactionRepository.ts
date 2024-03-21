import { Database } from "sqlite";
import sqlite3 from 'sqlite3';

export interface FindAllTrendingArgs {
    dateGt: string,
    limit?: number,
}

export class TransactionRepository {

    constructor(private db: Database<sqlite3.Database, sqlite3.Statement>) {

    }

    async findAllTrending({ dateGt, limit = 10 }: FindAllTrendingArgs) {
        const stmt = await this.db.prepare(`
            SELECT collectionName, min(tokenId) as tokenId, collection, sum(amount) as volume, min(amount) as floorPrice 
                FROM transactions
                WHERE date > ?
                GROUP BY collectionName, collection
                ORDER BY volume DESC
                LIMIT ?
                `)
        try {
            return await stmt.all(dateGt, limit)
        } catch (e) {
            throw e
        } finally {
            await stmt.finalize()
        }
    }

    async create(transaction: NFTTransaction) {
        const stmt = await this.db.prepare(`INSERT INTO transactions VALUES (
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
            transaction.from,
            transaction.to,
            transaction.collection,
            transaction.tokenId.toString(),
            transaction.coin,
            transaction.amount.toString().padStart(78, '0'),
            transaction.date,
            transaction.categoryId,
            transaction.categoryName,
            transaction.collectionName,
        );
        await stmt.finalize();
    }

    async createTable() {
        if (!this.db) {
            throw new Error('Missing db')
        }
        await this.db.run(`CREATE TABLE transactions (
            _from TEXT,
            _to TEXT,

            collection TEXT,
            tokenId TEXT,

            coin TEXT,
            amount TEXT,

            date TEXT,
            categoryId INTEGER,
            categoryName TEXT,
            collectionName TEXT
        )`);
    }
}

export interface NFTTransaction {
    from: string
    to: string

    collection: string
    tokenId: BigInt

    coin: string
    amount: BigInt

    date: string

    categoryId: number
    categoryName: string
    collectionName: string
}
