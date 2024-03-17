import { Box, Paper, Grid, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Cards from '../Card/Cards';
import _ from 'lodash'
import Filter from '../Filter/Filter';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';






export default function Content({ setData }) {
    const navigate = useNavigate();
    const [myData, setMyData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef(null);
    const [regionValue, setRegionValue] = useState(null);

    const debouncedloadingUpdate = _.debounce((newValue) => {
        setIsLoading(newValue);
    }, 500);

    const loadingUpdate = (newValue) => {
        debouncedloadingUpdate(newValue);
    };


    const getAllData = async () => {
        try {
            loadingUpdate(true);
            const res = await axios.get("/all");
            setMyData(res.data);
            loadingUpdate(false);
        } catch (error) {
            console.log(error.message)
            loadingUpdate(false);
        }
    }
    useEffect(() => {
        getAllData();
    }, [])

    useEffect(() => {
        try {
            const debounce = setTimeout(async () => {
                try {
                    if (searchRef.current === null || searchRef.current !== regionValue) {
                        searchRef.current = regionValue;

                        if (regionValue) {
                            loadingUpdate(true);
                            const res = await axios.get(`/region/${regionValue?.toLowerCase()}`);

                            setMyData(res.data);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                finally {
                    loadingUpdate(false);
                }

            }, 300);

            return () => {
                clearTimeout(debounce);
            }
        }
        catch (error) {
            console.log(error.message);
            loadingUpdate(false);
        }


    }, [regionValue])

    useEffect(() => {
        try {
            const debounce = setTimeout(async () => {
                if (searchRef.current === null || searchRef.current !== searchValue) {
                    try {
                        searchRef.current = searchValue;
                        loadingUpdate(true);
                        const res = await axios.get(`/name/${searchValue}`);

                        setMyData(res.data);
                    } catch (error) {
                        console.log("Not found---------------->", error.message);
                    } finally {
                        loadingUpdate(false);
                    }
                }
            }, 300);

            return () => {
                clearTimeout(debounce);
            }

        } catch (error) {
            console.log(error.message);
            loadingUpdate(false);
        }

    }, [searchValue])


    return (
        <Box sx={{ bgcolor: "primary.dark", scrollbarWidth: "none", overflowX: "scroll", padding: "0 5%", height: "calc(100% - 64px)" }}>
            <Filter value={searchValue} setValue={setSearchValue} regionValue={regionValue} setRegionValue={setRegionValue} />
            {isLoading ? <Typography variant='h3' >Loading</Typography> :
                <Box sx={{ width: "100%", margin: "0 auto" }}>
                    <Grid container rowSpacing={2} spacing={2}>
                        {
                            myData?.map((obj, index) => {
                                return <Grid data-testid={`card${index}`} key={index} item xs={12} sm={6} md={3} onClick={() => {

                                    navigate('/country');
                                    setData(obj)
                                }}>
                                    <Cards

                                        name={obj?.name?.official} population={obj?.population} region={obj?.region} capitalArr={obj?.capital} img={obj?.flags?.svg} />
                                </Grid>
                            })
                        }
                    </Grid>
                </Box>}
        </Box>

    )
}
