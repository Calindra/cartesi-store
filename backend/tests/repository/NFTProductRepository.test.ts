import { unlink } from "node:fs/promises";
import { it, describe, expect, beforeEach } from "vitest";
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { NFTProduct } from "../../src/repository/NFTProductRepository";
import { afterEach } from "node:test";
import { NFTProductRepository } from "../../src/repository/NFTProductRepository";

describe("NFTProductRepository", () => {
    let db: Database<sqlite3.Database, sqlite3.Statement>
    let nftProductRepository: NFTProductRepository

    const nftProduct: NFTProduct = {
        collection: "0xB04ed",
        tokenId: BigInt('1'),
        lastSale: BigInt('1'),
        currentPrice: BigInt('1'),
        coin: "",

        endDate: new Date().toISOString(),
        categoryId: 0,
        categoryName: "",
        collectionName: "Bored",
        owner: "0xOwner"
    }

    beforeEach(async () => {
        // await unlink('./data/sqlite3-test.db').catch(e => e)
        db = await open({
            filename: ':memory:',
            driver: sqlite3.Database // Import from the sqlite3 package
        });
        nftProductRepository = new NFTProductRepository(db);
        await nftProductRepository.createTable()
    })

    afterEach(() => {
        db.close();
    })

    it("should create a NFTProduct", async () => {
        await nftProductRepository.create(nftProduct)
        const created = await nftProductRepository.findByCollectionAddressAndTokenId(nftProduct.collection, nftProduct.tokenId)
        expect(created).toEqual(nftProduct)
    })

    it("should find all by collection", async() => {
        await nftProductRepository.create({...nftProduct, collection: '0x123'})
        await nftProductRepository.create(nftProduct)
        const products = await nftProductRepository.findAllByCollection(nftProduct.collection)

        expect(products.length).toEqual(1)
        expect(products[0]).toEqual(nftProduct)
    })

})
