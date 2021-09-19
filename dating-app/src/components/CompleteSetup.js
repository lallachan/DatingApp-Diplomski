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


  const {accessToken,userData,setUserData} = useContext(myContext)
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

    const sexes = ["Muškarci","Žene","Ne binarno"]

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
        console.log(result)
        setImage(result.info.files[0].uploadInfo.secure_url); //path for backend
        setImageUrl(result.info.files[0].uploadInfo.secure_url);
        const newUserData  = {...userData}
        newUserData.imageUrl = result.info.files[0].uploadInfo.secure_url
        setUserData(newUserData)
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
      console.log(Number(sexes.indexOf(checked)))

      try {
        const res = await axios.patch(process.env.REACT_APP_GET_USER_DATA,{sexualOrientation:Number(sexes.indexOf(checked))},
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

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     console.log("Available");
  //   } else {
  //     console.log("Not Available");
  //   }

  //   navigator.geolocation.getCurrentPosition(async function (position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);

  //     try {
       
  //       const res = await axios.patch(
  //         process.env.REACT_APP_USER_LOCATION,
  //         {
  //           latitude : position.coords.latitude,
  //           longitude: position.coords.longitude
          
  //         },
  //         {
  //           headers: {
  //             authorization: accessToken,
  //           },
  //         }
  //       );
  //       console.log(res.data);
       
  //     } catch (error) {
  //       errorHandler(error);
  //     }
      
  //   });

  //   //IF DOESNT WANT LOCATION SEND FALSE


  // }, []);

  // const sendLocation = async() => {
  //   try {
       
  //     const res = await axios.patch(
  //       process.env.REACT_APP_USER_LOCATION,
  //       {
  //         latitude : false,
  //         longitude: false
        
  //       },
  //       {
  //         headers: {
  //           authorization: accessToken,
  //         },
  //       }
  //     );
  //     console.log(res.data);
     
  //   } catch (error) {
  //     errorHandler(error);
  //   }
  // }


  // if(_.isUndefined(userData.lastKnownLocation)) sendLocation()

  
  function UploadImage() {
    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop:"20px",
            border:"2px solid #578BB8"
          }}
        >
          <Col>
            <h1 style={{ marginTop: "30px" }}>Postavite profilnu sliku</h1>

            <Row>
              <img src={image} style={{ width: "30%", margin: "0 auto" }} />
            </Row>
            <br/>
            <Button
              onClick={showWidget}
              size="lg"
              style={{ marginBottom: "20px" }}
            >
              Učitajte sliku
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
              Spremi promjene
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
              Preskoči
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
            <h1 style={{ marginTop: "30px" }}>Dodajte kratki opis o sebi</h1>

            <Form.Control
              as="textarea"
              maxlength="150"
              placeholder="O meni (do 150 znakova)"
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
              Spremi
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
              Preskoči
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
            <h1 style={{ marginTop: "30px" }}>Dodajte vašu seksualnu orijentaciju</h1>

            <Row>
              <Col style={{ padding: "20px", height: "300px" }}>
            
              <div>
              <input type="radio" value="Muškarci" name="gender" ref={ref1}/> {sexes[0]}
              <input type="radio" value="Žene" name="gender" ref={ref2}/> {sexes[1]}
              <input type="radio" value="Ne binarno" name="gender" ref={ref3} /> {sexes[2]}
            </div>

              </Col>
            </Row>

            <Button
              size="lg"
              variant="outline-dark"
              style={{ marginRight: "20px", borderRadius: "1px" }}
              onClick={setupSexualOrientation}
            >
              Spremi
            </Button>
            <Button
              size="lg"
              variant="outline-dark"
              onClick={loadMain}
              style={{ marginRight: "20px", borderRadius: "1px" }}
            >
              Preskoči
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  return (
    <Container

   
    >
      <Row
        style={{
          justifyContent: "center",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <h1 style={{fontSize:"50px",marginBottom:"20px",color:"#578BB8"}}>Završite svoju prijavu</h1>
        <h2 style={{color:"#578BB8"}}>
          Možete zasada preskočiti ovaj korak ali ćete biti<span> </span>
          <span style={{ textDecoration: "underline",color:"#DF314D" }} >
            manje vidljivi drugim korisnicima.
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
