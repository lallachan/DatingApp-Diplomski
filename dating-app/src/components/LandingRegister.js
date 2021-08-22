import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Register from "./Register"
import "./LandingRegister.css"

function LandingRegister() {
  return (
    <Container fluid>
      <Row style={{padding:"0",margin:"0"}}>
        <Col lg={10} className="about">
        <h1>O nama</h1>
        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
        </h3>
        </Col>
        <Row>
        <Col>
        <Register/>
        </Col>
        </Row>

       <div style={{marginBottom:"150px"}}></div>
        
      </Row>
    </Container>
  );
}

export default LandingRegister;
