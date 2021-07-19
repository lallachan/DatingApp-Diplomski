import React, { useContext, useRef, useState } from "react";
import { Alert, Button, Col, Container, Row, Dropdown, DropdownButton, ButtonGroup, Popover, OverlayTrigger } from "react-bootstrap";
import myContext from "./contexts/myContext";
import "./MyProfile.css";
import { Formik, Field, Form, useFormik } from "formik";
import { errorHandler } from "./functions/Functions";
import axios from "axios";

function MyProfile() {
  const { userData,accessToken } = useContext(myContext);
    const eduRef = useRef("TEHNIČKO VELEUČILIŠTE ZAGREB")
    const descRef = useRef(userData.description)
    const selectRef = useRef()
    const [imageUrl, setImageUrl] = useState(userData.imageUrl);
    const [toggleEdit, setToggleEdit] = useState(true)
  
    const [displayTags, setDisplayTags] = useState(false)
    const [hobbies, setHobbies] = useState([])
  

    const entHobbies = ["TV Series","Games","Movies"]

    const editDesc = () => {


    setToggleEdit(false)

    console.log("hej")

  }

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
        setImageUrl(result.info.files[0].uploadInfo.secure_url);
        
        saveImage(result.info.files[0].uploadInfo.secure_url)
      }
    }
  );

  function showWidget() {

   
    widget.open();
  }

  

  const saveData = async() => {

    try {
       
        const res = await axios.patch(process.env.REACT_APP_GET_USER_DATA,{description:descRef.current.value},
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

  }

  const saveImage = async (image) => {
    try {
      
        const res = await axios.patch(process.env.REACT_APP_GET_USER_DATA,{imageUrl:image},
        {
            headers:{
                'authorization':accessToken
              }
        }

        )
        console.log(res.data)
       
        
      } catch (error) {
        errorHandler(error);
      }
  }


  const showSelect = () => {
   
    setDisplayTags(true)
  }


  const addHobby = (value) => {
    setHobbies([...hobbies, value]);
  }


  console.log(hobbies)



  return (
    <Container fluid>


         
       
      <Row>
        <div className="profile">
          <div className="profilePhoto">
            <img src={imageUrl} width="50%"/>
            <br />
            <Button style={{ marginTop: "10px" }} onClick={showWidget}>Change Profile Photo</Button>
          </div>

          <div className="intro">
            {" "}
            <p>
              {userData.firstName} {userData.lastName} , AGE
            </p>
            <p>
              {userData.city},{userData.zip}
            </p>
          </div>

          <h3>Gallery</h3>
          {/* <img src={userData.imageUrl} className="gallery"/><br/> */}
          <Button >Add New Photo</Button>

          <h3>About</h3>

          <div className="description">
            <input type="text" placeholder="Add Education" className="textarea" disabled />
            <Button>Edit</Button>
          </div>
          <div className="description">
          <input type="text" placeholder="Add Job" className="textarea" disabled/>
           
            <Button>Edit</Button>
          </div>
          <div className="description">
            <textarea
              placeholder="Personal Description"
              className="textarea"
              disabled={toggleEdit}
              ref={descRef}
            >{userData.description}</textarea>{" "}
            <Button onClick={editDesc}>Edit</Button> 
            
            {toggleEdit == false ? <Button onClick={saveData}>Save Changes</Button> : null}
          </div>

          <h3>Hobbies</h3>

          <h5>Choose some of the hobbies you like.</h5>

          <ol className="categories">
            <li><Button style={{backgroundColor:"#FF69B4",border:"none"}} className="btn"
            onClick={showSelect}
            
            >Entertainment</Button>
         
            </li>

           
 
 {displayTags == true ?  <><select ref={selectRef} class="form-select" aria-label="Default select example">
            <option disabled selected>Choose hobbies</option>

            {entHobbies
           
            .map((hobbie,i)=>{
               
               return <option value={hobbie}>{hobbie}</option>
           
            })}
            
            
            </select><Button onClick={()=>addHobby(selectRef.current.value)}>Add</Button></> : <></>}
           
           <p>{hobbies}</p>
           <br/><br/>

            <li><Button variant="warning"> Health/Fitness</Button></li>
           
            <li><Button variant="danger">Food</Button></li>
            
            <li><Button variant="info">Reading/Learning</Button></li>
           
            <li><Button variant="success">Outdoor Activies</Button></li>
           
            <li><Button variant="secondary">Other</Button></li>
            
           
          </ol>

          <div style={{clear:"both"}}></div>
           
         

        </div>


      
      </Row>
    </Container>
  );
}

export default MyProfile;
