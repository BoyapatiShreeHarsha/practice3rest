import { Autocomplete, Box, InputAdornment, TextField, styled, Stack } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';



const StyledTextFeild = styled(TextField)(({ theme }) => ({

    '& .MuiInputBase-root': {
        color: theme.palette.primary.contrastText,
        bgcolor: theme.palette.primary.light
    },
    '& .MuiSvgIcon-root': {
        color: theme.palette.primary.contrastText
    },

}));

export default function Filter({ value, setValue, regionValue, setRegionValue, options }) {

    return (
        <Stack direction={{ xs: 'column', md: 'row' }} rowGap={5} sx={{ width: "100%", margin: "5% auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <StyledTextFeild id="outlined-search" placeholder='Search for a country' type="search"

                value={value}
                onChange={(e) => {
                    setValue(pre => e.target.value)
                }}
                inputProps={{
                    "data-testid": "searchBar"
                }
                }
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />

            <Autocomplete
                data-testid="autoComplete"
                value={regionValue}
                onChange={(e, newValue) => {
                    setRegionValue(newValue)
                }}
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300, bgcolor: "primary.main", color: "primary.contrastText" }}
                renderInput={(params) => <TextField {...params} sx={{ bgcolor: "primary.main", color: "primary.contrastText" }} inputProps={{
                    "data-testid": "autoCompleteInput"
                }} placeholder='Filter By Region' />}
            />
        </Stack>
    )
}
