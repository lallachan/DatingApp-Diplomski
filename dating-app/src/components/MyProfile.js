import React, { useContext, useRef, useState } from "react";
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

function MyProfile() {
  const { userData, accessToken } = useContext(myContext);
  const descRef = useRef(userData.description);
  const eduRef = useRef(userData.education);
  const jobRef = useRef(userData.job);
  const selectRef = useRef();
  const [imageUrl, setImageUrl] = useState(userData.imageUrl);

  const [toggleEditDesc, setToggleEditDesc] = useState(true);
  const [toggleEditEdu, setToggleEditEdu] = useState(true);
  const [toggleEditJob, setToggleEditJob] = useState(true);

  const [displayTags, setDisplayTags] = useState(false);
  const [hobbies, setHobbies] = useState([

  ]);
  const [sexOr, setSexOr] = useState("");

  const [jobData, setJobData] = useState("")

  const entHobbies = ["TV Series", "Games", "Movies"];
 

  const editDesc = () => {
    setToggleEditDesc(false);
  };

  const editEdu = () => {
    setToggleEditEdu(false);
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

  const showSelect = () => {
    setDisplayTags(true);
  };

  const addHobby = (value) => {
    setHobbies([...hobbies, value]);
  };

  console.log(hobbies);

  return (
    <Container fluid>
      <Row>
        <div className="profile">
          <div className="profilePhoto">
            <img src={imageUrl} width="50%" />
            <br />
            <Button style={{ marginTop: "10px" }} onClick={showWidget}>
              Change Profile Photo
            </Button>
          </div>

          <div className="intro">
            {" "}
            <p>
              {userData.firstName} {userData.lastName} , AGE
            </p>
            <p>
              {userData.city},{userData.zip}
            </p>
            <p></p>
          </div>
          <h3>I'm interested in</h3>
          <p style={{ fontSize: "20px" }}>
            {getSexOr(userData.sexualOrientation)}
          </p>

          <h3>Gallery</h3>
          {/* <img src={userData.imageUrl} className="gallery"/><br/> */}
          <Button>Add New Photo</Button>
          <br/>
          <br/>
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
            <Button onClick={editEdu} className="editBtn">Edit</Button>

            {toggleEditEdu == false ? (
              <Button onClick={saveEduData} variant="success" className="saveBtn">Save Changes</Button>
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

            <Button onClick={editJob} className="editBtn">Edit</Button>

            {toggleEditJob == false ? (
              <Button onClick={saveJobData} variant="success" className="saveBtn">Save Changes</Button>
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
            <Button onClick={editDesc} className="editBtn">Edit</Button>
            {toggleEditDesc == false ? (
              <Button onClick={saveData} variant="success" className="saveBtn">Save Changes</Button>
            ) : null}
          </div>
         
          <br/>
          <h3>Hobbies</h3>

          <h5>Choose some of the hobbies you like.</h5>

            {/* //TODO FIX CATEGORIES */}
            {displayTags == true ? (
              <>
                <select
                  ref={selectRef}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option disabled selected>
                    Choose hobbies
                  </option>

                  {entHobbies.map((hobbie, i) => {
                    return <option value={hobbie}>{hobbie}</option>;
                  })}
                </select>
                <Button onClick={() => addHobby(selectRef.current.value)}>
                  Add
                </Button>
              </>
            ) : (
              <></>
            )}
          <Row>
          <ol className="categories">
            <li>
              <Button
                style={{ backgroundColor: "#FF69B4", border: "none" }}
                className="categoryBtn"
                onClick={showSelect}
              >
                Entertainment
              </Button>
            </li>

          

            <p>{hobbies}</p>
            <br />
            <br />

            <li>
              <Button variant="warning"  className="categoryBtn"> Health/Fitness</Button>
            </li>

            <li>
              <Button variant="danger"  className="categoryBtn">Food</Button>
            </li>

            <li>
              <Button variant="info"  className="categoryBtn">Reading/Learning</Button>
            </li>

            <li>
              <Button variant="success"  className="categoryBtn">Outdoor Activies</Button>
            </li>

            <li>
              <Button variant="secondary"  className="categoryBtn">Other</Button>
            </li>
          </ol>
          </Row>
          <div style={{ clear: "both" }}></div>
        </div>
      </Row>
    </Container>
  );
}

export default MyProfile;
