import { useEffect, useState } from "react"
import { BaseLayerWalletService } from "./services/BaseLayerWalletService"
import { SignerService } from "@/services/SignerService"
import { FormatService } from "@/services/FormatService"

export function CartesiWallet() {
    const [balanceL1, setBalanceL1] = useState('0')
    const [balanceL2, setBalanceL2] = useState('0')

    async function init() {
        const signer = await SignerService.getSigner()
        const balanceL1 = await BaseLayerWalletService.balanceEther(signer)
        const formattedL1 = FormatService.formatEther(balanceL1)
        setBalanceL1(formattedL1)

        const res = await fetch(`http://127.0.0.1:8383/wallet/${signer?.address}`)
        const json = await res.json()
        const formattedL2 = FormatService.formatEther(json.ether)
        setBalanceL2(formattedL2)
    }

    useEffect(() => {
        init()
    }, [])

    return <>
        <div>Ethereum balance: {balanceL1}</div>
        <div>Cartesi balance: {balanceL2}</div>
        <div>Voucher balance: ?</div>
    </>
}
