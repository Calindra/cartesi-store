import { Avatar, Box, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { TitleVariant } from "./models/Variants"

import img1 from "./assets/1.jpg"
import img2 from "./assets/2.jpg"
import img3 from "./assets/3.jpg"
import img4 from "./assets/4.jpg"
import img5 from "./assets/5.jpg"
import img6 from "./assets/6.jpg"
import img7 from "./assets/7.jpg"
import img8 from "./assets/8.jpg"
import { useEffect, useState } from "react"

interface CollectionsProps {
    cardStyle: any
    thVariant: TitleVariant
    wallet: string
}

const bodyBuilding = (element: any) => {
    if (!element || Object.keys(element).length === 0) {
        return null;
    }

    const rows = [];
    const imgs = [img1, img2, img3, img4, img5, img6, img7, img8]
    let id = 0
    for (let key in element) {
        const item = element[key]; // Acessando cada propriedade do objeto
        rows.push(
            <TableRow key={item.id}>
                <TableCell>
                    <Box display="flex" alignItems="center">
                        <Avatar
                            src={imgs[id]}
                            // alt={img4}
                            sx={{
                                borderRadius: "100%",
                                width: 60,
                                height: 60
                            }}
                        />
                        <Box
                            sx={{
                                ml: 2,
                            }}
                        >
                            <Typography variant="h6" fontWeight="600">
                                {key}
                            </Typography>
                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                {`collection#${id}`}
                            </Typography>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell align="center">
                    <Typography variant="h6">{item.length}</Typography>
                </TableCell>
            </TableRow>
        );
        id++;
    }

    return rows;
};

function CollectionsR({ cardStyle, thVariant, wallet }: CollectionsProps) {
    const [erc721, setErc721] = useState({})
    useEffect(() => {
        if (wallet) {
            const jsonCollection = JSON.parse(wallet)
            setErc721(jsonCollection.erc721)
        }
    }, [wallet])
    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Box
                    sx={{
                        overflow: {
                            xs: 'auto',
                            sm: 'unset',
                        },
                    }}
                >
                    <Table
                        aria-label="simple table"
                        sx={{
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant={thVariant} style={{ paddingLeft: "15px" }}>Collection</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant={thVariant}>Quantity of NFTs</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                bodyBuilding(erc721)?.map(el => el)
                            }
                        </TableBody>

                    </Table>
                </Box>
            </CardContent>
        </ Card>

    )
}

export default CollectionsR