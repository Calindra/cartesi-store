import { WalletApp } from "@deroll/wallet";
import { NFTProduct, NFTProductRepository } from "../repository/NFTProductRepository";
import { Address, getAddress } from "viem";
import { NFTTransaction, TransactionRepository } from "../repository/TransactionRepository";
import { WalletRepository } from "../repository/WalletRepository";
import { toJSON } from "../JSONSerializer";


export interface TrendingArgs {
    timePeriod: '1h' | '6h' | '24h' | '7d'
}

export class NFTProductService {

    constructor(private nftProductRepository: NFTProductRepository, 
        private walletRepository: WalletRepository,
        private transactionRepository: TransactionRepository) {

    }

    async create(nft: NFTProduct) {
        await this.nftProductRepository.create(nft)
    }

    async findAllTrending(args: TrendingArgs) {

    }

    findByCollectionAddressAndTokenId(collection: string, tokenId: BigInt) {
        return this.nftProductRepository.findByCollectionAddressAndTokenId(collection, tokenId)
    }

    async list(nft: NFTProduct, wallet: WalletApp) {
        if (!nft) {
            throw new Error(`Missing NFT`)
        }
        await wallet.transferERC721(
            nft.collection.toString() as Address,
            nft.owner,
            `${nft.owner}:list`.toLowerCase() as Address,
            BigInt(nft.tokenId.toString())
        )
        const dbNft = await this.nftProductRepository.findByCollectionAddressAndTokenId(nft.collection.toString(), BigInt(nft.tokenId.toString()))
        if (dbNft) {
            if (dbNft.owner !== nft.owner) {
                throw new Error(`Forbidden`)
            }
            await this.nftProductRepository.update({ ...nft, lastSale: dbNft.lastSale, status: 'LISTED' })
        } else {
            await this.nftProductRepository.create(nft)
        }
        await this.walletRepository.update(wallet)
    }

    async buyNFT(nft: NFTProduct, buyer: string, wallet: WalletApp) {
        if (!nft) {
            throw new Error(`Missing NFT`)
        }
        const tokenAddress = getAddress(nft.collection.toString())
        const escrow = `${nft.owner}:list`.toLowerCase() as Address
        const listWallet = await wallet.getWalletOrNew(escrow)
        console.log(toJSON(listWallet.erc721.get(tokenAddress) || {}))
        await wallet.transferERC721(
            tokenAddress,
            escrow,
            buyer,
            BigInt(nft.tokenId.toString())
        )
        await wallet.transferEther(
            buyer,
            nft.owner,
            BigInt(nft.currentPrice.toString())
        )
        await this.nftProductRepository.update({ ...nft, lastSale: nft.currentPrice, owner: buyer, status: 'UNLISTED' })

        const nftTx: NFTTransaction = {
            from: nft.owner,
            to: buyer,
            collection: nft.collection,
            tokenId: nft.tokenId,
            coin: nft.coin,
            amount: nft.currentPrice,
            date: new Date().toISOString(),
            categoryId: nft.categoryId,
            categoryName: nft.categoryName,
            collectionName: nft.categoryName
        }
        await this.transactionRepository.create(nftTx)
        await this.walletRepository.update(wallet)
    }
}
