import { ChangeEvent } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import ethereum from "./assets/ethereum.svg"
import BalanceBoard from "./components/boards/BalanceBoard"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InputWithButton from "./components/form/InputWithButton";

interface EtherCardProps {
    cardStyle?: any
    balanceL1: string
    balanceL2: string
    addressToTransfer: string
    getBalance: () => void
    setDestinyAddress: (str: string) => void
    transfer: () => void
}

function EtherCardR({ cardStyle, balanceL1, balanceL2, addressToTransfer, getBalance, setDestinyAddress, transfer }: EtherCardProps) {
    return (

        <Card
            sx={cardStyle ? cardStyle : {
                pb: 0,
                mb: 4,
                height: '500px'
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
                    <img src={ethereum} alt="ethereum icon" width={25} />
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                pl: 2,
                            }}
                        >
                            Ether
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" flexDirection={"column"} justifyContent={"space-between"}
                    sx={{
                        pb: 4,
                        height: "80%",
                    }}>
                    <Button
                        onClick={() => getBalance()}
                        variant="contained"
                        color="primary"
                        startIcon={<AccountBalanceIcon />}
                        sx={{ width: "100%" }}>
                        Get Balance
                    </Button>
                    <BalanceBoard balanceL1={balanceL1} balanceL2={balanceL2} />

                    <InputWithButton
                        inputLabel="Transfer Destiny Address"
                        buttonLabel="L2 Transfer"
                        value={addressToTransfer}
                        inputChange={(e: ChangeEvent<any>) => {
                            setDestinyAddress(e.target.value)
                        }}
                        onclick={transfer}
                        id="l2transfer"
                    />

                </Box>

            </CardContent>
        </Card>)
}

export default EtherCardR