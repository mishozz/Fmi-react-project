import React from 'react'
import { useNavigate } from 'react-router'
import Genre from '../components/genres/Genre';

const GenrePanel = ({genreName, getBookOnClick}) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    }

    return (
        
        <>
              <style type="text/css">
          {`
            .go-back-container {
              margin: 2rem;
              width: 10rem;
            }
          `}
      </style>
            <div className="go-back-container">
                <h1 style={{cursor:"pointer"}} onClick={goBack}>Go Back</h1>
            </div>
            <Genre genreName={genreName} getBookOnClick={getBookOnClick} />
        </>
    )
}

export default GenrePanel
