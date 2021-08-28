import axios from "axios";
import React, { useContext, useRef } from "react";
import {
  Alert,
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Container
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import myContext from "./contexts/myContext";
import { errorHandler } from "./functions/Functions";
import forgot from "../images/forgot.png";


function SendEmailForgotPass() {
  const email = useRef(null);
  const { accessToken } = useContext(myContext);

  const history = useHistory();

  const sendToEmail = async (value) => {
    console.log(value);

    try {
      const res = await axios.post(
        process.env.REACT_APP_FORGOT_PASSWORD,
        {
          email: value,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      errorHandler(error);
    }

    history.push("/");
  };

  return (
    <Container 
    
    style={{margin:"200px auto"}}

    fluid>
      <Row>
        <Col lg={12} md={6} sm={6}>
          <h3 style={{textAlign:"center"}}>
            Molim vas unesite email adresu kako bi vam se poslala nova zaporka.
          </h3>
        </Col>
      </Row>

      <Row style={{padding:"0",margin:"0"}}>
        <Col lg={4} md={12} sm={12} xs={12} style={{margin:"0 auto"}}>
          <InputGroup className="mt-5">
            <FormControl
              placeholder="Vaša email adresa"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              type="email"
              name="email"
              ref={email}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => sendToEmail(email.current.value)}
            >
              Pošalji
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <img
            src={forgot}
            style={{
              borderRadius: "0",
              textAlign: "center",
              alignContent: "center",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "200px",
              marginTop:"50px"
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SendEmailForgotPass;
