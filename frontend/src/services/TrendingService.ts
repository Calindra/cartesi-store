import { FormatService } from "./FormatService";
import { HttpService } from "./HttpService";

export class TrendingService {
    static async findAll() {
        const trending = await HttpService.get('/trending')
        return trending.data.rows.map((item: any) => {
            console.log(JSON.stringify(item, null, 4))
            return {
                collection: item.collection,
                name: item.collectionName,
                floor: FormatService.formatEther(item.floorPrice),
                volume: FormatService.formatEther(item.volume),
                image: `${item.tokenId}.png`
            }
        })
    }
}
