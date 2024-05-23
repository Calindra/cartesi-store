import { createPublicClient, http, getContract } from 'viem'
import { anvil } from 'viem/chains'
import { abi } from '../utils/abi/abi'

export class EthereumClient {
    private client

    constructor() {
        this.client = this.createClient()
    }

    private createClient() {
        return createPublicClient({
            chain: anvil,
            transport: http(),
        })
    }

    async getContract(address: `0x${string}`) {
        const contract = await getContract({
            address: address,
            abi: abi,
            client: this.client,
        })

        return contract
    }


}