import {useState} from 'react'
import { Button } from '@mui/material'
import Book from './Book'
import librarySdk from '../services/librarySdk'
import { useNavigate } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress';

const UserBook = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleBookAction = async (action) => {
        setLoading(true)
        try {
            const isbn = props.book.isbn;
            await librarySdk.handleBookAction(action, isbn);
            const updatedBooks = props.books.filter(curBook => curBook.isbn !== isbn)
            props.setBooks(updatedBooks)
            const user = await librarySdk.getUser(props.user.email)
            props.setUser(user)
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    }

    const getBookOnClick = () => {
        navigate(`/book/${props.book.isbn}`)
    }

    return (
        <>
        <style type="text/css">
        {`
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

            .book-panel-btn {
                margin:0.5rem
            }
        `}
        </style>

        <div className={"book-inner-container book-inner-container-mobile" }>
                <Book {...props} book={props.book} getBookOnClick={getBookOnClick} showBookDescription={true} />
                <Button  
                    className="book-panel-btn"
                    onClick={() => handleBookAction("return")}
                    variant="outlined"
                    color="secondary">
                    {loading? <CircularProgress  color="secondary"/> : "Return book"}
                </Button>
            </div>    
        </>
    )
}

export default UserBook;
