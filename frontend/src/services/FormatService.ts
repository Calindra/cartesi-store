
export class FormatService {
    static formatEther(amount: any) {
        amount = BigInt(amount)
        const etherInWei = BigInt(10) ** BigInt(16); // may 18
        if (amount >= etherInWei) {
            const formattedAmount = (Number(amount) / Number(etherInWei)).toFixed(2);
            return formattedAmount + ' ETH';
        } else {
            return amount.toString() + ' WEI';
        }
    }
}