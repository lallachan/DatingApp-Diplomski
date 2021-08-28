import React from 'react'
import  './logoSpinner.css'
import logo from '../../images/logo_transparent.png'
import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    Dropdown,
    NavDropdown,
    Badge,
    Nav,
    Navbar,
    
  } from "react-bootstrap";
function LogoSpinner() {
    return (
        <Container fluid>
            <Row >
                <Col className="d-flex justify-content-center" style={{marginTop:"300px"}}>
                <img src={logo} class="rotate" width="100" height="100" /> 
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center">
                <h3 className="title-app" style={{marginLeft:"10px",marginTop:"20px"}}>FindMe</h3>
                </Col>
            </Row>
           
           
        </Container>
    )
}

export default LogoSpinner
