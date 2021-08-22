import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import map from "../images/World_Map.png";

function MapPage() {
  return (
    <Container
      fluid
      style={{
        background: `url(${map})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="page-holder bg-cover"
    >
      <Row >
        <Col lg={12} style={{textAlign:"center"}}>
          <h1 style={{color:"#DF314D",marginTop:"-50px"}}>Pronađi svoju srodnu dušu na mapi.Možda je samo od tebe 2km!?</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default MapPage;
