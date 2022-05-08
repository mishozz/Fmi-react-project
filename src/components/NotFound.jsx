import { MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'

const NotFound = ({errorMessage}) => {


    return (
        <div>
            <style type="text/css">
            {`
                .container {
                    display: flex;
                    justify-content: center;   
                    flex-direction: column;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    margin-top: 2rem;
                }   
                
                .not-found-title {
                    margin: 2rem;
                    text-align: center;
                }
            `}
            </style>
            
            <MDBContainer>
                <h1 className="not-found-title">Page not found</h1>
                <h3 className="not-found-title">{errorMessage}</h3>
            </MDBContainer>
        </div>
    )
}

export default NotFound
