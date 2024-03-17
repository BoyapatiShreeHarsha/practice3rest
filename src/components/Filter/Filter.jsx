import { Autocomplete, Box, InputAdornment, TextField, styled, Stack, useTheme } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';


let regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

let styleInput = { bgcolor: "primary.main", color: "primary.contrastText", borderRadius: "6px" }

export default function Filter({ value, setValue, regionValue, setRegionValue }) {
    const theme = useTheme();
    return (
        <Stack direction={{ xs: 'column', md: 'row' }} rowGap={5} sx={{ width: "100%", height: "10%", margin: "5% auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <TextField id="outlined-search" placeholder='Search for a country' type="search"
                sx={styleInput}
                value={value}
                onChange={(e) => {
                    setValue(pre => e.target.value)
                }}
                inputProps={{
                    "data-testid": "searchBar",
                    "sx": styleInput
                }
                }
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon style={{ color: (theme.palette.mode === 'dark') ? "white" : "black" }} />
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
                options={regions}
                sx={{ width: 300, ...styleInput }}
                renderInput={(params) => <TextField {...params} placeholder="Filter By Region" />}
            />
        </Stack>
    )
}
