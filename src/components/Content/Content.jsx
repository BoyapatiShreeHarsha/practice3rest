import { Box, Paper, Grid, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Cards from '../Card/Cards';
import _ from 'lodash'
import Filter from '../Filter/Filter';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

let options = ["Africa", "America", "Asia", "Europe", "Oceania"];




export default function Content({ }) {
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
            console.log(res.data)
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
            if (regionValue !== "") {
                const debounce = setTimeout(async () => {

                    if (searchRef.current === null || searchRef.current !== regionValue) {
                        searchRef.current = regionValue;

                        if (regionValue) {
                            loadingUpdate(true);
                            const res = await axios.get(`/region/${regionValue?.toLowerCase()}`);
                            loadingUpdate(false);
                            setMyData(res.data);
                        }
                    }
                }, 300);

                return () => {
                    clearTimeout(debounce);
                }
            }
            else {
                getAllData();
            }

        } catch (error) {
            console.log(error.message);
            loadingUpdate(false);
        }


    }, [regionValue])

    useEffect(() => {
        try {
            if (searchValue !== "") {
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
            }
            else {
                getAllData();
            }
        } catch (error) {
            console.log(error.message);
            loadingUpdate(false);
        }

    }, [searchValue])

    console.log("isLoading======++++++++>", isLoading)
    return (
        <Box sx={{ bgcolor: "primary.dark", scrollbarWidth: "none", overflowX: "scroll", padding: "0 5%", height: "calc(100% - 64px)" }}>
            <Filter value={searchValue} setValue={setSearchValue} regionValue={regionValue} setRegionValue={setRegionValue} options={options} />
            {isLoading ? <Typography variant='h3' >Loading</Typography> :
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container rowSpacing={2} spacing={2}>
                        {
                            myData?.map((obj, index) => {
                                return <Grid key={index} item xs={12} md={3} onClick={() => {

                                    navigate('/country');
                                    setData(obj)
                                }}>
                                    <Cards
                                        data-testid={`card${index}`}
                                        name={obj?.name?.official} population={obj?.population} region={obj?.region} capitalArr={obj?.capital} img={obj?.flags?.svg} />
                                </Grid>
                            })
                        }
                    </Grid>
                </Box>}
        </Box>

    )
}