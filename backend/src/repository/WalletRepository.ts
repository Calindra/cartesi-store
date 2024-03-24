import { WalletApp } from "@deroll/wallet";
import { toJSON } from "../JSONSerializer";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Address } from "viem";

export class WalletRepository {

    jsonFilePath: string = path.join('data', 'wallets.json')

    async load(derollWallet: WalletApp) {
        const content = await readFile(this.jsonFilePath, 'utf-8')
        const json = JSON.parse(content)
        for (const walletAddress in json.wallets) {
            const userWallet = derollWallet.getWalletOrNew(walletAddress)
            const jsonWallet = json.wallets[walletAddress] as JSONWallet
            userWallet.ether = BigInt(jsonWallet.ether)
            for (const erc20 in jsonWallet.erc20) {
                const erc20Address = erc20 as Address
                const amount = jsonWallet.erc20[erc20Address] ?? '0'
                if (amount !== '0') {
                    userWallet.erc20.set(erc20Address, BigInt(amount))
                }
            }
            for (const erc721 in jsonWallet.erc721) {
                const erc721Address = erc721 as Address
                const tokens = new Set(jsonWallet.erc721[erc721]?.map(x => BigInt(x)))
                userWallet.erc721.set(erc721Address, tokens)
            }
            for (const erc1155Address in jsonWallet.erc1155) {
                const jsonTokens = jsonWallet.erc1155[erc1155Address]
                const userTokens = new Map()
                for (const tokenId in jsonTokens) {
                    if (jsonTokens[tokenId] !== '0') {
                        userTokens.set(BigInt(tokenId), BigInt(jsonTokens[tokenId] ?? '0'))
                    }
                }
                userWallet.erc1155.set(erc1155Address as Address, userTokens)
            }
        }
    }

    async update(wallet: WalletApp) {
        const content: string = toJSON(wallet)
        await writeFile(this.jsonFilePath, content)
    }

}

export interface JSONWallet {
    ether: string
    erc20: Record<string, string>
    erc721: Record<string, string[]>
    erc1155: Record<string, Record<string, string>>
}