import { Box, Typography } from "@mui/material"
import { SvgIconComponent } from '@mui/icons-material';

interface CardHeaderProps {
    cardTitle: string
    IconComponent: SvgIconComponent
}

function CardHeader({ cardTitle, IconComponent }: CardHeaderProps) {
    return (
        <Box display="flex" alignItems={"center"} justifyContent={"flex-start"} sx={{ mb: 0, pb: 0 }}>
            <IconComponent sx={{ fontSize: "40px" }} />
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        pl: 2,
                    }}
                >
                    {cardTitle}
                </Typography>
            </Box>
        </Box>
    )
}

export default CardHeader