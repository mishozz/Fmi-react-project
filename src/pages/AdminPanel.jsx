
import { MDBContainer } from "mdb-react-ui-kit";
import AddBookPanel from "../components/books/AddBookPanel";
import AddGenrePanel from "../components/genres/AddGenrePanel";


const AdminPanel = ({genres, setGenres}) => {
    return (


        <>

<style type="text/css">
            {`
                .admin-container {   
                    display: flex;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    margin-top: 2rem;
                    padding: 2rem;
                    align-items: center;
                    border-radius: 1rem
                } 

                @media only screen and (max-width: 780px) {
                    .admin-container {
                        flex-direction: column
                    }
                }
            `}
            </style>

        <MDBContainer className="admin-container">
            <MDBContainer>
                <AddBookPanel genres={genres}/>
            </MDBContainer>
            <MDBContainer>
                <AddGenrePanel genres={genres} setGenres={setGenres}/>
            </MDBContainer>
        </MDBContainer>

        </>
    )
}

export default AdminPanel;
