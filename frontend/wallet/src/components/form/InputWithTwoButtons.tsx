import { Box, Button } from "@mui/material"
import CustomFormLabel from "./CustomFormLabel"
import CustomTextField from "./CustomTextField"
import { ChangeEvent } from "react";

interface InputWithTwoButtonsProps {
    inputLabel: string
    idValue: string
    firstButtonLabel: string
    secondButtonLabel: string
    id: string
    inputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onclickFirstButton: () => void
    onclickSecondButton: () => void
}

function InputWithTwoButtons({
    inputLabel,
    idValue,
    firstButtonLabel,
    secondButtonLabel,
    id,
    inputChange,
    onclickFirstButton,
    onclickSecondButton
}: InputWithTwoButtonsProps) {
    return (
        <Box
            sx={{
                pb: 1
            }}>
            <CustomFormLabel htmlFor={id}>{inputLabel}</CustomFormLabel>
            <Box
                display="flex"
                justifyContent="space-between"
            >

                <CustomTextField
                    id={id}
                    placeholder="Enter NFT ID"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={idValue}
                    sx={{ width: "100px" }}
                    onChange={inputChange}
                />

                <Box display="flex">
                    <Button
                        onClick={() => onclickFirstButton()}
                        sx={{ backgroundColor: '#1976d2', color: "#FFF", marginRight: "10px" }}
                    >
                        {firstButtonLabel}
                    </Button>


                    <Button
                        onClick={() => onclickSecondButton()}
                        sx={{ backgroundColor: '#1976d2', color: "#FFF" }}
                    >
                        {secondButtonLabel}
                    </Button>

                </Box>
            </Box>
        </Box>
    )
}

export default InputWithTwoButtons