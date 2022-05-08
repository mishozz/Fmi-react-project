import React from 'react'
import Genre from './Genre'

const GenreList = ({genres, getBookOnClick, user}) => {
    return (
        <div>
            {genres.map(genre =>(
                <Genre
                    key={genre._id}
                    user={user}
                    genreName={genre.name}
                    getBookOnClick={getBookOnClick}
                />
            ))}
        </div>
    )
}

export default GenreList
