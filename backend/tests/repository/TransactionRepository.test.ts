import { unlink } from "node:fs/promises";
import { it, describe, expect, beforeEach } from "vitest";
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { NFTTransaction, TransactionRepository } from "../../src/repository/TransactionRepository";
import { afterEach } from "node:test";

describe("TransactionRepository", () => {
    let db: Database<sqlite3.Database, sqlite3.Statement>
    let transactionRepository: TransactionRepository

    const nftTx: NFTTransaction = {
        from: "0xbOb",
        to: "0xA11ce",
        collection: "0xB04ed",
        tokenId: BigInt('1'),
        coin: "",
        amount: BigInt(123),
        date: new Date().toISOString(),
        categoryId: 0,
        categoryName: "",
        collectionName: "Bored"
    }

    beforeEach(async () => {
        await unlink('./data/sqlite3-test.db').catch(e => e)
        db = await open({
            filename: './data/sqlite3-test.db',
            driver: sqlite3.Database // Import from the sqlite3 package
        });
        transactionRepository = new TransactionRepository(db);
        await transactionRepository.createTable()
    })

    afterEach(() => {
        db.close();
    })

    it("should create a transaction", async () => {
        await transactionRepository.create(nftTx)
    })

    it("should return the trending", async () => {
        for (let i = 0; i < 10; i++) {
            const oldTransaction = { ...nftTx, amount: BigInt(10 - i), date: '2023-01-01' }
            await transactionRepository.create(oldTransaction)
            const nonRelevant = { ...nftTx, collectionName: `NR ${i}`, amount: BigInt(1) }
            await transactionRepository.create(nonRelevant)
            const nftBored = { ...nftTx, amount: BigInt(10 - i) }
            await transactionRepository.create(nftBored)
            const nftTxX = { ...nftTx, amount: BigInt(100 - i), collectionName: 'Cartesi Store' }
            await transactionRepository.create(nftTxX)
        }
        const trending = await transactionRepository.findAllTrending({
            dateGt: '2024',
            limit: 5
        })
        expect(trending[0].volume).toBe(955)
        expect(+trending[0].floorPrice).toBe(91)
        expect(trending[1].volume).toBe(55)
        expect(+trending[1].floorPrice).toBe(1)
        expect(trending.length).toBe(5)
    })
})