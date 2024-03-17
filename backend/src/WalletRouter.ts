import { WalletApp } from "@deroll/wallet";
import { Application } from "express";
import { Address } from "viem";


export class WalletRouter {
    static addWalletRoutes(app: Application, wallet: WalletApp, dapp: any) {

        app.get("/wallet/:address", async (req, res) => {
            console.log(`Checking balance ${req.params.address}`)
            const userWallet = await wallet.getWalletOrNew(req.params.address)
            const json = JSON.stringify(userWallet, (_key, value) => {
                if (typeof value === 'bigint') {
                    return value.toString()
                } else if (typeof value === 'object' && value instanceof Map) {
                    return Object.fromEntries(value)
                } else if (typeof value === 'object' && value instanceof Set) {
                    return [...value]
                } else {
                    return value
                }
            })
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.send(json)
        })

        app.post("/wallet/ether/withdraw", async (req, res) => {
            try {
                const msgSender = req.get('x-msg_sender')
                if (!msgSender) {
                    throw new Error('Missing message sender')
                }
                const voucher = await wallet.withdrawEther(
                    msgSender as Address,
                    BigInt(req.body.amount)
                )
                const voucherResult = await dapp.createVoucher(voucher)
                res.send({
                    voucherResult, inputIndex: req.get('x-input_index')
                })
            } catch (e) {
                // Here, we need to detect the type of error to send the appropriate status.
                if (e instanceof Error) {
                    res.status(400).send({ message: e.message })
                } else {
                    res.status(500).send({ message: 'Unexpected error' })
                }
            }
        })

        app.post("/wallet/erc-721/withdraw", async (req, res) => {
            try {
                const voucher = await wallet.withdrawERC721(
                    req.body.token,
                    req.get('x-msg_sender') as Address,
                    BigInt(req.body.tokenId)
                )
                const voucherResult = await dapp.createVoucher(voucher)
                res.send({
                    ok: 1, voucherResult, inputIndex: req.get('x-input_index')
                })
            } catch (e) {
                // Here, we need to detect the type of error to send the appropriate status.
                if (e instanceof Error) {
                    res.status(400).send({ message: e.message })
                } else {
                    res.status(500).send({ message: 'Unexpected error' })
                }
            }
        })

        app.post("/wallet/erc-1155/withdraw", async (req, res) => {
            try {
                const voucher = await wallet.withdrawERC1155(
                    req.body.token,
                    req.get('x-msg_sender') as Address,

                    // deepcode ignore HTTPSourceWithUncheckedType: doing the type validation
                    req.body.tokenIds.map((id: string) => {
                        if (typeof id !== 'number') {
                            throw new Error('BadRequest')
                        }
                        return BigInt(id)
                    }),

                    // deepcode ignore HTTPSourceWithUncheckedType: doing the type validation
                    req.body.values.map((value: string) => {
                        if (typeof value !== 'number') {
                            throw new Error('BadRequest')
                        }
                        return BigInt(value)
                    }),
                )

                const voucherResult = await dapp.createVoucher(voucher)
                res.send({
                    ok: 1, voucherResult, inputIndex: req.get('x-input_index')
                })
            } catch (e) {
                // Here, we need to detect the type of error to send the appropriate status.
                if (e instanceof Error) {
                    res.status(400).send({ message: e.message })
                } else {
                    res.status(500).send({ message: 'Unexpected error' })
                }
            }
        })
    }

}
