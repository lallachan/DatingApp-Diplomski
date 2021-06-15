import React from "react";
import img from "../images/banner.jpg";
import { Row, Button, Col } from "react-bootstrap";
import logo from "../images/logo.webp";

function LandingPage() {
  return (
    <div
      style={{
        background: `url(${img})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="page-holder bg-cover"
    >
      <Row style={{ textAlign: "right", width: "100%" }}>
        <Col style={{padding:"20px"}}>
          <Button variant="outline-light" style={{borderRadius:"1px",padding:"10px",border:"2px solid white",marginRight:"10px"}}>Login</Button>
          <Button variant="outline-light"  style={{borderRadius:"1px",padding:"10px",border:"2px solid white"}}>Register</Button>
        </Col>
      </Row>

      <Row style={{width:"100%",margin:"100px auto",textAlign:"center",justifyContent:"center",height:"200px"}}>
        <h1 style={{fontSize:"150px",marginTop:"30px",color:"black",fontFamily:"Roboto"}}>Find love near you</h1>
      </Row>

      <Row style={{width:"100%",textAlign:"center",justifyContent:"center",marginTop:"-50px"}}>
        <Col>
        <h1 style={{color:"white",fontFamily:"Roboto"}}>Join us today!</h1>
        <br></br>
        <Button variant="outline-light" size="lg" style={{borderRadius:"1px",padding:"10px",border:"2px solid white"}}>Register</Button>
        </Col>
       
      </Row>
    </div>
  );
}

export default LandingPage;
