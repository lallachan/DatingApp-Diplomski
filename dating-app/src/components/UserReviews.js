import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./UserReviews.css"

import girl from "../images/girl.jpeg"
import star from "../images/star.svg"
import boy from "../images/boy.jpeg"
import boy2 from "../images/boy2.jpeg"

function UserReviews() {
  return (
    <Container 
    fluid
    style={{
        backgroundColor:"#A8CEED",
       
        
        
      }}
      className="page-holder bg-cover"
    >
    
    <Row>
    <Col style={{marginTop:"50px"}}>
    <h1 className="reviews">Pitali smo korisnike</h1> 
    </Col>
    </Row>
   
      
    <Row style={{width:"100%",justifyContent:"center",textAlign:"center"}}>

   
        <Col lg={2} className="userBox">
        <img src={girl} id="profilePhoto"/>
          <h1>Ivana Ivanic</h1>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.{" "}
          </p>

           
          <i class="fas fa-star">5 stars</i>
        </Col>

        <Col lg={2} className="userBox" style={{backgroundColor:"#DF314D"}}>
        <img src={boy} id="profilePhoto"/>
          <h1>Sven Tadić</h1>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.{" "}
          </p>

           
          <i class="fas fa-star">5 stars</i>
        </Col>

        <Col lg={2} className="userBox">
        <img src={boy2} id="profilePhoto"/>
          <h1>Marko Markić</h1>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.{" "}
          </p>

           
          <i class="fas fa-star">4 stars</i>
        </Col>

      
     
      </Row>
    </Container>
  );
}

export default UserReviews;
