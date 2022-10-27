import React, {memo} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";

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

const ModalEditBooks = ({
                            open,
                            setOpen,
                            editBook,
                            setStatusForEditBook
                        }) => {
    console.log('edit')
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                open={open.open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 520}}>
                    <h2 id="parent-modal-title">Edit book</h2>
                    <Grid container spacing={2} sx={{width: '100%'}}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField defaultValue={open.obj?.book?.isbn} disabled={true} label="Isbn"
                                       variant="outlined"/>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField defaultValue={open.obj?.book?.title} disabled={true} label="Title"
                                       variant="outlined"/>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField defaultValue={open.obj?.book?.author} disabled={true} label="Author"
                                       variant="outlined"/>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField defaultValue={open.obj?.book?.published} disabled={true} label="Published"
                                       variant="outlined"/>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField defaultValue={open.obj?.book?.pages} disabled={true} label="Pages"
                                       variant="outlined"/>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField defaultValue={open.obj?.status}
                                       onChange={(e) => setStatusForEditBook(e.target.value)} label="Status"
                                       variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Button sx={{width: '50%', mt: 3, mr: 2, float: 'right'}} variant="outlined" color={'primary'}
                            onClick={() => editBook()}>Save</Button>
                </Box>
            </Modal>
        </>
    );
};

export default memo(ModalEditBooks);