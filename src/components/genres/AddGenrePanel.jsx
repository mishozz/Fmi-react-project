import {  CircularProgress } from '@material-ui/core';
import React, { useState } from 'react'
import librarySdk from '../../services/librarySdk'
import GenreForm from '../genres/GenreForm';


const AddGenrePanel = ({genres, setGenres}) => {
    const [createInProgress, setCreateInProgress] = useState(false);
    const [genreCreated, setGenreCreated] = useState(false);

    const submitForm = async (genre) => {
        setCreateInProgress(true);
        try {
            const newGenre = await librarySdk.createGenre(genre)
            setGenres([...genres, newGenre])
            setGenreCreated(true)
            setTimeout(()=> {
                setGenreCreated(false);
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
                    .genre-created-container {
                        display: flex;
                        background-color: #18d59d;
                        border-radius: 0.5rem;
                        align-items:center;
                        justify-content: center;
                        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    }

                `}
                </style>

            {genreCreated && (
                <div className="genre-created-container">
                    <h2>Genre created</h2>
                </div>
            )}
            { createInProgress ?
                <CircularProgress color="secondary"/>
                :
                <GenreForm submitForm={submitForm} formSubmitText={"Create genre"} genres={genres}/>
            } 
        </>
    )
}

export default AddGenrePanel;
