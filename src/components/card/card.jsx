import React, {memo} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {ButtonBase} from '@mui/material';
import styled from 'styled-components';
import Box from "@mui/material/Box";

const CardForBook = ({book, setOpen, setOpenDeleteModal}) => {
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
    });

    return (
        <>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Box>
                    <ButtonBase sx={{width: "100%", height: "300px", padding: 2, objectFit: 'cover'}}>
                        <Img src={book.book?.cover} alt="green iguana"/>
                    </ButtonBase>
                    <CardContent sx={{pt: 0}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.book?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Author:{book.book?.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Pages:{book.book?.pages}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Status:{book?.status}
                        </Typography>
                        <Box>
                            <Typography variant="body3" color="text.secondary">
                                Published: {book.book?.published}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
                <CardActions sx={{justifyContent: 'space-between', px: 2}}>
                    <Button sx={{width: '50%'}} variant="outlined" color={'primary'}
                            onClick={() => setOpen({open: true, obj: book})}><EditIcon/></Button>
                    <Button sx={{width: '50%'}} variant="outlined" color={'error'}
                            onClick={() => setOpenDeleteModal({open: true, id: book.book?.id})}><DeleteIcon/></Button>
                </CardActions>
            </Card>

        </>
    );
};

export default memo(CardForBook);