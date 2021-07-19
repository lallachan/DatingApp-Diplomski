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
              
                    <div className="profilePhoto">
                   
                    <img src={userData.imageUrl}/><br/><Button style={{marginTop:"10px"}}>Change Profile Photo</Button></div>
                    
                    
                    <div className="intro"> <p>{userData.firstName} {userData.lastName} , AGE</p>
                    <p>{userData.city},{userData.zip}</p></div>    


                    <h3>Gallery</h3>
                    <Button>Add New Photo</Button>

                    <h3>About</h3>

                    <div className="description"><input
                    placeholder="Add Education"
                    className="textarea">{userData.description}</input> <Button>Edit</Button></div>
                    <div className="description"><input 
                    placeholder="Add Job"
                    className="textarea">{userData.description}</input> <Button>Edit</Button></div>
                    <div className="description"><textarea
                    placeholder="Personal Description"
                    className="textarea">{userData.description}</textarea> <Button>Edit</Button></div>
                   
                   <h3>Hobbies</h3>
                  
                   <h5>Choose some of the hobbies you like.</h5>

                   <ol>

                        <li>Art</li>
                        <li>Health/Fitness</li>
                        <li>Food</li>
                        <li>Reading/Learning</li>
                        <li>Outdoor Activies</li>  
                        <li>Other</li>
                   </ol>


               </div>
           </Row>
        </Container>
    )
}

export default MyProfile
