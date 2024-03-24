import { Request, Response } from 'express'

// Cartesify REST bridge
import { CartesifyBackend } from "@calindra/cartesify-backend";
import { WalletApp, createWallet } from "@deroll/wallet";

let wallet: WalletApp
let dapp: any

CartesifyBackend.createDapp().then((initDapp: any) => {
    dapp = initDapp
    dapp.start().catch((e: any) => {
        console.error(e);
        process.exit(1);
    });
    wallet = createWallet()
    dapp.addAdvanceHandler(wallet.handler); // this handles the deposits
    WalletRouter.addWalletRoutes(app, wallet, dapp);
});

// Normal nodejs application using express
import express from "express";
import { container } from './inversify';
import { WalletRouter } from './WalletRouter';
import { Address } from 'viem';
import { NFTProduct } from './repository/NFTProductRepository';
import { bootstrap } from './bootstrap';

const app = express();
const port = 8383;

app.use(express.json());

//
// Cartesi Store operations
// 
app.get("/trending", async (req: Request, res: Response) => {
    const repository = await container.getTransactionRepository()
    let response = await repository.findAllTrending({
        dateGt: req.query.dateGt?.toString() ?? '',
        limit: 10
    })
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const json = toJSON({ rows: response })
    res.send(json)
})

/**
 * Get list of NFTs listed by an address
 */
app.get("/wallet/:address/listed", async (req, res) => {
    console.log(`Checking balance [${req.params.address}]`)
    const userWallet = await wallet.getWalletOrNew(`${req.params.address}:list`.toLowerCase())
    const json = toJSON(userWallet)
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.send(json)
})

app.post("/erc-721/list", async (req: Request, res: Response) => {
    try {
        const senderAddress = req.header("x-msg_sender") as Address;
        console.log('receiving', { ...req.body, senderAddress })
        console.log(toJSON(wallet))
        const nftProduct: NFTProduct = {
            lastSale: BigInt(0),
            currentPrice: BigInt(req.body.price),
            collection: req.body.token,
            tokenId: BigInt(req.body.tokenId),
            coin: 'ETH',
            endDate: req.body.endDate,
            categoryId: 0,
            categoryName: req.body.categoryName,
            collectionName: req.body.collectionName,
            owner: senderAddress,
            status: 'LISTED',
        }
        const nftProductService = await container.getNFTProductService()
        await nftProductService.list(nftProduct, wallet)
        res.send({ ok: 1 });
    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            res.status(500).send({ message: e.message });
        } else {
            res.status(500).send({ message: 'Unexpected error' })
        }
    }
});

app.get("/erc-721/:collection/listed", async (req: Request, res: Response) => {
    const nftProductRepository = await container.getNFTProductRepository()
    const collection = await nftProductRepository.findAllByCollection(req.params.collection ?? '')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.send(toJSON({ rows: collection }))
})

app.get("/erc-721/:collection/listed/:tokenId", async (req: Request, res: Response) => {
    const nftProductRepository = await container.getNFTProductRepository()
    const nftProduct = await nftProductRepository.findByCollectionAddressAndTokenId(req.params.collection ?? '', BigInt(req.params.tokenId ?? '0'))
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.send(toJSON(nftProduct))
})

app.post("/erc-721/:collection/listed/:tokenId/buy", async (req: Request, res: Response) => {
    try {
        const nftProductService = await container.getNFTProductService()
        const nftProduct = await nftProductService.findByCollectionAddressAndTokenId(req.params.collection ?? '', BigInt(req.params.tokenId ?? '0'))
        if (!nftProduct) {
            res.status(404).send({ message: 'Not found' })
            return
        }
        await nftProductService.buyNFT(nftProduct, req.get('x-msg_sender') as Address, wallet)
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.send(toJSON(nftProduct))
    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            res.status(500).send({ message: e.message });
        } else {
            res.status(500).send({ message: 'Unexpected error' })
        }
    }
})

bootstrap().catch((e) => {
    console.error(e);
    process.exit(1);
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


// aux
function toJSON(obj: object) {
    const json = JSON.stringify(obj, (_key, value) => {
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
    return json
}