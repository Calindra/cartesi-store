import { createWallet } from "@deroll/wallet";
import { it, describe, expect, beforeEach, afterEach } from "vitest";
import { WalletRepository } from "../../src/repository/WalletRepository";
import { toJSON } from "../../src/JSONSerializer";

describe("WalletRepository", () => {

    it("should save and load the wallet with ethers", async () => {
        const wallet = createWallet()
        const walletRepository = new WalletRepository()
        walletRepository.jsonFilePath = './data/wallet-test.json'
        const userWallet = WalletRepository.findOrCreate(wallet, 'some-wallet')
        userWallet.ether = BigInt('123123123123')
        await walletRepository.update(wallet)

        const walletRead = createWallet()
        await walletRepository.load(walletRead)
        expect(toJSON(walletRead)).toEqual(toJSON(wallet))
    })

    it("should save and load the wallet with ERC-20", async () => {
        const wallet = createWallet()
        const walletRepository = new WalletRepository()
        walletRepository.jsonFilePath = './data/wallet-test.json'
        const userWallet = WalletRepository.findOrCreate(wallet, 'some-wallet')
        userWallet.erc20['0x12345'] = BigInt(1010)
        await walletRepository.update(wallet)

        const walletRead = createWallet()
        await walletRepository.load(walletRead)
        expect(toJSON(walletRead)).toEqual(toJSON(wallet))
    })

    it("should save and load the wallet with ERC-721", async () => {
        const wallet = createWallet()
        const walletRepository = new WalletRepository()
        walletRepository.jsonFilePath = './data/wallet-test.json'
        const userWallet = WalletRepository.findOrCreate(wallet, 'some-wallet')
        userWallet.erc721['0x123456'] = new Set([BigInt(101010)])
        await walletRepository.update(wallet)

        const walletRead = createWallet()
        await walletRepository.load(walletRead)
        expect(toJSON(walletRead)).toEqual(toJSON(wallet))
    })

    it("should save and load the wallet with ERC-1155", async () => {
        const wallet = createWallet()
        const walletRepository = new WalletRepository()
        walletRepository.jsonFilePath = './data/wallet-test.json'
        const userWallet = WalletRepository.findOrCreate(wallet, 'some-wallet')
        const erc1155tokens = new Map()
        erc1155tokens.set(BigInt(1), BigInt(12))
        userWallet.erc1155['0x123'] = erc1155tokens
        await walletRepository.update(wallet)

        const walletRead = createWallet()
        await walletRepository.load(walletRead)
        expect(toJSON(walletRead)).toEqual(toJSON(wallet))
    })


})