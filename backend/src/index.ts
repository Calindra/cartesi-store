import { Request, Response } from 'express'

// Cartesify REST bridge
import { CartesifyBackend } from "@calindra/cartesify-backend";

CartesifyBackend.createDapp().then((dapp: any) => {
    dapp.start().catch((e: any) => {
        console.error(e);
        process.exit(1);
    });
});

// Normal nodejs application using express
import express from "express";
import { container } from './inversify';

const app = express();
const port = 8383;

app.use(express.json());

app.get("/trending", async (req: Request, res: Response) => {
    let repository = await container.getTransactionRepository()
    let response = await repository.findAllTrending({
        dateGt: req.query.dateGt?.toString() ?? '',
        limit: 10
    })
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const json = toJSON({ rows: response })
    res.send(json)
})

app.post("/your-endpoint", (req: Request, res: Response) => {
    console.log("Request received on your endpoint")
    const senderAddress = req.header("x-msg_sender");
    res.send({ some: "response", senderAddress });
});

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