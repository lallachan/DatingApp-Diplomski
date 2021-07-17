import React, { useContext } from 'react'
import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    Dropdown
  } from "react-bootstrap";
import myContext from './contexts/myContext';
import "./MyProfile.css"

function MyProfile() {

    const {userData} = useContext(myContext)
    
    return (
        <Container fluid>
           <Row>
               <div className="profile">
                    <img width="50px" src={userData.imageUrl}/>
                    <p>{userData.firstName} {userData.lastName}</p>
                    <p>{userData.city}</p>
                    <p>{userData.description}</p>
                    <p>{userData.dob}</p>
               </div>
           </Row>
        </Container>
    )
}

export default MyProfile
