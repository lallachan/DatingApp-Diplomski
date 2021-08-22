import React from "react";
import cover from "../images/CoverPhoto.jpeg";
import { Row, Button, Col, Container } from "react-bootstrap";

import {Link} from "react-router-dom"
import "./LandingPage.css"

import LogIn from "./LogIn"

import logo from "../images/logo_transparent.svg"
import LandingRegister from "./LandingRegister";
import MapPage from "./MapPage";
import UserReviews from "./UserReviews";
import Footer from "./Footer";


function LandingPage() {


  return (
    <Container
    fluid
    
      style={{
        background: `url(${cover})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      }}
      className="page-holder bg-cover"
    >
      <Row style={{ textAlign: "right", width: "100%"}}>
       
      <Col lg={2}><img src={logo} style={{marginLeft:"80px",width:"100%"}} /></Col>
        <Col style={{padding:"20px"}} lg={10}>
         
       
          <Button variant="outline-light"  style={{padding:"20px",border:"2px solid white",backgroundColor:"#578BB8",marginTop:"20px"}}>
          <Link to="/register" style={{textDecoration:"none",color:"white",}}>Register</Link></Button>
        </Col>
      </Row>

    
      <Row style={{width:"100%",textAlign:"center",justifyContent:"center",marginTop:"-50px",marginBottom:"300px"}}>
      
      <Col className="loginBox" lg={4}>
      <h1 className="title">Dobrodošli u FindMe!</h1>
      <h4 className="subtitle">Ulogiraj se i pronađi srodnu dušu u samo nekoliko klikova!</h4>

      <LogIn/>

      </Col>

      <Col lg={6}>
      
      </Col>
       
      </Row>

      <LandingRegister/>
      <MapPage/>
      <UserReviews/>
      <Footer/>

    </Container>


  
  );
}

export default LandingPage;
