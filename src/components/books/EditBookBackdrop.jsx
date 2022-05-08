import {  Collapse } from '@material-ui/core';

import librarySdk from '../../services/librarySdk';
import BookForm from './BookForm';



const EditBookBackdrop = ({book, openBackdrop, setBook, setEditInProgress, handleBackdropToggle, genres}) => {
    const submitForm = async (values) => {
        setEditInProgress(true)
        try {
            const updatedBook =  await librarySdk.editBook(book.isbn, values.description,values.title,values.availableCopies,values.genre,values.imageSource)
            setBook(updatedBook);
        } catch(err) { 
            console.log(err);
        }
        handleBackdropToggle();
        setEditInProgress(false)
      }

    return (
        <>
        <Collapse in={openBackdrop} timeout="auto" unmountOnExit
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
        >
            <BookForm submitForm={submitForm} formSubmitText={"Update Book"} book={book} genres={genres}/>
        </Collapse>

        </>
    )
}

export default EditBookBackdrop;
