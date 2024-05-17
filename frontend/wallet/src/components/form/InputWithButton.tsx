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
    id: string
}
function InputWithButton({ inputLabel, buttonLabel, value, id, inputChange, onclick }: InputWithButtonProps) {
    return (
        <>
            <CustomFormLabel htmlFor={id}>{inputLabel}</CustomFormLabel>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                sx={{ height: "100px" }}
            >
                <CustomTextField
                    id={id}
                    placeholder="Current address"
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ width: "100%" }}
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