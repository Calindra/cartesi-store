import { FormatService } from '@/services/FormatService'
import { EthereumClient } from '../services/EthereumClient'
const ethereumClient = new EthereumClient()
const contract = await ethereumClient.getContract('0x0724F18B2aA7D6413D3fDcF6c0c27458a8170Dd9')

export async function metadataLoader() {
    const nftDataList = []
    for (let idx = 0; idx < 11; idx++) {
        const id: bigint = BigInt(idx)
        const uri: any = await contract.read.tokenURI([id])
        const res = await fetch(uri)

        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        const json = await res.json()
        const imageUrl = json.image
        const prefix = "ipfs://"
        if (imageUrl.startsWith(prefix)) {
            json.image = FormatService.convertIpfsToHttp(imageUrl, prefix)
        }
        nftDataList.push(json)
    }
    return nftDataList
}