import { Box, Button, Grid, Divider, Typography, Card, CardContent, Tooltip } from '@mui/material';
import { DAppAddressRelay__factory } from "@cartesi/rollups"
import { JsonRpcSigner } from 'ethers';
import { useEffect, useState } from 'react';
import WalletIcon from '@mui/icons-material/Wallet';
interface WalletInfoProps {
    dappAddress: string
    getSigner: () => Promise<JsonRpcSigner>
    wallet: string
}
const WalletInfo = ({ getSigner, dappAddress, wallet }: WalletInfoProps) => {

    const [walletInfo, setWalletInfo] = useState({ ether: "" })
    const [totalCollections, setTotalCollections] = useState(0)
    const [totalNfts, setTotalNfts] = useState(0)

    useEffect(() => {
        if (wallet) {
            const jsonWallet = JSON.parse(wallet)
            const totalCollections = Object.keys(jsonWallet.erc721).length;
            const totalNfts: number = Object.values(jsonWallet.erc721).reduce((acc, curr: any) => acc + curr.length, 0) as number;
            setTotalCollections(totalCollections)
            setTotalNfts(totalNfts)
            setWalletInfo(jsonWallet)
        }
    }, [wallet])

    async function callDAppAddressRelay() {
        const signer = await getSigner()
        const relay = DAppAddressRelay__factory.connect('0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE', signer)
        const tx = await relay.relayDAppAddress(dappAddress)
        const res = await (tx as any).wait()
        console.log('Executed!', res)
    }

    return (
        <Card
            sx={{
                pb: 0,
                mb: 4,
                height: '400px'
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    pb: 0,
                    height: "100%",
                }}
            >
                <Box display="flex" alignItems={"center"} justifyContent={"flex-start"}>
                    <WalletIcon sx={{ fontSize: "40px" }} />
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                pl: 2,
                            }}
                        >
                            Wallet
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: 3,
                    }}
                >
                    <Grid container spacing={0}>
                        <Grid
                            item
                            xs={4}
                            lg={4}
                            sx={{
                                borderRight: '1px solid rgba(0,0,0,0.1)',
                                pb: 2,
                            }}
                        >
                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                Ether
                            </Typography>
                            <Typography variant="subtitle2" fontWeight="500" sx={{
                                pr: 1,
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis"
                            }}>
                                <Tooltip title={walletInfo.ether}>
                                    <span>{walletInfo.ether}</span>
                                </Tooltip>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            lg={4}
                            sx={{
                                borderRight: '1px solid rgba(0,0,0,0.1)',
                                pb: 2,
                                pl: 1,
                            }}
                        >
                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                Collections
                            </Typography>
                            <Typography variant="subtitle2" fontWeight="500">
                                {totalCollections}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            lg={4}
                            sx={{
                                pl: 1,
                                pb: 2,
                            }}
                        >
                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                NFTs
                            </Typography>
                            <Typography variant="subtitle2" fontWeight="500">
                                {totalNfts}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                </Box>
                
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{
                        pt: 2,
                    }}
                >
                    <Button onClick={callDAppAddressRelay} variant="contained" color="primary">
                        Provide DApp Address
                    </Button>

                </Box>
            </CardContent>
        </Card>
    )
};

export default WalletInfo;
