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
  Tooltip,
  Overlay,
  Modal,
} from "react-bootstrap";
import myContext from "./contexts/myContext";
import "./MyProfile.css";
import { Formik, Field, Form, useFormik } from "formik";
import { errorHandler } from "./functions/Functions";
import axios from "axios";
import { default as _, filter } from "lodash";
import Hobbies from "./Hobbies";
import Gallery from "./Gallery";
import ChangePassword from "./ChangePassword";
import Header from "./Header"

import pattern from "../images/pattern.jpg"

import {FaCamera} from 'react-icons/fa';

import {FaGraduationCap} from 'react-icons/fa';
import Slideshow from "./Slideshow";

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
  
  const [toggleChangePass, setToggleChangePass] = useState(false)

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

  const saveEduJobData = async () => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_GET_USER_DATA,
        { education: eduRef.current.value, job: jobRef.current.value },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(res.data);
      console.log("hej")
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

  
 
  const [show, setShow] = useState(false);
  const [showEduJob, setShowEduJob] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const [showSlideShow, setShowSlideShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleCloseEduJob = () => setShowEduJob(false);
  const handleShowEduJob = () => setShowEduJob(true);


  const handleClosePass = () => setShowPassword(false);
  const handleShowPass = () => setShowPassword(true);
  
  

  const handleCloseGallery = () => setShowGallery(false);
  const handleShowGallery = () => setShowGallery(true);

  const handleCloseHobbies = () => setShowHobbies(false);
  const handleShowHobbies = () => setShowHobbies(true);

  const handleCloseSlideShow = () => setShowSlideShow(false);
  const handleShowSlideShow = () => setShowSlideShow(true);
  
  

  const [slideshow, setSlideshow] = useState(false)

  return (
    <Container fluid
    style={{
      background: `url(${pattern})`,
      height: "100vh",
      backgroundSize: "cover",
      backgroundPosition: "center",
    
    }}
    >
      <Row>
        <Header/>
      </Row>
      <Row>

      <Col lg={4} md={12} sm={10} className="aboutMe">
        {/* <Row>
          <Col>
          <Button className="talk" >Razgovaraj</Button>
          </Col>
          <Col>
          <div style={{float:"right"}}>
          <Button style={{marginTop:"10px",marginRight:"10px",borderRadius:"0px",backgroundColor:"#F59391",border:"none"}}>Like</Button>
          <Button style={{marginTop:"10px",borderRadius:"0px",backgroundColor:"#DF314D",border:"none"}}>Dislike</Button>
          </div>
          <div style={{clear:"both"}}></div>
          </Col>
        
        </Row> */}


        <Row>
          <Col>
          <img src={imageUrl} width="50%" className="myProfilePhoto" />
          <Button className="changeProfilePhotoButton" onClick={changeProfilePhoto}><FaCamera/></Button>
          </Col>
        </Row>

        <Row style={{paddingLeft:"50px"}}>

        <Col>
        <h3 className="credentials">{userData.firstName} {userData.lastName},{userData.age}, {userData.gender}</h3>
        <h5 className="credentials" style={{marginTop:"20px"}}>{userData.city},{userData.zip}</h5>
        </Col>


        </Row>


        <Row style={{paddingLeft:"50px"}}>

          <Col lg={8}>
            <h3 className="titleMe">O meni</h3>
            <p className="desc">{userData.description}</p>
          </Col>
          <Col>
          <Button className="editButton" style={{marginTop:"30px"}} onClick={handleShow}>
          Uredi
      </Button>

      <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Uredi opis</Modal.Title>
    </Modal.Header>
    <Modal.Body>
   
        <textarea
          placeholder="Personal Description"
          className="textarea"
          maxlength="150"
          ref={descRef}
        >
          {userData.description}
        </textarea>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={saveData}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
          </Col>
        </Row>


        <Row style={{paddingLeft:"50px"}}>

          <Col lg={8}>
          <h3 className="titleMe">Posao/Edukacija</h3>
          <p>{userData.education}</p>
          <p>{userData.job}</p>
          </Col>


          <Col>
          <Button className="editButton" style={{marginTop:"30px"}} onClick={handleShowEduJob}>
          Uredi
           </Button>

           <Modal show={showEduJob} onHide={handleCloseEduJob}>
            <Modal.Header closeButton>
              <Modal.Title>Uredi Posao/Edukacija</Modal.Title>
            </Modal.Header>
            <Modal.Body>
   
            <h5>Edukacija</h5>
            <textarea
              placeholder="Add Education"
              className="textarea"
              maxLength={100}
              ref={eduRef}
            >
              {userData.education}
            </textarea>

            <h5>Posao</h5>
            <textarea
              placeholder="Add Job"
              className="textarea"
              maxLength={100}
              ref={jobRef}
            >
              {userData.job}
            </textarea>
           
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseEduJob}>
        Close
      </Button>
      <Button variant="primary" onClick={saveEduJobData}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>



          </Col>
          </Row>

          <Row style={{paddingLeft:"50px"}}>

            <Col>
            <Button style={{backgroundColor:"#578BB8",border:"none",borderRadius:"0",marginBottom:"20px"}} onClick={handleShowPass}>Promijeni lozinku</Button>
            </Col>

              <Modal show={showPassword} onHide={handleClosePass}>
              <Modal.Header closeButton>
                <Modal.Title>Promijeni lozinku</Modal.Title>
              </Modal.Header>
              <Modal.Body>
    
            <ChangePassword/>
            
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePass}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClosePass}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>


          </Row>



      </Col>

     
      <Col lg={7} md={7} sm={10} className="nextMe">

      <Row>

      <Col lg={10}>
      <h3 className="titleMe" style={{marginTop:"30px",marginLeft:"20px"}}>Galerija</h3>
      

      </Col>
      <Col>
      <Button className="editButton" style={{marginTop:"20px"}} onClick={handleShowGallery}>
          Uredi
      </Button>


 <Modal show={showGallery} onHide={handleCloseGallery}>
              <Modal.Header closeButton>
                <Modal.Title>Uredi Galeriju</Modal.Title>
              </Modal.Header>
              <Modal.Body>

              <Gallery/>
            
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseGallery}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseGallery}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

      </Col>

      </Row>
    
      <Row style={{marginLeft:"10px",marginTop:"10px"}}> 
      
      {userData.gallery.map(img=>{
        return <img src={img.imageUrl} style={{width:"30%",height:"200px",backgroundSize:"cover",borderRadius:"0px"}}
        onClick={handleShowSlideShow}
        />
      })}


    <Modal show={showSlideShow} onHide={handleCloseSlideShow} className="slideShow" size="xl" closeButton>
              {/* <Modal.Header closeButton>
                <Modal.Title>Uredi Galeriju</Modal.Title>
              </Modal.Header> */}
              <Modal.Body >

              <Slideshow images={userData.gallery}/>
            
      </Modal.Body>
     
    </Modal>

     
      </Row>


      <Row>
        <Col lg={10}>
        <h3 className="titleMe" style={{marginTop:"30px",marginLeft:"20px",marginBottom:"20px"}}>Moji interesi</h3>
        {userData.interests.map(i=>{
          return <li className="myHobbies">{i.interest}</li>
        })}
        </Col>
        <Col lg={2}>
        <Button className="editButton" style={{marginTop:"50px"}} onClick={handleShowHobbies}>
          Uredi
      </Button>

      <Modal show={showHobbies} onHide={handleCloseHobbies}>
            <Modal.Header closeButton>
              <Modal.Title>Uredi interese</Modal.Title>
            </Modal.Header>
            <Modal.Body>
   
            <Hobbies hobbies={userData.interests}/>
           
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseHobbies}>
        Close
      </Button>
      <Button variant="primary" onClick={saveData}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>



        </Col>
      </Row>

      </Col>

        {/* <div className="profile">
          <div className="profilePhoto">
            <img src={imageUrl} width="50%" />
            <br />
            <Button style={{ marginTop: "10px" }} onClick={changeProfilePhoto}>
              Change Profile Photo
            </Button>
          </div>{" "}
          <p className="name">
            {userData.firstName} {userData.lastName} , {userData.age} , {userData.gender}
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
          <br/><br/>
         <Button variant="secondary" onClick={()=>setToggleChangePass(!toggleChangePass)}>Change my Password</Button>

          {toggleChangePass == true ? 
          
            <ChangePassword/> : null
        }

        
        </div> */}
      </Row>
    </Container>
  );
}

export default MyProfile;
