import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";


export default function Cards({ name, population, region, capitalArr, img }) {
    return (
        <Card sx={{ maxWidth: 345, bgcolor: "primary.main" }}>
            <CardMedia
                sx={{ height: 140 }}
                image={img}
                title="green iguana"
            />
            <CardContent sx={{ marginBottom: "20px" }}>
                <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                    {name}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <Typography variant="body1" color="primary.contrastText" sx={{ marginRight: "4px" }}>
                        Population:
                    </Typography>
                    <Typography variant="body1" color="primary.contrastText">
                        {population}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <Typography variant="body1" color="primary.contrastText" sx={{ marginRight: "4px" }}>
                        Region:
                    </Typography>
                    <Typography variant="body1" color="primary.contrastText">
                        {region}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <Typography variant="body1" color="primary.contrastText" sx={{ marginRight: "4px" }}>
                        Capital:
                    </Typography>
                    <Typography variant="body1" color="primary.contrastText">
                        {capitalArr?.join(", ")}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
