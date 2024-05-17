import { Box, Divider, Grid, Typography } from "@mui/material"

interface BalanceBoardProps {
    balanceL1: string
    balanceL2: string
}
function BalanceBoard({ balanceL1, balanceL2 }: BalanceBoardProps) {
    return (
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
                        <span>{balanceL1}</span>
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
                        <span>{balanceL2}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
        </Box>
    )
}

export default BalanceBoard