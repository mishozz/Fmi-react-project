import { useParams, useNavigate } from 'react-router-dom'
import {useEffect,useState} from 'react'
import { Button } from '@mui/material'
import { MDBContainer } from 'mdb-react-ui-kit'
import Book from './Book'
import librarySdk from '../services/librarySdk'
import NotFound from './NotFound'
import Comments from './comments/Comments'
import EditBookBackdrop from './EditBookBackdrop'
import { CircularProgress } from '@material-ui/core'
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ExpandLess } from "@material-ui/icons";

const BookPanel = (props) => {
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
    const [isBookTaken, setIsBookTaken] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [editInProgress, setEditInProgress] = useState(false);
    const [loading, setLoading] = useState(false); 

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };


    const {isbn} = useParams();

    const handleBackdropToggle = () => {
        setOpenBackdrop(!openBackdrop);
    }

    const isUndefined = (item) => {
        return (typeof item === "undefined")
    }

    const handleBookAction = async (action) => {
        if (isUndefined(props.user)) {
            navigate("/register");
            return;
        }
        setLoading(true);
        try {
            await librarySdk.handleBookAction(action, isbn);
            setIsBookTaken(!isBookTaken);
            if(!isBookTaken) {
                props.setUserBooks(prevBooks => [...prevBooks, props.book])
            } else {
                props.setUserBooks(prevBooks => (
                    prevBooks.filter(book => book.isbn !== isbn)
                ))
            }
            const user = await librarySdk.getUser(props.user.email)
            props.setUser(user)
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    }

    useEffect(() => {
        let currentUser = localStorage.getItem('user');
        if (currentUser === "undefined") {
            setIsBookTaken(false);
            return
        }
        
        currentUser = JSON.parse(currentUser);
        props.setUser(currentUser);
        if (currentUser.takenBooks.includes(isbn)) {
            setIsBookTaken(true);
        } else {
            setIsBookTaken(false);
        }
    }, [])

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await librarySdk.fetchBook(isbn);
                props.setBook(book);
            } catch (e) {
                setNotFound(true);
            }
        }
        if(props.book.isbn !== isbn) {          
           fetchBook()
        }       
    }, [isbn])



    return (
        <div>
            <style type="text/css">
            {`
                .container {   
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    margin-top: 2rem;
                    align-items: center;
                    border-radius: 1rem
                } 


                .book-inner-container{
                    margin-left: 1rem;
                    align-items: center;
                    justify-content: center; 
                    display: inline-flex       
                }
                @media only screen and (max-width: 780px) {
                    .book-inner-container-mobile {
                        align-items: center;
                        justify-content: center;
                        display: flex;   
                        flex-direction: column
                    }
                }
                @media only screen and (min-width: 780px) {
                    .comments-container {
                        margin:2rem
                    }
                }

                .book-panel-btn {
                    margin:0.5rem
                }

                .edit-container {
                    display: flex;
                    flex-direction: column
                }
            `}
            </style>

            {notFound && <NotFound errorMessage={`Book can't be found`}/>}
            {!isUndefined(props.book.isbn) && 
                <MDBContainer>
                <div className={"book-inner-container book-inner-container-mobile" }>
                    <Book {...props}  showBookDescription={true} />
                    {!isBookTaken ? (
                        <Button 
                            className="book-panel-btn"
                            onClick={() => handleBookAction("take")}
                            variant="outlined"
                            color="secondary">
                            {loading? <CircularProgress  color="secondary"/> : "Take book"}
                        </Button>) : (
                        <Button  
                            className="book-panel-btn"
                            onClick={() => handleBookAction("return")}
                            variant="outlined"
                            color="secondary">
                            {loading? <CircularProgress  color="secondary"/> : "Return book"}
                        </Button>
                    )}
                    {props.user && props.user.role === "ADMIN" && 
                    ( <div className="edit-container">
                        <Button 
                            onClick={handleBackdropToggle}
                            className="book-panel-btn"
                            variant="outlined" 
                            color="secondary">
                            { editInProgress ?
                                <CircularProgress  color="secondary"/>
                                :
                                <>
                                Edit Book
                                { expanded ? <ExpandLess
                                    onClick={handleExpandClick}
                                    aria-label="show less"
                                />:
                                <ExpandMore
                                    onClick={handleExpandClick}
                                    aria-label="show more"
                                />
                                }  
                                </>
                            }
                        </Button>          
                        <EditBookBackdrop
                            book={props.book}
                            setBook={props.setBook}
                            setEditInProgress={setEditInProgress}
                            openBackdrop={openBackdrop}
                            genres={props.genres}
                            handleBackdropToggle={handleBackdropToggle}
                        />
                    </div> )}
                </div>
                <div className="comments-container">
                    <Comments
                        currentUserId="1"
                        user={props.user}
                        bookIsbn={isbn}
                    />
                </div>
                </MDBContainer> 
            }
        </div>
    )
}

export default BookPanel;
