import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Register from "./Register";
import "./LandingRegister.css";

function LandingRegister() {
  return (
    <Container fluid>
      <Row style={{ padding: "0", margin: "0" }}>
        <Col lg={10} className="about">
          <h1>O nama</h1>
          <h3>
            Sve više i više ljudi traži ljubav i poznanstva preko interneta.
            Traženje ljubavi ili poznanstva online daje korisnicima puno veći
            izbor nego što bi to bilo samo u njihovom okruženju. Preko ove aplikacije
            korisnici će moći pronaći partnera koji im odgovara tako da filtrira korisnike 
            po svojim željama i potrebama.
          </h3>
        </Col>
        <Row>
          <Col>
            <div id="register_user"></div>
            <Register />
          </Col>
        </Row>

        <div style={{ marginBottom: "150px" }}></div>
      </Row>
    </Container>
  );
}

export default LandingRegister;
