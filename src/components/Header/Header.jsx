import React from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DarkModeIcon from '@mui/icons-material/DarkMode';


export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{ padding: "0 5%", bgcolor: "primary.main" }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} data-testid="header">
                        Where in the world?
                    </Typography>
                    <Button color="inherit" variant="text" startIcon={<DarkModeIcon />}>Dark Mode</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
