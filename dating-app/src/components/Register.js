import React, { useState } from "react";
import { Row, Col, Button, Alert, InputGroup } from "react-bootstrap";
import img from "../images/banner.jpg";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { errorHandler } from "./functions/Functions";
import EmailValidation from "./EmailValidation";
import { Typeahead } from 'react-bootstrap-typeahead'; 
import { default as _, filter } from "lodash";
import { default as postal } from "./Files/Postal.json";
import { sortedLastIndex } from "lodash";

import "./Register.css"
import { First } from "react-bootstrap/esm/PageItem";


function Register() {


  const [singleSelections, setSingleSelections] = useState([]);

  const [options, setOptions] = useState(postal);

  const [cityError, setCityError] = useState(false)

  const [zip, setZip] = useState(null)

  const handleClick = (e)=>{
    setSingleSelections(e)
    console.log("hey")
    const zip = options.filter(el => el.city == e)[0].postCode
    setZip(zip)
  }



  const RegisterShema = Yup.object().shape({
    firstName: Yup.string().min(2).max(60).required("Ime je obavezno."),
    lastName: Yup.string().min(2).max(60).required("Prezime je obavezno."),
    email: Yup.string()
      .email("Kriva email adresa.")
      .required("Email adresa je obavezna."),
    password: Yup.string()
      .required("Molim vas unesite svoju lozinku.")
      .matches(
        /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Lozinka se mora sastojati od barem 8 znakova, jedno veliko slovo i jedan broj."
      ),
    confirmPassword: Yup.string()
      .required("Molim vas potvrdite svoju lozinku.")
      .oneOf([Yup.ref("password"), null], "Loiznke se ne podudaraju."),
    gender: Yup.string().required("Spol je obavezan."),

    day: Yup.string().required("Unesite dan."),
    month: Yup.string().required("Unesite mjesec."),
    year: Yup.string().required("Unesite godinu."),


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

  const reformatDate = (day, month, year) => {
    month = months.indexOf(month) + 1;

    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + day;
  };

  const [loadEmailValidation, setLoadEmailValidation] = useState(false);

  if (loadEmailValidation == true) return <EmailValidation />;

  const CustomInputComponent = (props) => (
    <Typeahead
    id="basic-typeahead-single"
    onChange={handleClick}
    style={{backgroundColor: "#A8CEED",border:"none"}}
    options={options.map(i=>i.city)}
    placeholder="Izaberite grad..."
    selected={singleSelections}
    required
    
  />
  );

  return (
   
    
    <div>

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
       
         
        }}
        validationSchema={RegisterShema}
        
        onSubmit={async (values) => {

        
          if(_.isEmpty(singleSelections) || _.isEmpty(zip)) {setCityError(true);return}

          values.dob = reformatDate(values.day, values.month, values.year);
          
          delete values.day;
          delete values.month;
          delete values.year;
          delete values.confirmPassword;



          try {
            const res = await axios.post(
              process.env.REACT_APP_REGISTER_USER,
              {...values,city:singleSelections[0],zip:zip}
            );
            console.log(res.data);
          } catch (error) {
            errorHandler(error);
          }

          setLoadEmailValidation(true);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Row
              width="100%"
              id="register_user"
              style={{
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <Col
                className="register1"
                lg={6}
                md={12}
                sm={12}
              >
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "3rem",
                    textAlign: "left",
                  }}
                >
                  Registriraj se
                </h1>

                <Row width="100%">
                  <Col lg={6}>
                    {" "}
                    <label
                      htmlFor="firstName"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      Ime
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      className="form-control form-group"
                      style={{ width: "50%" }}
                      style={{ backgroundColor: "#A8CEED", border: "none" }}
                       
                        
                      
                    />
                    {errors.firstName && touched.firstName ? (
                      <Alert variant="warning">{errors.firstName}</Alert>
                    ) : null}
                  </Col>
                  <Col lg={6}>
                    <label
                      htmlFor="lastName"
                      style={{ color: "white", fontSize: "20px" }}
                      
                    >
                      Prezime
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className="form-control form-group"
                      style={{ backgroundColor: "#A8CEED", border: "none" }}
                     

                    />
                    {errors.lastName && touched.lastName ? (
                      <Alert variant="warning">{errors.lastName}</Alert>
                    ) : null}
                  </Col>
                </Row>

                <label
                  htmlFor="email"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Email adresa
                </label>
                <Field
                  name="email"
                  type="email"
                  className="form-control form-group"
                  style={{ backgroundColor: "#A8CEED", border: "none" }}
                />
                {errors.email && touched.email ? (
                  <Alert variant="warning">{errors.email}</Alert>
                ) : null}

                <label
                  htmlFor="lastName"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Lozinka
                </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control form-group"
                  style={{ backgroundColor: "#A8CEED", border: "none" }}
                />
                {errors.password && touched.password ? (
                  <Alert variant="warning">{errors.password}</Alert>
                ) : null}

                <label
                  htmlFor="lastName"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Potvrdi Lozinku
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control form-group"
                  style={{ backgroundColor: "#A8CEED", border: "none" }}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <Alert variant="warning">{errors.confirmPassword}</Alert>
                ) : null}
              </Col>

              <Col
               className="register2"
                lg={3}
                md={3}
                sm={12}
              >
                <Row width="100%" style={{ marginTop: "73px" }}>
                  <Col lg={8}>
                    <label
                      htmlFor="city"
                     
                      style={{
                        color: "white",
                        fontSize: "20px",
                        display: "inline-block",
                      }}
                    >
                      Grad
                    </label> 

                  {/* <Field
                      name="city"
                      className="form-control form-group"
                      as={CustomInputComponent}  
                      style={{ backgroundColor: "#A8CEED", border: "none" }}
                    >

                    </Field>


                    {errors.city && touched.city ? (
                      <Alert variant="warning">{errors.city}</Alert>
                    ) : null} */}

                    <Field
                      name="city"
                      as={CustomInputComponent}
                      style={{backgroundColor: "#A8CEED",border:"none"}}
                    />

                  {errors.city && touched.city ? (
                      <Alert variant="warning">{errors.city}</Alert>
                    ) : null}
                 
                    {cityError === true? <Alert variant="danger">Grad je obavezan.</Alert> : null}

                    


                  </Col>

                  <Col lg={4}>
                    <label
                      htmlFor="lastName"
                      style={{ color: "white", fontSize: "20px",width:"100px" }}
                    >
                      Zip
                    </label>
                    <Field
                      name="zip"
                      placeholder="npr. 10000"
                      type="number"
                      pattern="[A-Za-z]{3}"
                      className="form-control form-group"
                      value={zip}
                      onChange={e=>setZip(e.target.value)}
                      style={{ backgroundColor: "#A8CEED", border: "none",width:"100%" }}
                    />
                    {errors.zip && touched.zip ? (
                      <Alert variant="warning">{errors.zip}</Alert>
                    ) : null}
                  </Col>

                </Row>

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
                  
                  style={{ padding: "10px", borderRadius: "5px",backgroundColor: "#A8CEED",border:"none",marginRight:"20px" }}
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
                  style={{ padding: "10px", borderRadius: "5px",backgroundColor: "#A8CEED",border:"none",marginRight:"20px" }}
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
                  style={{ padding: "10px", borderRadius: "5px",backgroundColor: "#A8CEED",border:"none",marginRight:"20px" }}
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
                      Muško
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field type="radio" name="gender" value="Female" />
                      Žensko
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field type="radio" name="gender" value="Other" />
                      Ne binarno
                    </label>
                  </div>
                </div>
                {errors.gender && touched.gender ? (
                  <Alert variant="warning">{errors.gender}</Alert>
                ) : null}

                <div style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    size="lg"
                    style={{
                      width: "50%",
                      padding: "10px",
                      fontWeight: "bold",
                      backgroundColor: "#DF314D",
                      border: "none",
                      marginBottom:"20px"

                    }}
                  >
                    Prijavi se
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>


  
    </div>
 

  );
}

export default Register;
