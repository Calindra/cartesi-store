import { Box, Grid, Divider, Typography, Card, CardContent, Tooltip, IconButton, Button } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import CustomTextField from '@/components/CustomTextField';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface EtherCardProps {
    getEtherBalance: () => Promise<any>
    depositEther: () => Promise<any>
    withdrawEther: () => Promise<any>
    transferEther: () => Promise<any>
    cardTitle: string
    etherBalanceL1: string
    etherBalanceL2: string
}
const EtherCard = ({ getEtherBalance, depositEther, withdrawEther, transferEther, etherBalanceL1, etherBalanceL2, cardTitle }: EtherCardProps) => {

    return (
        <Card
            sx={{
                pb: 0,
                mb: 4,
                height: '480px'
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
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                        }}
                    >
                        {cardTitle}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        pb: 4
                    }}>
                    <Button
                        onClick={() => getEtherBalance()}
                        variant="contained"
                        color="primary"
                        startIcon={<AccountBalanceWalletIcon />}
                        sx={{ width: "100%" }}>
                        Get Balance
                    </Button>
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <Grid container spacing={0}>
                            <Grid
                                item
                                xs={4}
                                lg={6}
                                sx={{
                                    borderRight: '1px solid rgba(0,0,0,0.1)',
                                    pb: 2,
                                }}
                            >
                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                    L1 Balance
                                </Typography>
                                <Typography variant="subtitle2" fontWeight="500" sx={{
                                    pr: 1,
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }}>
                                    <Tooltip title={"walletInfo.ether"}>
                                        <span>{etherBalanceL1}</span>
                                    </Tooltip>
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                lg={6}
                                sx={{
                                    pb: 2,
                                    pl: 1,
                                }}
                            >
                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                    L2 Balance
                                </Typography>
                                <Typography variant="subtitle2" fontWeight="500">
                                    {etherBalanceL2}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                </Box>

                <Box>
                    <CustomTextField
                        id="id-nft"
                        placeholder="Enter NFT ID"
                        variant="outlined"
                        fullWidth
                        size="small" />

                    <Box
                        display="flex"
                        alignItems="space-between"
                        justifyContent="flex-end"
                        sx={{
                            pt: 2,
                        }}
                    >
                        <Tooltip title={"Deposit"}>
                            <IconButton
                                onClick={() => depositEther()}
                                sx={{ backgroundColor: '#1976d2', color: "#FFF", marginRight: "10px" }}
                            >
                                <SavingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={" Voucher withdraw"}>
                            <IconButton
                                onClick={() => withdrawEther()}
                                sx={{ backgroundColor: '#1976d2', color: "#FFF" }}
                            >
                                <CurrencyExchangeIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: 3,
                    }}
                >

                    <CustomTextField
                        id="id-nft"
                        placeholder="Address to transfer"
                        variant="outlined"
                        fullWidth
                        size="small" />
                </Box>

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        pt: 2,
                    }}
                >
                    <Tooltip title={"L2 Transfer"}>
                        <IconButton
                            onClick={() => transferEther()}
                            sx={{ backgroundColor: '#1976d2', color: "#FFF" }}
                        >
                            <MoveUpIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>
        </Card >
    )
};

export default EtherCard;
