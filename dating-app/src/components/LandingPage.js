import React from "react";
import cover from "../images/CoverPhoto.jpeg";
import { Row, Button, Col, Container, Form } from "react-bootstrap";

import {Link} from "react-router-dom"
import "./LandingPage.css"

import LogIn from "./LogIn"

import logo from "../images/logo_transparent.svg"
import LandingRegister from "./LandingRegister";
import MapPage from "./MapPage";
import UserReviews from "./UserReviews";
import Footer from "./Footer";
import { useState } from "react";

import {FaArrowCircleUp} from 'react-icons/fa';

import { Typeahead } from 'react-bootstrap-typeahead'; 

import { default as postal } from "./Files/Postal.json";

function LandingPage() {

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)


  const [singleSelections, setSingleSelections] = useState([]);

  const [options, setOptions] = useState(postal);

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
       
      <Col lg={2} md={2} sm={2}><img src={logo} id="myLogo" style={{marginLeft:"80px",width:"250px"}} /></Col>
        <Col style={{padding:"20px"}} lg={10} md={10} sm={10}>
         
       
          <Button  className="registerBtn">
          <a style={{textDecoration:"none",color:"white"}} href="#register_user" >Register</a></Button>
        </Col>
      </Row>

    
      <Row style={{width:"100%",textAlign:"center",justifyContent:"center",marginTop:"-50px",marginBottom:"300px"}}>
      
      <Col className="loginBox" lg={4}>
      <h1 className="title">Dobrodošli u FindMe!</h1>
      <h4 className="subtitle">Ulogiraj se i pronađi srodnu dušu u samo nekoliko klikova!</h4>



      <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 40,color:"#DF314D",display: showScroll ? 'flex' : 'none'}}/>


      <LogIn/>

      </Col>

      <Col lg={6}>
      
      </Col>
       
      </Row>


    </Container>


  
  );
}

export default LandingPage;
