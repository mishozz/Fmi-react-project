import {  CircularProgress } from '@material-ui/core';
import React, { useState } from 'react'
import librarySdk from '../../services/librarySdk'
import BookForm from '../books/BookForm';


const initialBook = {
    title: "Title example",
    description: "Description example",
    availableCopies: 1,
    imageSource: "Img Example",
    genre: "Genre Example"
}

const AddBookPanel = ({genres}) => {
    const [createInProgress, setCreateInProgress] = useState(false);
    const [bookCreated, setBookCreated] = useState(false);

    const submitForm = async (book) => {
        setCreateInProgress(true);
        try {
            await librarySdk.createBook(book)
            setBookCreated(true)
            setTimeout(()=> {
                setBookCreated(false);
            }, 5000)
        } catch(e) {
            console.log(e);
        }
        setCreateInProgress(false);
    }

    return (
        <>  
                <style type="text/css">
                {`
                    .book-created-container {
                        display: flex;
                        background-color: #18d59d;
                        border-radius: 0.5rem;
                        align-items:center;
                        justify-content: center;
                        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    }

                `}
                </style>

            {bookCreated && (
                <div className="book-created-container">
                    <h2>Book created</h2>
                </div>
            )}
            { createInProgress ?
                <CircularProgress color="secondary"/>
                :
                <BookForm submitForm={submitForm} formSubmitText={"Create Book"} book={initialBook} genres={genres}/>
            }
        </>
    )
}

export default AddBookPanel;
