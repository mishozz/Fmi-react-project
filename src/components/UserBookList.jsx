import { Container } from "@material-ui/core";
import UserBook from "./UserBook"

const UserBookList = (props) => {


    return (
        <>
        <style type="text/css">
        {`
            .MuiContainer-root{
               background:#ffe8b9; 
               display: flex;
               justify-content: space-around;
            }

            @media only screen and (max-width: 980px) {
                .MuiContainer-root {
                    align-items: center;
                    flex-direction: column;
                }
            }

            .no-books-title {
                text-align: center;
            }
        `}
        </style>

        <Container>
            {props.books.length === 0 ? (
                <h1 className="no-books-title">You have not taken any books</h1>
            ) : (
                props.books.map(book => <UserBook {...props} book={book} key={book._id}/>)
            )}
        </Container>
        </>
    )
}

export default UserBookList;
