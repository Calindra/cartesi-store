import { Box, Button } from "@mui/material"
import CustomFormLabel from "./CustomFormLabel"
import CustomTextField from "./CustomTextField"
import { ChangeEvent } from "react"

interface InputWithButtonProps {
    value: string,
    inputChange: (e: ChangeEvent<any>) => void
    onclick: () => void
    inputLabel: string
    buttonLabel: string
}
function InputWithButton({ inputLabel, buttonLabel, value, inputChange, onclick }: InputWithButtonProps) {
    return (
        <>
            <CustomFormLabel htmlFor="collection">{inputLabel}</CustomFormLabel>
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
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => inputChange(e)}
                />

                <Button
                    onClick={() => onclick()}
                    sx={{ backgroundColor: '#1976d2', color: "#FFF" }}
                >
                    {buttonLabel}
                </Button>

            </Box>
        </>
    )
}

export default InputWithButton