import React, {memo} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Grid} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const deleteModal = ({open, deleteBook, setOpenDeleteModal}) => {
    console.log('delete')
    return (
        <>
            <Modal
                open={open.open}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 600}}>
                    <h2 id="parent-modal-title">Are you sure you want to delete it?</h2>
                    <Grid container spacing={2} columnSpacing={2}>
                        <Grid item lg={6}>
                            <Button sx={{width: '100%'}} variant="outlined" color={'error'}
                                    onClick={() => setOpenDeleteModal({open: false, id: null})}>NO</Button>
                        </Grid>
                        <Grid item lg={6}>
                            <Button sx={{width: '100%'}} variant="outlined" color={'primary'}
                                    onClick={() => deleteBook(open.id)}>OK</Button>
                        </Grid>

                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default memo(deleteModal);