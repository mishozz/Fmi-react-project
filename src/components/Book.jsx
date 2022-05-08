import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardText, MDBCardTitle,MDBCardFooter} from 'mdb-react-ui-kit'
import Collapse from '@material-ui/core/Collapse'
import ExpandMore from '@mui/icons-material/ExpandMore';
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import { ExpandLess } from "@material-ui/icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;


const Book = (props) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const navigate = useNavigate();

    const handleGoToBookClick = () => {
        props.getBookOnClick(props.book)
        navigate(`/book/${props.book.isbn}`);
    }

    return (
        <Container>
             <style type="text/css">
                {`
                    .card-img-top {
                        object-fit:contain;
                        height: 30vh;
                        padding: 10px;
                    }
                    .card {
                        margin: 20px;
                        width: 16rem;
                        cursor: pointer;
                    }

                    .card-title {
                        color: black
                    }

                    .available {
                        color: green !important;
                    }
                    .unavailable {
                        color: red !important;
                    }
                    .card-text {
                        font-weight: bold;
                    }

                    .innerContainer {
                        margin-bottom: 0.5rem;
                        color: black;
                    }

                    .MuiCollapse-root {
                        background-color: #e0e0e0;
                        border-radius: 0.5rem;
                    }

                    .collapse-paragraph {
                        margin: 0.5rem;
                    }
            `}
            </style>

            <MDBCard className='mb-3' onClick={handleGoToBookClick}>
                <MDBCardImage
                    src={props.book.imageSource}
                    alt='...'
                    position='top'
                />
                <MDBCardBody>
                    <MDBCardTitle>{props.book.title}</MDBCardTitle>
                    <div className="innerContainer">
                        { props.book.availableCopies ? 
                            <MDBCardText className="available">Available</MDBCardText> : 
                            <MDBCardText className="unavailable">Unavailable at the moment</MDBCardText> 
                        }
                    </div>
                    {
                    props.showBookDescription &&
                    <div className="innerContainer">
                        <MDBCardText>
                            About this book
                           {expanded ? <ExpandLess
                                onClick={handleExpandClick}
                                aria-label="show less"
                            />:
                            <ExpandMore
                                onClick={handleExpandClick}
                                aria-label="show more"
                            />
                            }                              
                        </MDBCardText>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <p className="collapse-paragraph">{props.book.description}</p>
                        </Collapse>
                    </div> 
                    }
                </MDBCardBody>
                <MDBCardFooter>
                    <Rating
                        name="read-only"
                        value={props.book.rating}
                        readOnly
                    />                   
                </MDBCardFooter>
            </MDBCard>
        </Container>
    )
}

export default Book
