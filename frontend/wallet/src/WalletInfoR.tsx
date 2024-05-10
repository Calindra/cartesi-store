import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import WalletIcon from '@mui/icons-material/Wallet';
import { DAppAddressRelay__factory } from "@cartesi/rollups"
import { JsonRpcSigner } from 'ethers';

type TitleVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle2";
type FontWeight = number | "normal" | "bold" | "lighter" | "bolder" | "inherit" | "initial" | "unset";
type Color = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
type Variant = "text" | "outlined" | "contained" | undefined

interface WalletInfoProps {
  dappAddress: string,
  getSigner: () => Promise<JsonRpcSigner>,
  wallet: string,
  account: string,
  cardStyle: any,
  titleColor: string,
  titleVariant: TitleVariant
  titleFontWeight: FontWeight,
  infoVariant: TitleVariant,
  infoFontWeight: FontWeight
  buttonColor: Color,
  buttonVariant: Variant
}

function WalletInfoR({ getSigner, dappAddress, wallet, account, cardStyle, titleColor, titleVariant, titleFontWeight, buttonColor, buttonVariant, infoVariant, infoFontWeight }: WalletInfoProps) {

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
    const relay = DAppAddressRelay__factory.connect(account, signer)
    console.log("RELAY: ", relay)
    console.log("dappAddress: ", dappAddress)
    const tx = await relay.relayDAppAddress(dappAddress)
    console.log("TX: ", tx)
    const res = await (tx as any).wait()
    console.log('Executed!', res)
  }

  return (
    <Card sx={cardStyle}>
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
              <Typography color={titleColor} variant={titleVariant} fontWeight={titleFontWeight}>
                Ether
              </Typography>
              <Typography variant={infoVariant} fontWeight={infoFontWeight} sx={{
                pr: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}>
                {/* <Tooltip title={"Ether"} > */}
                <span>{walletInfo.ether}</span>
                {/* </Tooltip> */}
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
              <Typography color={titleColor} variant={titleVariant} fontWeight={titleFontWeight}>
                Collections
              </Typography>
              <Typography variant={infoVariant} fontWeight={infoFontWeight}>
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
              <Typography color={titleColor} variant={titleVariant} fontWeight={titleFontWeight}>
                NFTs
              </Typography>
              <Typography variant={infoVariant} fontWeight={infoFontWeight}>
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
          <Button onClick={callDAppAddressRelay} variant={buttonVariant} color={buttonColor}>
            Provide DApp Address
          </Button>
        </Box>
      </CardContent>
    </Card>

  )
}

export default WalletInfoR
