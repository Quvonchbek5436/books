import React, {memo} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {ButtonBase} from '@mui/material';
import styled from 'styled-components';
import Box from "@mui/material/Box";

const SearchCardForBook = ({book}) => {
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
    });

    return (
        <>
            <Card sx={{height: '100%'}}>
                <ButtonBase sx={{width: "100%", height: "300px", padding: 2, objectFit: 'cover'}}>
                    <Img src={book?.cover} alt="green iguana"/>
                </ButtonBase>
                <CardContent sx={{pt: 0}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {book?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Author:{book?.author}
                    </Typography>
                    <Box sx={{mb: 2}}>
                        <Typography variant="body3" color="text.secondary">
                            Published: {book?.published}
                        </Typography>
                    </Box>
                    <Typography variant="body" color="text.primary">
                        Isbn:{book?.isbn}
                    </Typography>
                </CardContent>
            </Card>

        </>
    );
};

export default memo(SearchCardForBook);