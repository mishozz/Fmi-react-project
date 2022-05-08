import { useState } from "react";
import {MDBContainer} from 'mdb-react-ui-kit'
import BookList from "./BookList";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import GenreBackdrop from './GenreBackdrop'
import useBookSearch from '../hooks/useBookSearch'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Genre = ({genreName, getBookOnClick, user}) => {
  const [isHovering, setIsHovering] = useState(false);

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    if(pageNumber === 1) {
      increasePageNumber();
    }
    setOpen(!open);
  };

  const [pageNumber, setPageNumber] = useState(1)

  const increasePageNumber = () => {
    if(!hasMore) return;
    if(loading) return;
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }

  const {
    genreBooks,
    hasMore,
    loading
  } = useBookSearch(genreName, pageNumber, 4)

  const homePageBooksInfo = useBookSearch(genreName,1, 4);

  return (
    <div >
      <style type="text/css">
          {`
            .container {
              margin-top: 1rem;
            }

            .title-container {
              background-color: #18d59d;
              border-radius: 0.5rem;
              display:flex;
              align-items: baseline;
              box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;;
            }
            .title {
              font-weight: bold;
              margin:0.3rem 0.3rem 0.3rem 2rem;
            }

            .explore {
              font-weight: bold;
              font-size: 0.9rem;
            }

            .see-all-link-container {
              display:flex;
              align-items: baseline;
              cursor: pointer
            }

            .loading-box {
              display: flex;
              justify-content: center;
              margin: 1rem;
            }
          `}
      </style>

      { loading && (
          <Box  className='loading-box' >
            <CircularProgress/> 
          </Box>
        ) 
      }

      {genreBooks.length !== 0 && (
        <MDBContainer >
        <GenreBackdrop 
          open={open}
          handleToggle={handleToggle}
          books={genreBooks}
          showBookDescription={false}
          genreName={genreName}
          loadingMore={loading}
          increasePageNumber={increasePageNumber}
          getBookOnClick={getBookOnClick}
        />
        <div className="title-container">        
          <div className="see-all-link-container"
            onClick={handleToggle}
            onMouseOver={()=>setIsHovering(true)}
            onMouseOut={()=>setIsHovering(false)}
          >
            <h2 className="title">{genreName}</h2>

            {isHovering &&
              <div>
                  <small className="explore">Explore All</small>
                  <KeyboardArrowRightIcon/>
              </div>
            }

          </div>
        </div>
          <BookList user={user} books={homePageBooksInfo.genreBooks} showBookDescription={false} getBookOnClick={getBookOnClick}/>
        </MDBContainer>
      )}
    </div>
  );
};

export default Genre;
