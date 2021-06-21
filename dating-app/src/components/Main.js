import React from 'react'
import {
    Alert,
    Button,
    Col,
    Container,
    Row,
  } from "react-bootstrap";
import Map from './Map';

function Main() {
    return (
<Container fluid>
  
<Row style={{textAlign:"center",marginTop:"30px"}}><h1>Welcome Back!</h1></Row>

    <Map/>

</Container>
    )
}

export default Main
