import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import myContext from "./contexts/myContext";
import "./MyProfile.css";
import { Formik, Field, Form, useFormik } from "formik";
import { errorHandler } from "./functions/Functions";
import axios from "axios";
import { default as _, filter } from "lodash";
import Hobbies from "./Hobbies";
import Gallery from "./Gallery";

function MyProfile() {
  const { userData, accessToken,setUserData } = useContext(myContext);
  const descRef = useRef(userData.description);
  const eduRef = useRef(userData.education);
  const jobRef = useRef(userData.job);

  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const sexes = ["Males","Females","Both"]
  const selectRef = useRef();
  const [imageUrl, setImageUrl] = useState(userData.imageUrl);

  const [toggleGallery, setToggleGallery] = useState(false)

  const [toggleEditDesc, setToggleEditDesc] = useState(true);
  const [toggleEditEdu, setToggleEditEdu] = useState(true);
  const [toggleEditJob, setToggleEditJob] = useState(true);
  const [toggleEditHobbies, setToggleEditHobbies] = useState(false);
  const [toggleEditSexOr, setToggleEditSexOr] = useState(true);
  const [toggleHobbies, setToggleHobbies] = useState(false);
  const [displayTags, setDisplayTags] = useState(false);
  const [hobbies, setHobbies] = useState(userData.interests);
  const [sexOr, setSexOr] = useState("");
  const [selectHobbies, setSelectHobbies] = useState([]);
  const [selectCategories, setSelectCategories] = useState(null);
  const [jobData, setJobData] = useState("");
  

  const [selectValue, setSelectValue] = useState("Choose hobbies")

  const selectHobbieRef = useRef(null)

  const entHobbies = ["TV Series", "Games", "Movies", "Board Games"];
  const healFitHobbies = ["Workout", "Dieting"];
  const foodHobbies = ["Cooking", "Eating Out", "Drinks", "Brewing Beer"];
  const readLearnHobbies = ["Programming", "Science", "Reading"];
  const OutdoorHobbies = [
    "Hiking",
    "Sports",
    "Football",
    "Basketball",
    "Swimming",
    "Camping",
  ];
  const otherHobbies = [];

  const editDesc = () => {
    setToggleEditDesc(false);
  };

  const editEdu = () => {
    setToggleEditEdu(false);
  };

  const editSexOr = () => {
    setToggleEditSexOr(false);
  };

  const editJob = () => {
    setToggleEditJob(false);
  };

  const getSexOr = (sex) => {
    if (sex == 0) {
      return "males";
    } else if (sex == 1) {
      return "females";
    } else if (sex == 2) {
      return "both";
    } else {
      return "";
    }
  };

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
        console.log(result);
        setImageUrl(result.info.files[0].uploadInfo.secure_url);

        saveImage(result.info.files[0].uploadInfo.secure_url);

       
      }
    }
  );


  

  function showWidget() {
    widget.open();
  }

  const saveJobData = async () => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_GET_USER_DATA,
        { job: jobRef.current.value },
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

    window.location.reload();
  };

  

  

  const saveEduData = async () => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_GET_USER_DATA,
        { education: eduRef.current.value },
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

    window.location.reload();
  };

  const saveData = async () => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_GET_USER_DATA,
        { description: descRef.current.value },
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

    window.location.reload();
  };

  const saveImage = async (image) => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_GET_USER_DATA,
        { imageUrl: image },
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
  };


  const saveSexOrData = async () => {
    let ele = document.getElementsByName('gender');
      
      const checked = [...ele].filter(radio => radio.checked)[0].value

      try {
        const res = await axios.patch(process.env.REACT_APP_GET_USER_DATA,{sexualOrientation:Number(sexes.indexOf(checked))},
        {
            headers:{
                'authorization': accessToken
              }
        }
        )
        console.log(res.data)
       
       
        
      } catch (error) {
        errorHandler(error);
      }

      window.location.reload();
  }
  

  useEffect(() => {
    console.log(hobbies);
  }, [hobbies]);


  const changeProfilePhoto = () => {
    showWidget()
  }


  return (
    <Container fluid>
      <Row>
        <div className="profile">
          <div className="profilePhoto">
            <img src={imageUrl} width="50%" />
            <br />
            <Button style={{ marginTop: "10px" }} onClick={changeProfilePhoto}>
              Change Profile Photo
            </Button>
          </div>{" "}
          <p className="name">
            {userData.firstName} {userData.lastName} , AGE
          </p>
          <h3>City</h3>
          <p>
            {userData.city},{userData.zip}
          </p>
          <p></p>
          <h3>I'm interested in</h3>
          <p style={{ fontSize: "20px" }}>
          <textarea
              placeholder="Add Sex in which you are interested in"
              className="textarea"
              disabled={toggleEditSexOr}
              ref={eduRef}
            >
               {getSexOr(userData.sexualOrientation)}
            </textarea>{" "}
            <Button  className="editBtn" onClick={editSexOr}>
              Edit
            </Button>
            {toggleEditSexOr == false ? (
              <>

              <h5>Add Your Sexual Orientation</h5>

              <Row>
               

                <div>
                <input type="radio" value="Males" name="gender" ref={ref1}/> {sexes[0]}
                <input type="radio" value="Females" name="gender" ref={ref2}/> {sexes[1]}
                <input type="radio" value="Both" name="gender" ref={ref3} /> {sexes[2]}
              </div>

                
              </Row>

                <Button
                  onClick={saveSexOrData}
                  variant="success"
                  className="saveBtn"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setToggleEditSexOr(true)}
                  variant="danger"
                  className="saveBtn"
                  style={{ marginLeft: "5px" }}
                >
                  Cancel
                </Button>
              </>
            ) : null}
          </p>
          <h3>Gallery</h3>
          

            <Gallery />

         
          
          
        
          <br/> <br/>
         
          
          <br />
          <br />
          <h3>About</h3>
          <div className="description">
            <textarea
              placeholder="Add Education"
              className="textarea"
              disabled={toggleEditEdu}
              ref={eduRef}
            >
              {userData.education}
            </textarea>{" "}
            <Button onClick={editEdu} className="editBtn">
              Edit
            </Button>
            {toggleEditEdu == false ? (
              <>
                <Button
                  onClick={saveEduData}
                  variant="success"
                  className="saveBtn"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setToggleEditEdu(true)}
                  variant="danger"
                  className="saveBtn"
                  style={{ marginLeft: "5px" }}
                >
                  Cancel
                </Button>
              </>
            ) : null}
          </div>
          <div className="description">
            <textarea
              placeholder="Add Job"
              className="textarea"
              disabled={toggleEditJob}
              ref={jobRef}
            >
              {userData.job}
            </textarea>{" "}
            <Button onClick={editJob} className="editBtn">
              Edit
            </Button>
            {toggleEditJob == false ? (
              <>
                <Button
                  onClick={saveJobData}
                  variant="success"
                  className="saveBtn"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setToggleEditJob(true)}
                  variant="danger"
                  className="saveBtn"
                  style={{ marginLeft: "5px" }}
                >
                  Cancel
                </Button>
              </>
            ) : null}
          </div>
          <div className="description">
            <textarea
              placeholder="Personal Description"
              className="textarea"
              disabled={toggleEditDesc}
              ref={descRef}
            >
              {userData.description}
            </textarea>{" "}
            <Button onClick={editDesc} className="editBtn">
              Edit
            </Button>
            {toggleEditDesc == false ? (
              <>
                <Button
                  onClick={saveData}
                  variant="success"
                  className="saveBtn"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setToggleEditDesc(true)}
                  variant="danger"
                  className="saveBtn"
                  style={{ marginLeft: "5px" }}
                >
                  Cancel
                </Button>
              </>
            ) : null}
          </div>
          <br />
          <h3>Hobbies</h3>
         
         <Hobbies hobbies={userData.interests}/>
          
          {/* //TODO FIX CATEGORIES */}


        
        </div>
      </Row>
    </Container>
  );
}

export default MyProfile;
