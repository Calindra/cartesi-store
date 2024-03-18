import { NFT } from "../models";


export interface TrendingArgs {
    timePeriod: '1h' | '6h' | '24h' | '7d'
}

export class NFTService {
    async create(nft: NFT) {
        
    }

    async findAllTrending(args: TrendingArgs) {

    }
}
