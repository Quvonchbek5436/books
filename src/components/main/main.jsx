import React, {memo, useCallback, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import CardForBook from "../card/card";
import {axiosInstanceAnotherData, urlForMethod} from "../../config";
import Button from "@mui/material/Button";
import md5 from "md5";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import CreateModal from '../modal/createModal';
import ModalEditBooks from "../modal/modal";
import DeleteModal from '../modal/deleteModal';
import AlertAll from "../alert/alert";

const Main = ({}) => {
    const [open, setOpen] = useState({open: false, obj: {}});
    const [openAlert, setOpenAlert] = useState({open: false, text: '', severityStr: ''});
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState({open: false, id: null});
    const [isbnForCreateBook, setIsbnForCreateBook] = useState('')
    const [statusForEditBook, setStatusForEditBook] = useState('')
    const [data, setData] = useState([])

    const AlertFunction = (color, text) => {
        setOpenAlert({open: true, severityStr: color, text: text});
        setTimeout(() => {
            setOpenAlert({open: false, severityStr: "", text: ""});
        }, 2000);
    }

    //-------------------------------------GET ALL DATA--------------------------------------------------------

    // get oll books
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstanceAnotherData.get('books', {
                    headers: {
                        'Key': localStorage.getItem('key'),
                        'Sign': md5('GET' + urlForMethod + "books" + localStorage.getItem('secret')),
                    }
                })
                if (isMounted) {
                    setData([...res.data.data])
                }
            } catch (e) {
                console.log(e)
            }
        }
        getData()
        return () => {
            isMounted = false;
        }
    }, [localStorage.getItem('key')])


    //-------------------------------------CREATE--------------------------------------------------------

    //create books
    const createNewBook = async () => {
        try {
            const res = await axiosInstanceAnotherData.post('books', {
                isbn: isbnForCreateBook
            }, {
                headers: {
                    'Key': localStorage.getItem('key'),
                    'Sign': md5('POST' + urlForMethod + "books" + JSON.stringify({"isbn": `${isbnForCreateBook}`}) + localStorage.getItem('secret')),
                }
            })
            let obj = {
                book: res.data.data,
                status: 0
            }
            setData(prev => [...prev, obj])
            AlertFunction('success',`${res.data.message}`)
            setIsbnForCreateBook('')
        } catch (e) {
            console.log(e)
            AlertFunction('error',`${e.response.data.message}`)
        }
        setOpenCreateModal(false);
    }

    //-------------------------------------DELETE--------------------------------------------------------

    // delete book
    const deleteBook = useCallback(async (id) => {
        console.log(id)
        try {
            const res = await axiosInstanceAnotherData.delete('books/' + id, {
                headers: {
                    'Key': localStorage.getItem('key'),
                    'Sign': md5('DELETE' + urlForMethod + `books/` + id + localStorage.getItem('secret')),
                }
            })
            AlertFunction('success',`${res.data.message}`)
            setData([...res.data.data])
        } catch (e) {
            console.log(e)
            AlertFunction('error',`${e.response.data.message}`)
        }
        setOpenDeleteModal({open: false, id: null});
    },[setData])

    //edit book
    const editBook = async () => {
        try {
            const res = await axiosInstanceAnotherData.patch('books/' + open.obj.book.id, {
                book: {
                    isbn: open.obj.book.isbn,
                    title: open.obj.book.title,
                    author: open.obj.book.author,
                    published: parseInt(open.obj.book.published),
                    pages: parseInt(open.obj.book.pages)
                },
                status: parseInt(statusForEditBook ? statusForEditBook : open.obj.status)
            }, {
                headers: {
                    'Key': localStorage.getItem('key'),
                    'Sign': md5('PATCH' + urlForMethod + `books/` + open.obj.book.id + JSON.stringify({
                        "book": {
                            "isbn": `${open.obj.book.isbn}`,
                            "title": `${open.obj.book.title}`,
                            "author": `${open.obj.book.author}`,
                            "published": parseInt(`${open.obj.book.published}`),
                            "pages": parseInt(`${open.obj.book.pages}`)
                        },
                        "status": parseInt(`${statusForEditBook ? statusForEditBook : open.obj.status}`)
                    }) + localStorage.getItem('secret')),
                }
            })
            let books = [];
            books = data?.filter((d) => {
                if(d.book.id === res.data.data.book.id){
                    d.status=res.data.data.status;
                }
                return d
            })
            setData(books)
            AlertFunction('success',`${res.data.message}`)
        } catch (e) {
            console.log(e)
            AlertFunction('error',`${e.response.data.data.message}`)
        }
        setOpen({open: false, obj: {}})
    }

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3}}>
                <Button size="large" variant="outlined" color={'success'}
                        onClick={() =>setOpenCreateModal(true)}><AddIcon/></Button>
            </Box>
            <Grid spacing={2} container alignItems="stretch">
                {
                    data?.map((book) => (
                        <Grid item key={book.book.id} lg={3} md={4} sm={6} xs={12}>
                            <CardForBook sx={{width: '100%', marginRight: 3}} book={book} setOpen={setOpen}
                                         setOpenDeleteModal={setOpenDeleteModal} open={open}
                                         editBook={editBook}/>
                        </Grid>
                    ))
                }
            </Grid>

            {/*new book create modal*/}
            <CreateModal open={openCreateModal} setIsbnForCreateBook={setIsbnForCreateBook}
                          setOpenCreateModal={setOpenCreateModal} createNewBook={createNewBook}/>

            {/*edit book modal*/}
            <ModalEditBooks open={open} setOpen={setOpen}
                            setStatusForEditBook={setStatusForEditBook}
                            editBook={editBook}/>

            {/*delete book modal*/}
            <DeleteModal open={openDeleteModal} deleteBook={deleteBook}
                         setOpenDeleteModal={setOpenDeleteModal}/>

            {/*alert all request*/}
            <AlertAll openAlert={openAlert} setOpenAlert={setOpenAlert} />
        </>
    );
};

export default memo(Main);