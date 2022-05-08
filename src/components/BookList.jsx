import Book from './Book'
import {MDBCardGroup } from 'mdb-react-ui-kit';

const BookList = (props) => {
    return (     
        <div >
            <style type="text/css">
                {`
                    .card-group {
                    justify-content: center;
                }
            `}
            </style>
            <MDBCardGroup >
                    { props.books.map((book) => 
                             <Book key={book._id} {...props} book={book} />                    
                        )}
            </MDBCardGroup>
        </div>
    )
}

export default BookList;
