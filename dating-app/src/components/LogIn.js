import React from 'react'
import img from "../images/banner.jpg";
import { Formik, Field, Form } from "formik";
import {
  Alert,
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
function LogIn() {

    const LogInSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email adresa je obavezna."),
        password: Yup.string().min(6).max(20).required("Lozinka je obavezna."),
      });


    return (
       
        <div style={{background: `url(${img})`,height:"100vh",backgroundSize:"cover",backgroundPosition:"center"}}  className="page-holder bg-cover">
        
        <Row style={{ justifyContent: "center",width:"100%" }}>
        <Col lg={4} style={{ padding: "50px", marginTop: "80px" }}>
          <h1
            style={{
              fontFamily: "Gabriela",
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
              textAlign: "center",
              marginBottom: "20px",
              
            }}
          >
            Dobrodošli!
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LogInSchema}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <label
                  htmlFor="email"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="form-control form-group"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid white",
                    color: "white",
                    marginBottom: "30px",
                    // border:"none",
                    // borderBottom:"2px solid white",
                   
                  }}
                />
                {errors.email && touched.email ? (
                  <Alert
                    variant="warning"
                   
                  >
                    {errors.email}
                  </Alert>
                ) : null}
                <label
                  htmlFor="password"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Lozinka
                </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control form-group"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid white",
                    color: "white",
                   
                  
                    
                    // border:"none",
                    // borderBottom:"2px solid white",
                   
                  }}
                />
                {errors.password && touched.password ? (
                  <Alert
                    variant="warning"
                  
                  >
                    {errors.password}
                  </Alert>
                ) : null}

                <div style={{ textAlign: "center",marginTop:"30px" }}>
                  <Button
                    type="submit"
                    variant="outline-light"
                    size="md"
                    style={{ width: "50%",padding:"10px" }}
                  >
                    Log In
                  </Button>
                </div>
                <hr></hr>
                {/* //Todo forgot password */}
                <div style={{ marginTop: "20px",textAlign:"center"}}>
                  <a href="#" style={{textDecoration:"none",color:"white"}}>Forgot Password?</a>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>


         
        </div>
    )
}

export default LogIn
