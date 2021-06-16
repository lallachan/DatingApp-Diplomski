import React from "react";
import img from "../images/banner.jpg";
import { Row, Button, Col } from "react-bootstrap";
import logo from "../images/logo.webp";
import {Link} from "react-router-dom"
import "./LandingPage.css"
function LandingPage() {

  //FIX LINKS COLORS

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
      <Col style={{textAlign:"left",color:"white",padding:"20px",marginLeft:"20px",fontSize:"30px"}}>BOK</Col>
        <Col style={{padding:"20px"}}>
         
          <Button variant="outline-light" style={{borderRadius:"1px",padding:"10px",border:"2px solid white",marginRight:"10px"}}>
          <Link to="/login" style={{textDecoration:"none",color:"white"}}>Login</Link>
           </Button>
          <Button variant="outline-light"  style={{borderRadius:"1px",padding:"10px",border:"2px solid white"}}>
          <Link to="/register" style={{textDecoration:"none",color:"white"}}>Register</Link></Button>
        </Col>
      </Row>

      <Row style={{width:"100%",margin:"100px auto",textAlign:"center",justifyContent:"center",height:"200px"}}>
        <h1 style={{fontSize:"10em",marginTop:"30px",color:"#FFF3CD",fontFamily:"Roboto"}}>Find love near you</h1>
      </Row>

      <Row style={{width:"100%",textAlign:"center",justifyContent:"center",marginTop:"-50px"}}>
        <Col>
        <h1 style={{color:"white",fontFamily:"Roboto",fontSize:"70px"}}>Join us today!</h1>
        <br></br>
        <Button variant="outline-light" size="lg" style={{borderRadius:"1px",padding:"10px",border:"2px solid white",padding:"20px",width:"10%"}}>
        <Link to="/register" style={{textDecoration:"none",color:"white"}}>Register</Link></Button>
        
        </Col>
       
      </Row>
    </div>
  );
}

export default LandingPage;
