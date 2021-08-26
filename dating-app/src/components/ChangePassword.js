import axios from "axios";
import React, { useContext, useState } from "react";
import { useRef } from "react";
import { Alert, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import myContext from "./contexts/myContext";
import { errorHandler } from "./functions/Functions";

function ChangePassword(props) {
  const { setShowPassword } = props;

  const pass1 = useRef(null);
  const pass2 = useRef(null);
  const confirmPassword = useRef(null);

  const [notMatch, setNotMatch] = useState(false);
  const [wrongFormat, setWrongFormat] = useState(false);


  const { accessToken } = useContext(myContext);

  const [error, setError] = useState(null);

  const checkPassword = () => {
    if (
      pass2.current.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) &&
      confirmPassword.current.value.match(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )
    ) {
      if (pass2.current.value === confirmPassword.current.value) {
        changePassword()
      } else {
        setNotMatch(true);
      }
    }

    else{
      setWrongFormat(true)
    }
  };

  const changePassword = async () => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_CHANGE_PASSWORD,
        { oldPassword: pass1.current.value, newPassword: pass2.current.value },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(res.data);
      setShowPassword(false);
    } catch (error) {
      const msg = errorHandler(error);
      setError(msg);
      console.log(msg);
    }
  };

  return (
    <div>
      <FormControl
        placeholder="Stara lozinka"
        type="password"
        aria-label="pass2"
        aria-describedby="basic-addon1"
        ref={pass1}
      />

      <br />

      <p>Lozinka mora sadržavati minimalno 8 znakova, barem jedan broj i jedan znak.</p>

      <FormControl
        placeholder="Nova lozinka"
        type="password"
        aria-label="pass2"
        aria-describedby="basic-addon1"
        minLength={8}
        pattern="/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/"
        ref={pass2}
      />

      <br />

      <FormControl
        placeholder="Potvrdi lozinku"
        type="password"
        aria-label="pass2"
        pattern="/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/"
        aria-describedby="basic-addon1"
        minLength={8}
        ref={confirmPassword}
      />

      <br />

      <Button
        variant="primary"
        style={{
          backgroundColor: "#578BB8",
          border: "none",
          borderRadius: "0",
        }}
        // onClick={()=>changePassword()}
        onClick={() => checkPassword()}
      >
        Promijeni lozinku
      </Button>

      <br />
      {error != null ? <Alert variant="danger">{error}</Alert> : null}

      {notMatch == true ? (
      
        <Alert variant="danger" style={{marginTop:"20px"}}>Lozinke se ne podudaraju</Alert>
      ) : null}

      {wrongFormat == true ? (
          
        <Alert variant="danger" style={{marginTop:"20px"}}>Krivi format lozinke.</Alert>
      ) : null}

    </div>
  );
}

export default ChangePassword;
