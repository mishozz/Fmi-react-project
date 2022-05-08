import React from 'react'
import Genre from './Genre'

const GenreList = ({genres, getBookOnClick}) => {
    return (
        <div>
            {genres.map(genre =>(
                <Genre
                    key={genre._id}
                    genreName={genre.name}
                    getBookOnClick={getBookOnClick}
                />
            ))}
        </div>
    )
}

export default GenreList
