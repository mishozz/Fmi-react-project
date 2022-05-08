import {useRef} from 'react'
import Backdrop from '@mui/material/Backdrop';
import {MDBContainer} from 'mdb-react-ui-kit'
import CancelIcon from '@mui/icons-material/Cancel';
import BookList from './BookList';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const GenreBookListDrawer = (props) => {
    const listInnerRef = useRef();

    const onScroll = () => {
        if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          let currentHeight = scrollTop + clientHeight
          if (currentHeight === scrollHeight + 0.5 || currentHeight === scrollHeight) {
            props.increasePageNumber()
          }
        }
      };
    
    return (
        <div>
        <style type="text/css">
          {`

            .genre-container {     
                margin-top: 4rem;
                margin-bottom: 3rem;
                top: 0;
                bottom:0;
                position:fixed;
                overflow-y:scroll;
                overflow-x:clip;
                border-radius: 1rem;
                background: #18d59d;
                display:flex;
                flex-direction: column;
            }

            .genre-cansel-icon {
                margin: 1rem;
                height: 2em;
                width: 2em;
                cursor: pointer;
            }

            .genre-backdrop-title {
                text-align: center;
                font-size: 3.5rem;
                font-weight: bold;
            }
            
          `}
      </style>

            <Backdrop 
                className='genre-backdrop'
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.open}
            >
                    <MDBContainer ref={listInnerRef} onScroll={onScroll} className="genre-container">
                            <div>
                                <CancelIcon className="genre-cansel-icon" onClick={props.handleToggle}></CancelIcon>
                                <h1 className="genre-backdrop-title">{props.genreName}</h1>
                            </div>
                            <BookList 
                                books={props.books} 
                                showBookDescription={props.showBookDescription}
                                getBookOnClick={props.getBookOnClick}
                            /> 
                                { props.loadingMore &&
                                    <Box className="loading-box">
                                        <CircularProgress  color="secondary"/>
                                    </Box> 
                                }                   
                    </MDBContainer>
            </Backdrop>
        </div>
    )
}

export default GenreBookListDrawer;
