
const etherInWei = BigInt(10) ** BigInt(18);
const showAsEtherGTE = BigInt(10) ** BigInt(16);

export class FormatService {
    static formatEther(amount: any) {
        if (!amount) return ""
        amount = BigInt(amount)

        if (amount >= showAsEtherGTE) {
            const formattedAmount = (Number(amount) / Number(etherInWei)).toFixed(2);
            return formattedAmount + ' ETH';
        } else {
            return amount.toString() + ' WEI';
        }
    }

    static convertIpfsToHttp(url: string, prefix: string) {
        const hash = url.slice(prefix.length)
        return `https://ipfs.io/ipfs/${hash}`
    }
}