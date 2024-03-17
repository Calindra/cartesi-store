import { FormatService } from "./FormatService";
import { HttpService } from "./HttpService";

export class TrendingService {
    static async findAll() {
        const trending = await HttpService.get('/trending')
        return trending.data.rows.map((item: any) => {
            return {
                name: item.collectionName,
                floor: FormatService.formatEther(item.floorPrice),
                volume: FormatService.formatEther(item.volume),
                image: `${Math.floor(Math.random() * 10) + 1}.png`
            }
        })
    }
}
