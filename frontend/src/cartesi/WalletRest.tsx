import { ChangeEvent, useEffect, useState } from "react"
import { Grid } from "@mui/material"
import { FetchFun } from "@calindra/cartesify/src/cartesify/FetchLikeClient"
import { JsonRpcSigner } from "ethers"
import { BaseLayerWalletService } from "./services/BaseLayerWalletService"
import { FormatService } from "@/services/FormatService"
import Collections from "./Collections"
import WalletInfo from "./WalletInfo"
import TokenErc20Card from "./TokenErc20Card"
import EtherCard from "./EtherCard"
import TokenErc721Card from "./TokenErc721Card"


type WalletRestProps = {
    fetch: FetchFun
    getSigner: () => Promise<JsonRpcSigner>
    dappAddress: string
}

export function WalletRest({ getSigner, fetch, dappAddress }: WalletRestProps) {
    const [backendWalletResponse, setBackendWalletResponse] = useState('')
    const [erc20address, setErc20Address] = useState(localStorage.getItem('erc20address') ?? '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d')
    const [toAddress, setToAddress] = useState('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')
    const [erc20value, setErc20value] = useState('0')
    const [erc20balanceL1, setErc20balanceL1] = useState('0')
    const [erc20balanceL2, setErc20balanceL2] = useState('0')

    const [etherValue, setEtherValue] = useState('0')
    const [etherBalanceL1, setEtherBalanceL1] = useState('0')
    const [etherBalanceL2, setEtherBalanceL2] = useState('0')
    const [erc721balanceL1, setErc721balanceL1] = useState('0')
    const [erc721balanceL2, setErc721balanceL2] = useState('0')
    const [erc721address, setErc721Address] = useState(localStorage.getItem('erc721address') ?? '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c')
    const [erc721id, setErc721id] = useState('1')
    const [erc721Price, setErc721Price] = useState('1')

    const [isEffectExecuted, setIsEffectExecuted] = useState(false);

    useEffect(() => {
        if (!isEffectExecuted) {
            getWallet();
            setIsEffectExecuted(true);
        }
    }, [isEffectExecuted]);

    async function getWallet() {
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/${signer?.address}`)
        const json = await res.json()
        const strResp = JSON.stringify(json, null, 4)
        setBackendWalletResponse(strResp)
    }

    useEffect(() => {
        loadErc20balance()
    }, [erc20address])

    async function loadErc20balance() {
        const signer = await getSigner()
        const balance = await BaseLayerWalletService.balanceERC20(erc20address, signer)
        setErc20balanceL1(balance.toString())
    }

    useEffect(() => {
        loadErc721balance()
    }, [erc721address])

    async function loadErc721balance() {
        const signer = await getSigner()
        const balance = await BaseLayerWalletService.balanceERC721(erc721address, signer)
        setErc721balanceL1(balance.toString())
    }

    async function transferErc20() {
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/erc-20/transfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: erc20address,
                to: toAddress,
                amount: erc20value
            }),
            signer,
        })
        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        console.log('Success!')
    }

    async function transferErc721() {
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/erc-721/transfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: erc721address,
                to: toAddress,
                tokenId: erc721id
            }),
            signer,
        })
        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        console.log('Success!')
    }

    async function transferEther() {
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/ether/transfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: toAddress,
                amount: etherValue
            }),
            signer,
        })
        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        console.log('Success!')
    }

    async function withdrawErc20() {
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/erc-20/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: erc20address,
                amount: erc20value
            }),
            signer,
        })
        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        console.log('Success!')
    }

    async function withdrawErc721() {
        const signer = await getSigner()
        // await Cartesify.withdrawERC721(erc721address, address, tokenId)

        const res = await fetch(`http://127.0.0.1:8383/wallet/erc-721/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: erc721address,
                tokenId: erc721id
            }),
            signer,
        })
        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        console.log('Success!')
    }

    async function depositEther() {
        const signer = await getSigner()
        await BaseLayerWalletService.depositEther(dappAddress, etherValue, signer)
        console.log('Success!')
    }

    async function withdrawEther() {
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/ether/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: etherValue
            }),
            signer,
        })
        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        console.log('Success!')
    }

    async function depositErc20() {
        const signer = await getSigner()
        await BaseLayerWalletService.depositERC20(dappAddress, erc20address, erc20value, signer)
        console.log('Success!')
    }

    async function listErc721() {
        console.log('listErc721', { erc721address, erc721id, erc721Price })
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/erc-721/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: erc721address,
                tokenId: erc721id,
                price: erc721Price,
            }),
            signer,
        })
        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        console.log('Success!')
    }

    async function listedErc721() {
        // /wallet/:address/listed
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/${signer.address}/listed`)
        if (!res.ok) {
            console.log(res.status, res.text())
            return
        }
        const json = await res.json()
        console.log('Success!', JSON.stringify(json, null, 4))
    }

    async function depositErc721() {
        const signer = await getSigner()
        // await Cartesify.depositERC721({
        //     type: 'ERC-721',
        //     erc721address,
        //     erc721id,
        //     // signer
        // })
        await BaseLayerWalletService.depositERC721(dappAddress, erc721address, erc721id, signer)
        console.log('Success!')
    }

    async function getEtherBalance() {
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/${signer.address}`)
        const json = await res.json()
        setEtherBalanceL2(FormatService.formatEther(json.ether))
        const balance = await signer.provider.getBalance(signer.address)
        setEtherBalanceL1(FormatService.formatEther(balance.toString()))
        console.log('Success!')
    }

    function changeErc20Address(e: ChangeEvent<HTMLInputElement>) {
        localStorage.setItem('erc20address', e.target.value)
        setErc20Address(e.target.value)
    }

    async function getErc20Balance() {
        const signer = await getSigner()
        const res = await fetch(`http://127.0.0.1:8383/wallet/${signer.address}`)
        const json = await res.json()
        setErc20balanceL2(json.erc20[erc20address] ?? '0')
        loadErc20balance()
        console.log('Success!')
    }

    function changeErc721address(e: ChangeEvent<HTMLInputElement>) {
        localStorage.setItem('erc721address', e.target.value)
        setErc721Address(e.target.value)
    }

    async function getErc721Balance() {
        const signer = await getSigner()
        const url = `http://127.0.0.1:8383/wallet/${signer.address}`
        const res = await fetch(url)
        const json = await res.json()
        setErc721balanceL2(json.erc721[erc721address]?.length ?? '0')
        loadErc721balance()
        console.log('Success!')
    }

    // async function callDAppAddressRelay() {
    //     const signer = await getSigner()
    //     const relay = DAppAddressRelay__factory.connect('0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE', signer)
    //     const tx = await relay.relayDAppAddress(dappAddress)
    //     const res = await (tx as any).wait()
    //     console.log('Executed!', res)
    // }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <WalletInfo getSigner={getSigner} dappAddress={dappAddress} wallet={backendWalletResponse} />
                </Grid>
                <Grid item xs={12} lg={9}>
                    <Collections collections={backendWalletResponse} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={4}>
                            <EtherCard
                                cardTitle={"Ether"}
                                getEtherBalance={getEtherBalance}
                                idValue={etherValue}
                                setIdValue={setEtherValue}
                                depositEther={depositEther}
                                withdrawEther={withdrawEther}
                                transferEther={transferEther}
                                etherBalanceL1={etherBalanceL1}
                                etherBalanceL2={etherBalanceL2}
                                setDestinyAddress={setToAddress}
                                addressToTransfer={toAddress}
                                 />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <TokenErc20Card
                                cardTitle={"ERC-20"}
                                setCurrentInputAddress={changeErc20Address}
                                currentInputAddress={erc20address}
                                getBalance={getErc20Balance}
                                balanceL1={erc20balanceL1}
                                balanceL2={erc20balanceL2}
                                setIdValue={setErc20value}
                                idValue={erc20value}
                                deposit={depositErc20}
                                withdraw={withdrawErc20}
                                setDestinyAddress={setToAddress}
                                transfer={transferErc20}
                                addressToTransfer={toAddress}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <TokenErc721Card
                                cardTitle={"ERC-721"}
                                setCurrentInputAddress={changeErc721address}
                                currentInputAddress={erc721address}
                                getBalance={getErc721Balance}
                                balanceL1={erc721balanceL1}
                                balanceL2={erc721balanceL2}
                                setIdValue={setErc721id}
                                idValue={erc721id}
                                deposit={depositErc721}
                                withdraw={withdrawErc721}
                                setDestinyAddress={setToAddress}
                                transfer={transferErc721}
                                addressToTransfer={toAddress}
                                price={erc721Price}
                                setPrice={setErc721Price}
                                toList={listErc721}
                                toListed={listedErc721}
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}
