import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './Page2.module.css'
import WestIcon from '@mui/icons-material/West';
import getCountryName from "../helperCountryCode"
import { useNavigate } from 'react-router-dom';
import axios from '../axios';


function findName(arr) {
    try {

        let newArray = arr?.map((code) => {
            return getCountryName(code);
        })

        return newArray;
    } catch (error) {
        console.log(error.message);
    }

}

let keys1 = ["nativeName", "population", "region", "subregion", "capital"]
let keys2 = ["startOfWeek", "currencies", "languages"]

function dataProcessing(arr, data) {
    try {
        if (!data || Object.keys(data).length === 0)
            return [];
        let newArr = arr?.map(key => {
            let Pdata;
            if (key === "nativeName") {
                if (data['name']?.[key]?.hasOwnProperty("eng"))
                    Pdata = data['name']?.[key]?.['eng']?.['official'];
                else {
                    let Obkeys = Object.keys(data['name']?.[key]);
                    Pdata = data['name']?.[key]?.[Obkeys[0]]?.['official'];
                }
            }
            else if (key === "capital") {
                Pdata = data[key]?.join(", ");
            }
            else if (key === "currencies") {
                let Obkeys = Object.keys(data[key]);
                Pdata = Obkeys?.join(", ");
            }
            else if (key === "languages") {
                Pdata = Object.values(data[key])?.join(",");
            }
            else {
                Pdata = data[key];
            }
            let Pkey = key.replace(/([A-Z])/g, ' $1')
                .replace(/^./, function (str) { return str.toUpperCase(); })


            return { Pkey, Pdata }
        })
        return newArr;
    } catch (error) {
        console.log(error.message);
    }

}



export default function Page2({ data, setData }) {

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/');
    };
    const handleButtonClick2 = async (code) => {
        try {
            const res = await axios.get(`/alpha?codes=${code?.toLowerCase()}`);
            // console.log(res);
            setData(res.data[0]);

        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        if (!data || Object.keys(data).length === 0) {
            navigate('/');
        }
    }, [])


    return (

        <Box sx={{ bgcolor: "primary.dark" }} className={`${styles.main_body}`}>
            <Box sx={{ margin: "2% 0%" }}>
                <Button variant="contained" startIcon={<WestIcon />} onClick={handleButtonClick}>Back</Button>
            </Box>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
                <Box sx={{ flex: 2 }}>
                    <img src={data?.flags?.svg} alt="country-flag" style={{ width: "100%", maxHeight: "300px" }} />
                </Box>
                <Box sx={{ flex: 2 }}>
                    <Stack spacing={2}>
                        <Typography variant="h4" gutterBottom sx={{ color: "primary.contrastText" }}>
                            {data?.name?.official}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between">
                            <Box>
                                {
                                    dataProcessing(keys1, data)?.map((obj, index) => {
                                        return (
                                            <Box key={index} sx={{ display: "flex" }}>
                                                <Typography variant='body1' sx={{ color: "primary.contrastText" }}>{obj.Pkey}:</Typography>
                                                <Typography variant='body1' sx={{ color: "primary.contrastText" }}>{obj.Pdata}</Typography>
                                            </Box>
                                        )
                                    })

                                }
                            </Box>
                            <Box>
                                {
                                    dataProcessing(keys2, data)?.map((obj, index) => {
                                        return (
                                            <Box key={index} sx={{ display: "flex" }}>
                                                <Typography variant='body1' sx={{ color: "primary.contrastText" }}>{obj.Pkey}:</Typography>
                                                <Typography variant='body1' sx={{ color: "primary.contrastText" }}>{obj.Pdata}</Typography>
                                            </Box>
                                        )
                                    })

                                }
                            </Box>
                        </Stack>
                        <Box sx={{ display: "flex" }}>
                            <Typography variant="h5" sx={{ color: "primary.contrastText" }}
                                gutterBottom>
                                Borders:
                            </Typography>
                            {
                                findName(data?.borders)?.map((name, index) => {
                                    return <Button key={index} onClick={() => handleButtonClick2(name)} variant="contained" sx={{ margin: "0 5px" }}>{name}</Button>
                                })
                            }
                        </Box>
                    </Stack>
                </Box>
            </Stack >
        </Box >
    )
}
