import { Box, Button, Chip, Grid, Divider, Typography, Card, CardContent } from '@mui/material';
import { DAppAddressRelay__factory } from "@cartesi/rollups"
import { JsonRpcSigner } from 'ethers';

interface WalletInfoProps {
    dappAddress: string
    getSigner: () => Promise<JsonRpcSigner>
}
const WalletInfo = ({ getSigner, dappAddress }: WalletInfoProps) => {
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
            }}
        >
            <CardContent
                sx={{
                    pb: 0,
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                        }}
                    >
                        Wallet
                    </Typography>
                </Box>

                <Chip
                    size="small"
                    label="16 APR, 2021"
                    sx={{
                        // backgroundColor: (theme) => theme.palette.secondary.light,
                        // color: (theme) => theme.palette.secondary.main,
                        borderRadius: '6px',
                        pl: 1,
                        pr: 1,
                    }}
                />

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
                            <Typography variant="subtitle2" fontWeight="500">
                                100000000
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
                                10
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
                                11
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            pt: 2,
                        }}
                    >
                        <Button onClick={callDAppAddressRelay} variant="contained" color="primary">
                            Provide DApp Address
                        </Button>

                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
};

export default WalletInfo;
