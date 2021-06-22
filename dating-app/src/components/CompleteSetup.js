import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Form,
} from "react-bootstrap";


import axios from "axios";
import defaultPhoto from "../images/default-photo.png";
import { errorHandler } from "./functions/Functions";
import myContext from "./contexts/myContext";
import { useHistory } from "react-router-dom";
import { default as _ } from "lodash";


function CompleteSetup() {


  const {accessToken,userData} = useContext(myContext)
  const history = useHistory()
  
  const [toggleWindow, setToggleWindow] = useState(false);

  const [counter, setCounter] = useState(1);

  const cloudinary = "https://res.cloudinary.com";

  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()


  //Cloudinary default photo
  const [image, setImage] = useState(
    cloudinary +
      "/dbfwwnhat/image/upload/v1624200889/users/rvzipikczav6cdlwemyi.png"
  );

  //Image data for backend
  const [imageUrl, setImageUrl] = useState("/dbfwwnhat/image/upload/v1624200889/users/rvzipikczav6cdlwemyi.png");

  const [desc, setDesc] = useState("");
  const [sexOrientation, setSexOrientation] = useState("");

  //Location of users
  const [lastKnownLocation, setLastKnownLocation] = useState(false);

    const sexes = ["Males","Females","Both"]

  const descRef = useRef("")

  ///WIDGET

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dbfwwnhat",
      uploadPreset: "jydos0sa",
      folder: "users",
      //  cropping:true,
      name: "hey",
    },
    (error, result) => {
      if (result.event == "queues-end") {
        setImage(result.info.files[0].uploadInfo.url); //path for backend
        setImageUrl(result.info.files[0].uploadInfo.path);
      }
    }
  );

  function showWidget() {
    widget.open();
  }

  const loadNewWindow = () => {
    setCounter(counter + 1);
  };

  const setupDesc = async () => {
     

      try {
        console.log(descRef.current.value)
        console.log(accessToken)
        const res = await axios.patch(process.env.REACT_APP_GET_USER_DATA,{description:descRef.current.value},
        {
            headers:{
                'authorization': accessToken
              }
        }
        )
        console.log(res.data)
        loadNewWindow()
        
      } catch (error) {
        errorHandler(error);
      }

      loadNewWindow()
  }

  const setupImage = async () => {
    try {
        console.log(accessToken)
        const res = await axios.patch(process.env.REACT_APP_GET_USER_DATA,{imageUrl:imageUrl},
        {
            headers:{
                'authorization':accessToken
              }
        }

        )
        console.log(res.data)
        loadNewWindow()
        
      } catch (error) {
        errorHandler(error);
      }
  }

  const setupSexualOrientation = async () => {
    
      let ele = document.getElementsByName('gender');
      
      const checked = [...ele].filter(radio => radio.checked)[0].value


      try {
        const res = await axios.patch(process.env.REACT_APP_GET_USER_DATA,{sexualOrientation:Number(sexes.indexOf(checked)),location:lastKnownLocation},
        {
            headers:{
                'authorization': accessToken
              }
        }
        )
        console.log(res.data)
        history.push("/main")
       
        
      } catch (error) {
        errorHandler(error);
      }

    
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      setLastKnownLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });

    //IF DOESNT WANT LOCATION SEND FALSE
  }, []);

  function UploadImage() {
    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "center",
            border: "2px solid black",
            textAlign: "center",
          }}
        >
          <Col>
            <h1 style={{ marginTop: "30px" }}>Set your Profile Photo</h1>

            <Row>
              <img src={image} style={{ width: "20%", margin: "0 auto" }} />
            </Row>
            <Button
              onClick={showWidget}
              size="lg"
              style={{ marginBottom: "20px" }}
            >
              Upload Image
            </Button>
            <br />

            <Button
              size="lg"
              variant="outline-dark"
              style={{
                marginRight: "20px",
                borderRadius: "1px",
                marginBottom: "30px",
              }}
              onClick={setupImage}
            >
              Submit
            </Button>
            <Button
              size="lg"
              variant="outline-dark"
              onClick={loadNewWindow}
              style={{
                marginRight: "20px",
                borderRadius: "1px",
                marginBottom: "30px",
              }}
            >
              Skip
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  function AddDescription() {
    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "center",
            border: "2px solid black",
            height: "500px",
            textAlign: "center",
          }}
        >
          <Col>
            <h1 style={{ marginTop: "30px" }}>Add Description</h1>

            <Form.Control
              as="textarea"
              placeholder="Education,Job,Hobbies etc."
              style={{
                height: "300px",
                width: "50vw",
                margin: "0 auto",
                marginBottom: "10px",
              }}
              ref={descRef}
              
            />
           

            <Button
              size="lg"
              variant="outline-dark"
              style={{
                marginRight: "20px",
                borderRadius: "1px",
                marginBottom: "30px",
              }}
              onClick={setupDesc}
            >
              Submit
            </Button>
            <Button
              size="lg"
              variant="outline-dark"
              onClick={loadNewWindow}
              style={{
                marginRight: "20px",
                borderRadius: "1px",
                marginBottom: "30px",
              }}
            >
              Skip
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  const loadMain = () => {
    history.push("/main")
  }



  function SexualOrientation() {
    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "center",
            border: "2px solid black",
            height: "500px",
            textAlign: "center",
          }}
        >
          <Col>
            <h1 style={{ marginTop: "30px" }}>Add Your Sexual Orientation</h1>

            <Row>
              <Col style={{ padding: "20px", height: "300px" }}>
            
              <div>
              <input type="radio" value="Males" name="gender" ref={ref1}/> {sexes[0]}
              <input type="radio" value="Females" name="gender" ref={ref2}/> {sexes[1]}
              <input type="radio" value="Both" name="gender" ref={ref3} /> {sexes[2]}
            </div>

              </Col>
            </Row>

            <Button
              size="lg"
              variant="outline-dark"
              style={{ marginRight: "20px", borderRadius: "1px" }}
              onClick={setupSexualOrientation}
            >
              Submit
            </Button>
            <Button
              size="lg"
              variant="outline-dark"
              onClick={loadMain}
              style={{ marginRight: "20px", borderRadius: "1px" }}
            >
              Skip
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  return (
    <Container>
      <Row
        style={{
          justifyContent: "center",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <h1>Complete your Setup</h1>
        <h2>
          You can skip for now but you will be{" "}
          <span style={{ textDecoration: "underline" }}>
            less visible to users.
          </span>{" "}
        </h2>
      </Row>

      {counter == 1 ? <UploadImage /> : null}
      {counter == 2 ? <AddDescription /> : null}
      {counter == 3 ? <SexualOrientation /> : null}
    </Container>
  );
}

export default CompleteSetup;
