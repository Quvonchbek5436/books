import React, {memo, useState} from 'react';
import MiniDrawer from "../components/drower/drower";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {axiosInstanceAnotherData, urlForMethod} from "../config";
import md5 from "md5";
import Grid from "@mui/material/Grid";
import SearchCardForBook from "../components/card/searchCard";
import {LinearProgress} from "@mui/material";
import AlertAll from "../components/alert/alert";

const SearchPage = () => {
    const [searchString, setSearchString] = useState('')
    const [searchData, setSearchData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [openAlert, setOpenAlert] = useState({open: false, text: '', severityStr: ''});

    const AlertFunction = (color, text) => {
        setOpenAlert({open: true, severityStr: color, text: text});
        setTimeout(() => {
            setOpenAlert({open: false, severityStr: "", text: ""});
        }, 2000);
    }
    //-------------------------------------SEARCH--------------------------------------------------------

    //search books
    const searchBook = async () => {
        setIsLoading(true)
        try {
            const res = await axiosInstanceAnotherData.get('books/' + searchString, {
                headers: {
                    'Key': localStorage.getItem('key'),
                    'Sign': md5('GET' + urlForMethod + "books/" + searchString + localStorage.getItem('secret')),
                }
            })
            setSearchString('')
            setSearchData([...res.data.data])
            setIsLoading(false)
            AlertFunction('success', `${res.data.message}`)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            AlertFunction('error', `${e.response.data.message}`)
        }
    }
    return (
        <MiniDrawer>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3}}>
                <TextField sx={{width: '30%', marginRight: 3}} id="outlined-basic" label="Search Book"
                           variant="outlined"
                           onChange={(e) => setSearchString(e.target.value)}/>
                <Button size="large" sx={{marginRight: 3}} variant="outlined" color={'primary'}
                        onClick={searchBook}>Search</Button>
            </Box>

            <Grid spacing={2} container alignItems="stretch">
                {
                    isLoading ?
                        <LinearProgress sx={{width: '100%'}}/> : searchData?.map((book, index) => (
                            <Grid item key={index} lg={3} md={4} sm={6} xs={12} sx={{minHeight: '380px'}}>
                                <SearchCardForBook sx={{width: '100%', marginRight: 3}} book={book}/>
                            </Grid>
                        ))

                }
            </Grid>

            {/*alert all request*/}
            <AlertAll openAlert={openAlert} setOpenAlert={setOpenAlert} />
        </MiniDrawer>
    );
};

export default memo(SearchPage);