import React, { useContext } from 'react'
import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    Spinner
  } from "react-bootstrap";
import Map from './Map';
import Header from "./Header"




function Main() {


    
   


    return (
        <Container fluid>
        
        <Row><Header/></Row>
        <Row style={{textAlign:"center",marginTop:"30px"}}><h1>Welcome Back!</h1></Row>
        <br/>

        <Map/>

        </Container>
    )

    
}

export default Main
