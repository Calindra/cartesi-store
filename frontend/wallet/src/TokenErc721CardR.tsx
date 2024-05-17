import { ChangeEvent } from "react";
import { Box, Card, CardContent, Divider } from "@mui/material"
import TokenIcon from '@mui/icons-material/Token';
import CardHeader from "./components/card-header/CardHeader";
import InputWithButton from "./components/form/InputWithButton";
import BalanceBoard from "./components/boards/BalanceBoard";
import InputWithTwoButtons from "./components/form/InputWithTwoButtons";

// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface TokenErc721CardProps {
    cardStyle?: any
    currentInputAddress: string
    balanceL1: string
    balanceL2: string
    idValue: string
    addressToTransfer: string
    price: string
    setPrice: (e: string) => void
    setCurrentInputAddress: (e: ChangeEvent<any>) => void
    setIdValue: (str: string) => void
    setDestinyAddress: (e: ChangeEvent<any>) => void
    getBalance: () => void
    deposit: () => void
    withdraw: () => void
    transfer: () => void
    toList: () => void
    toListed: () => void
}
function TokenErc721CardR({
    cardStyle,
    currentInputAddress,
    balanceL1,
    balanceL2,
    idValue,
    addressToTransfer,
    price,
    setPrice,
    toList,
    toListed,
    setCurrentInputAddress,
    getBalance,
    setIdValue,
    deposit,
    withdraw,
    setDestinyAddress,
    transfer
}: TokenErc721CardProps) {
    return (
        <Card
            sx={cardStyle ? cardStyle : {
                pb: 0,
                mb: 4,
                height: '700px'
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
                <CardHeader cardTitle={"ERC-721"} IconComponent={TokenIcon} />
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
                    <InputWithTwoButtons
                        inputLabel={"NFT ID"}
                        id="id-nft"
                        idValue={idValue}
                        inputChange={(e: ChangeEvent<HTMLInputElement>) => setIdValue(e.target.value)}
                        onclickFirstButton={deposit}
                        onclickSecondButton={withdraw}
                        firstButtonLabel="Deposit"
                        secondButtonLabel="Voucher Withdraw"
                    />
                    <Divider />
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
                    &nbsp;
                    <Divider />
                    <InputWithTwoButtons
                        inputLabel={"Price"}
                        idValue={price}
                        inputChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                        onclickFirstButton={toList}
                        onclickSecondButton={toListed}
                        firstButtonLabel="L2 List"
                        secondButtonLabel="L2 Listed"
                        id="price"
                    />

                </Box>
            </CardContent>
        </Card>
    )
}

export default TokenErc721CardR