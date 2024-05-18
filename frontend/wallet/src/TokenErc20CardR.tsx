import { ChangeEvent } from "react";
import { Box, Card, CardContent } from "@mui/material"
import TokenIcon from '@mui/icons-material/Token';
import CardHeader from "./components/card-header/CardHeader";
import InputWithButton from "./components/form/InputWithButton";
import BalanceBoard from "./components/boards/BalanceBoard";

interface TokenErc20CardProps {
    cardStyle?: any
    balanceL1: string
    balanceL2: string
    currentInputAddress: string
    addressToTransfer: string
    getBalance: () => void
    setCurrentInputAddress: (e: ChangeEvent<any>) => void
    setDestinyAddress: (str: string) => void
    transfer: () => void
}

function TokenErc20CardR({
    cardStyle,
    balanceL1,
    balanceL2,
    currentInputAddress,
    addressToTransfer,
    getBalance,
    setCurrentInputAddress,
    setDestinyAddress,
    transfer }: TokenErc20CardProps) {
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
                <CardHeader cardTitle={"ERC-20"} IconComponent={TokenIcon} />
                <Box>
                    <InputWithButton
                        inputLabel="Collection Address"
                        buttonLabel="Balance"
                        value={currentInputAddress}
                        inputChange={setCurrentInputAddress}
                        onclick={getBalance}
                        id="collection"
                    />
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
        </Card>
    )
}

export default TokenErc20CardR