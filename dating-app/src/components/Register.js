import React, { useState } from "react";
import { Row, Col, Button, Alert, InputGroup } from "react-bootstrap";
import img from "../images/banner.jpg";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { errorHandler } from "./functions/Functions";
import EmailValidation from "./EmailValidation";



function Register() {
  const RegisterShema = Yup.object().shape({
    firstName: Yup.string().min(2).max(60).required("Ime je obavezno."),
    lastName: Yup.string().min(2).max(60).required("Prezime je obavezno."),
    email: Yup.string()
      .email("Invalid email")
      .required("Email adresa je obavezna."),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase and one number"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords don't match."),
    gender: Yup.string().required("Spol je obavezan."),

    day: Yup.string().required("Unesite dan."),
    month: Yup.string().required("Unesite mjesec."),
    year: Yup.string().required("Unesite godinu."),

    city: Yup.string().min(2).max(60).required("Grad je obavezan."),
    zip: Yup.string()
      .required("Poštanski broj je obavezan.")
      .matches(
        /^\d{5}(?:[-\s]\d{4})?$/,
        "Zip must contain 5 numbers e.g 10000"
      ),
  });
  const days = [];

  const months = [
    "Siječanj",
    "Veljača",
    "Ožujak",
    "Travanj",
    "Svibanj",
    "Lipanj",
    "Srpanj",
    "Kolovoz",
    "Rujan",
    "Listopad",
    "Studeni",
    "Prosinac",
  ];
  
  const years = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  for (let i = 1900; i <= 2021; i++) {
    years.push(i);
  }

  const handleChange = (e) => {
    let name = e.target.value;
    alert(name);
  };

  const reformatDate = (day,month,year) => {

    month = (months.indexOf(month))+1
  
    if(month < 10){
      month = "0" + month
    }

   

    return year + "-" + month + "-" + day




  } 

  const [loadEmailValidation, setLoadEmailValidation] = useState(false)


  if(loadEmailValidation == true) return <EmailValidation/>

  return (
    <div
      classNameName="page-holder bg-cover"
      style={{
        background: `url(${img})`,

        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Row
        style={{
          justifyContent: "center",
          width: "100%",
          padding: "0",
          margin: "0",
        }}
      >
        <Col
          id="background"
          lg={8}
          md={8}
          sm={12}
          style={{
            padding: "50px",
            marginTop: "80px",
            // backgroundColor: "#007893",
            background : "#007893",
            overflowY: "scroll",
            height: "80vh",
          }}
        >
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
              textAlign: "center",
              marginTop: "-30px",
              fontFamily:"sarina"
              
            }}

            
          >
            Register
          </h1>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              gender: "",
              day: "",
              month: "",
              year: "",
              city: "",
              zip: "",
            }}
            validationSchema={RegisterShema}
            onSubmit={async (values) => {
              values.dob = reformatDate(values.day,values.month,values.year)
              console.log(values);
              delete values.day;
              delete values.month;
              delete values.year;
              delete values.confirmPassword;

              // await new Promise((r) => setTimeout(r, 500));
              // alert(JSON.stringify(values, null, 2));

              try {
                const res = await axios.post(
                  process.env.REACT_APP_REGISTER_USER,
                  values
                );
                console.log(res.data)
              } catch (error) {
               errorHandler(error);
              }


              setLoadEmailValidation(true)
              


            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <Row width="100%">
                  <Col lg={6} md={12} sm={12} style={{ padding: "10px" }}>
                    <label
                      htmlFor="firstName"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      className="form-control form-group"
                      // style={{background:"transparent",border:"2px solid white"}}
                    />
                    {errors.firstName && touched.firstName ? (
                      <Alert variant="warning">{errors.firstName}</Alert>
                    ) : null}

                    <label
                      htmlFor="lastName"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className="form-control form-group"
                    />
                    {errors.lastName && touched.lastName ? (
                      <Alert variant="warning">{errors.lastName}</Alert>
                    ) : null}

                    <label
                      htmlFor="lastName"
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

<br></br>
                    <hr></hr>
                    <br></br>

                    <label
                      htmlFor="lastName"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control form-group"
                    />
                    {errors.password && touched.password ? (
                      <Alert variant="warning">{errors.password}</Alert>
                    ) : null}

                    <label
                      htmlFor="lastName"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control form-group"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <Alert variant="warning">{errors.confirmPassword}</Alert>
                    ) : null}

                   

                    </Col>

                    <Col style={{marginTop:"9px"}}>
                    
                    <label
                      htmlFor="city"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      City
                    </label>
                    <Field
                      name="city"
                      type="text"
                      className="form-control form-group"
                    />
                    {errors.city && touched.city ? (
                      <Alert variant="warning">{errors.city}</Alert>
                    ) : null}

                    <label
                      htmlFor="lastName"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Zip
                    </label>
                    <Field
                      name="zip"
                      placeholder="npr. 10000"
                      type="number"
                      pattern="[A-Za-z]{3}"
                      className="form-control form-group"
                    />
                    {errors.zip && touched.zip ? (
                      <Alert variant="warning">{errors.zip}</Alert>
                    ) : null}

                    <label
                      htmlFor="dob"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Datum rođenja
                    </label>
                    <br></br>
                    <Field
                      name="day"
                      id="day"
                      type="string"
                      as="select"
                      className="my-select"
                      value={values.day}
                      style={{ padding: "10px", borderRadius: "5px" }}
                    >
                      <option value="" style={{ display: "none" }}>
                        Dan
                      </option>

                      {days.map((day) => {
                        return <option value={day}>{day}</option>;
                      })}
                    </Field>
                    {errors.day && touched.day ? (
                      <Alert variant="warning">{errors.day}</Alert>
                    ) : null}

                    <Field
                      name="month"
                      data-dropup-auto="false"
                      id="month"
                      type="string"
                      as="select"
                      className="my-select"
                      value={values.month}
                      style={{ padding: "10px", borderRadius: "5px" }}
                    >
                      <option value="" style={{ display: "none" }}>
                        Mjesec
                      </option>

                      {months.map((month) => {
                        return <option value={month}>{month}</option>;
                      })}
                    </Field>
                    {errors.month && touched.month ? (
                      <Alert variant="warning">{errors.month}</Alert>
                    ) : null}

                    <Field
                      data-dropup-auto="false"
                      name="year"
                      id="year"
                      type="string"
                      as="select"
                      className="my-select"
                      value={values.year}
                      style={{ padding: "10px", borderRadius: "5px" }}
                    >
                      <option value="" style={{ display: "none" }}>
                        Godina
                      </option>

                      {years.map((year) => {
                        return <option value={year}>{year}</option>;
                      })}
                    </Field>
                    {errors.year && touched.year ? (
                      <Alert variant="warning">{errors.year}</Alert>
                    ) : null}

                    <br></br>
                    <br></br>
                    <label
                      htmlFor="gender"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Spol
                    </label>
                    <div
                      role="group"
                      aria-labelledby="my-radio-group"
                      style={{ color: "white" }}
                    >
                      <div>
                        <label>
                          <Field type="radio" name="gender" value="Male" />
                          Male
                        </label>
                      </div>
                      <div>
                        <label>
                          <Field type="radio" name="gender" value="Female" />
                          Female
                        </label>
                      </div>
                      <div>
                        <label>
                          <Field type="radio" name="gender" value="Other" />
                          Other
                        </label>
                      </div>
                    </div>
                    {errors.gender && touched.gender ? (
                      <Alert variant="warning">{errors.gender}</Alert>
                    ) : null}

                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                      <Button
                        type="submit"
                        variant="outline-light"
                        size="lg"
                        style={{
                          width: "50%",
                          padding: "10px",
                          border: "3px solid white",
                          fontFamily: "Helvetica",
                          fontWeight: "bold",
                        }}
                      >
                        Završi
                      </Button>
                    </div>
                    </Col>

                  
              
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
