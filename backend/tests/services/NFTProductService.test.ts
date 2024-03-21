import { WalletApp, createWallet } from "@deroll/wallet";
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { it, describe, expect, beforeEach, afterEach } from "vitest";
import { NFTProductService } from "../../src/services/NFTProductService";
import { NFTProduct, NFTProductRepository } from "../../src/repository/NFTProductRepository";
import { TransactionRepository } from "../../src/repository/TransactionRepository";

describe("NFTProductService", () => {
    let db: Database<sqlite3.Database, sqlite3.Statement>
    let nftProductRepository: NFTProductRepository
    let nftProductService: NFTProductService
    let transactionRepository: TransactionRepository

    beforeEach(async () => {
        db = await open({
            filename: ':memory:',
            driver: sqlite3.Database // Import from the sqlite3 package
        });
        transactionRepository = new TransactionRepository(db);
        await transactionRepository.createTable()
        nftProductRepository = new NFTProductRepository(db);
        await nftProductRepository.createTable()
        nftProductService = new NFTProductService(nftProductRepository, transactionRepository)
    })

    afterEach(async () => {
        await db.close();
    })

    describe("buy a NFT journey", () => {
        const sellerAddress = 'seller:list'
        let wallet: WalletApp
        const buyer = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
        const nftProduct: NFTProduct = {
            lastSale: BigInt(0),
            currentPrice: BigInt(100),
            collection: '0x0000000000000000000000000000000000000123',
            tokenId: BigInt(1),
            owner: "seller",
            coin: "",
            endDate: "",
            categoryId: 0,
            categoryName: "",
            collectionName: "",
            status: 'LISTED',
        }

        beforeEach(async () => {
            wallet = createWallet()
            const sellerList = await wallet.getWalletOrNew(sellerAddress)
            sellerList.erc721.set('0x0000000000000000000000000000000000000123', new Set([BigInt(1)]))

            // add some funds in the buyer wallet
            const buyerWallet = await wallet.getWalletOrNew(buyer)
            buyerWallet.ether = 1000n

            await nftProductService.create(nftProduct)
        })

        it("should debit the buyer", async () => {
            await nftProductService.buyNFT(nftProduct, buyer, wallet)

            // check the ether value on the buyer's wallet
            const buyerWallet = await wallet.getWalletOrNew(buyer)
            expect(buyerWallet.ether).toEqual(900n)

            // check the unlisted NFT
            const updatedProduct = await nftProductService.findByCollectionAddressAndTokenId(nftProduct.collection, nftProduct.tokenId)
            expect(updatedProduct.owner).toEqual(buyer)
            expect(updatedProduct.status).toEqual('UNLISTED')
        })

        it("should send money to seller", async () => {
            await nftProductService.buyNFT(nftProduct, buyer, wallet)

            // check the balance on the seller's wallet
            const sellerWallet = await wallet.getWalletOrNew('seller')
            expect(sellerWallet.ether).toEqual(100n)
        })

        it("should change the owner and the status to unlisted", async () => {
            await nftProductService.buyNFT(nftProduct, buyer, wallet)

            // check the unlisted NFT
            const updatedProduct = await nftProductService.findByCollectionAddressAndTokenId(nftProduct.collection, nftProduct.tokenId)
            expect(updatedProduct.owner).toEqual(buyer)
            expect(updatedProduct.status).toEqual('UNLISTED')
        })

        it("should create one transaction", async () => {
            await nftProductService.buyNFT(nftProduct, buyer, wallet)
            const transactions = await transactionRepository.findAllTrending({dateGt: '2000-01-01'})
            expect(transactions.length).toEqual(1)
        })
    })

})
