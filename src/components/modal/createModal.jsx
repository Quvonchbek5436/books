import React, {memo} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

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

const CreateModal = ({open, setOpenCreateModal, createNewBook, setIsbnForCreateBook}) => {
    console.log('create')
    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpenCreateModal(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 600}}>
                    <h2 id="parent-modal-title">Add book</h2>
                    <TextField sx={{width: '100%'}} id="outlined-basic"
                               onChange={(e) => setIsbnForCreateBook(e.target.value)} label="ISBN" variant="outlined"/>
                    <Button size="large" sx={{marginTop: 3, width: '100%'}} variant="outlined" color={'primary'}
                            onClick={createNewBook}>Save</Button>

                </Box>
            </Modal>
        </>
    );
};

export default memo(CreateModal);