import React, { useContext, useState } from "react";
import img from "../images/banner.jpg";
import { Formik, Field, Form } from "formik";
import axios from "axios";

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
import { errorHandler } from "./functions/Functions";
import myContext from "./contexts/myContext";
import { useHistory } from "react-router-dom";

function LogIn() {
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    userData,
    setUserData,
    refreshAccessToken,
    setLoggedIn,
  } = useContext(myContext);

  const [error, setError] = useState(null);

  const LogInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email adresa je obavezna."),
    password: Yup.string().min(6).max(20).required("Lozinka je obavezna."),
  });

  const getUserData = async (access) => {
    try {
      const res = await axios.get(process.env.REACT_APP_GET_USER_DATA, {
        headers: {
          authorization: access,
        },
      });
      console.log(res.data);
      setUserData(res.data);
      if (res.data.completedSetup == true) {
        history.push("/main");
      } else {
        history.push("/completeSetup");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const history = useHistory();

  return (
    <div
    
      className="page-holder bg-cover"
    >
      <Row>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LogInSchema}
          onSubmit={async (values) => {
            try {
              const res = await axios.post(process.env.REACT_APP_LOGIN, values);
              const { data, message, length } = res.data;
              localStorage.setItem("refreshToken", data.refresh);

              setRefreshToken(data.refresh);
              setAccessToken(data.access);
              getUserData(data.access);
              setLoggedIn(true);
            } catch (error) {
              const err = errorHandler(error);
              console.log(err); 
              setError(err);

             
            }
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
              />
              {errors.email && touched.email ? (
                <Alert variant="warning">{errors.email}</Alert>
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
              />
              {errors.password && touched.password ? (
                <Alert variant="warning">{errors.password}</Alert>
              ) : null}

              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                  type="submit"
                 
                  size="md"
                  style={{ width: "50%", padding: "10px",backgroundColor:"#578BB8",border:"none" }}
                >
                  Log In
                </Button>
              </div>

             
              {error != null ? <Alert variant="danger" style={{marginTop:"20px"}}>{error}</Alert> : null}
              <div style={{ marginTop: "20px", textAlign: "center",marginBottom:"10px" }}>
                <a
                  href="#"
                  style={{ color: "black" }}
                  onClick={() => history.push("/forgotPassword")}
                >
                  Forgot Password?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </Row>
    </div>
  );
}

export default LogIn;
