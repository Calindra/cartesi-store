import { Box, Grid, Divider, Typography, Card, CardContent, Tooltip, IconButton, Button } from '@mui/material';
import { ChangeEvent } from 'react';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import CustomTextField from '@/components/CustomTextField';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CustomFormLabel from '@/components/CustomFormLabel';

interface TokenErc721CardProps {
    setCurrentInputAddress: (e: ChangeEvent<any>) => void
    getBalance: () => void
    setIdValue: (str: string) => void
    deposit: () => void
    withdraw: () => void
    setDestinyAddress: (str: string) => void
    transfer: () => void
    balanceL1: string
    balanceL2: string
    cardTitle: string
    currentInputAddress: string
    idValue: string
    addressToTransfer: string
    price: string
    toList: () => void
    toListed: () => void
}
const TokenErc721Card = ({ setCurrentInputAddress, getBalance, setIdValue, deposit, withdraw, setDestinyAddress, transfer, balanceL1, balanceL2, cardTitle, currentInputAddress, idValue, addressToTransfer, price, toList, toListed }: TokenErc721CardProps) => {

    return (
        <Card
            sx={{
                pb: 0,
                mb: 4,
                height: '650px'
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
                    >
                        {cardTitle}
                    </Typography>
                </Box>
                <Box>
                    <CustomFormLabel htmlFor="collection">Collection Address</CustomFormLabel>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >

                        <CustomTextField
                            id="collection"
                            placeholder="Current address"
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={{ width: "350px" }}
                            value={currentInputAddress}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentInputAddress(e)}
                        />

                        <Tooltip title={"Get Balance"}>
                            <IconButton
                                onClick={() => getBalance()}
                                sx={{ backgroundColor: '#1976d2', color: "#FFF" }}
                            >
                                <AccountBalanceWalletIcon />
                            </IconButton>
                        </Tooltip>

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
                                lg={6}
                                sx={{
                                    borderRight: '1px solid rgba(0,0,0,0.1)',
                                    // pb: 1,
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
                                    <Tooltip title={balanceL1}>
                                        <span>{balanceL1}</span>
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
                                <Typography variant="subtitle2" fontWeight="500" sx={{
                                    pr: 1,
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }}>
                                    <Tooltip title={balanceL2}>
                                        <span>{balanceL2}</span>
                                    </Tooltip>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                </Box>


                <Box
                    sx={{
                        pb: 1
                    }}>
                    <CustomFormLabel htmlFor="id-nft">NFT ID</CustomFormLabel>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >

                        <CustomTextField
                            id="id-nft"
                            placeholder="Enter NFT ID"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={idValue}
                            sx={{ width: "100px" }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setIdValue(e.target.value)}
                        />

                        <Box display="flex">
                            <Tooltip title={"Deposit"}>
                                <IconButton
                                    onClick={() => deposit()}
                                    sx={{ backgroundColor: '#1976d2', color: "#FFF", marginRight: "10px" }}
                                >
                                    <SavingsIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={" Voucher withdraw"}>
                                <IconButton
                                    onClick={() => withdraw()}
                                    sx={{ backgroundColor: '#1976d2', color: "#FFF" }}
                                >
                                    <CurrencyExchangeIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                </Box>
                <Divider />

                {/* ///////////////////////////// */}

                <Box
                    sx={{
                        pb: 1
                    }}>
                    <CustomFormLabel htmlFor="to-address">Destiny Collection Address</CustomFormLabel>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >

                        <CustomTextField
                            id="to-address"
                            placeholder="Address to transfer"
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={{ width: "350px" }}
                            value={addressToTransfer}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDestinyAddress(e.target.value)}
                        />

                        <Tooltip title={"L2 Transfer"}>
                            <IconButton
                                onClick={() => transfer()}
                                sx={{ backgroundColor: '#1976d2', color: "#FFF" }}
                            >
                                <MoveUpIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Box>

                {/* //////////////////////////// */}
                <Divider />
                <Box
                    sx={{
                        pb: 1
                    }}>
                    <CustomFormLabel htmlFor="price">Price</CustomFormLabel>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >

                        <CustomTextField
                            id="price"
                            placeholder="Enter NFT ID"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={price}
                            sx={{ width: "100px" }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setIdValue(e.target.value)}
                        />

                        <Box display="flex">
                            <Button
                                onClick={() => toList()}
                                sx={{ backgroundColor: '#1976d2', color: "#FFF", marginRight: "10px" }}
                            >
                                L2 List
                            </Button>


                            <Button
                                onClick={() => toListed()}
                                sx={{ backgroundColor: '#1976d2', color: "#FFF" }}
                            >
                                L2 Listed
                            </Button>

                        </Box>
                    </Box>

                </Box>
            </CardContent>
        </Card >
    )
};

export default TokenErc721Card;
