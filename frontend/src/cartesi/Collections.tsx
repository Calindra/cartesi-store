import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

const bodyBuilding = (element: any) => {
    if (!element || Object.keys(element).length === 0) {
        return null;
    }

    const rows = [];
    let id = 0
    for (let key in element) {
        const item = element[key]; // Acessando cada propriedade do objeto
        rows.push(
            <TableRow key={item.id}>
                <TableCell>
                    <Box display="flex" alignItems="center">
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



const Collections = ({ collections }: any) => {
    const [erc721, setErc721] = useState({})
    useEffect(() => {
        if (collections) {
            const jsonCollection = JSON.parse(collections)
            setErc721(jsonCollection.erc721)
        }
    }, [collections])


    return (
        < Card sx={{
            pb: 0,
            mb: 4,
            height: '500px',
            overflow: "auto"
        }}>
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
                                    <Typography variant="h5" style={{ paddingLeft: "15px" }}>Collection</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h5">Quantity of NFTs</Typography>
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
        </Card >
    )
}

export default Collections;
