import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import myContext from "./contexts/myContext";
import { errorHandler, getSexOr } from "./functions/Functions";
import { Spinner, Container, Button, Row, Col, Modal } from "react-bootstrap";
import { default as _ } from "lodash";
import "./MyProfile.css";

import Header from "./Header"

import pattern from "../images/pattern.jpg"

import {FaCamera} from 'react-icons/fa';
import Slideshow from "./Slideshow";

function UserProfile() {
  const [friendData, setFriendData] = useState(null);
  const { id } = useParams();
  const { accessToken, userPoints, setUserPoints } = useContext(myContext);
  const [showSlideShow, setShowSlideShow] = useState(false);
  const handleCloseSlideShow = () => setShowSlideShow(false);
  const handleShowSlideShow = () => setShowSlideShow(true);

  const history = useHistory();

  const handleClick = async () => {
    //Set the user id to cookie

    localStorage.setItem("recieverId", id);

    //Create chat

    try {
      const res = await axios.post(
        process.env.REACT_APP_CHAT_ROUTE,
        { recipient_id: id },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );

      console.log(res.data);
      history.push(`/chat/${res.data.chat_id}`);
    } catch (err) {
      console.log(err);
      errorHandler(err);
      // alert("You dont have points! :(");
    }
  };

  useEffect(async () => {
    if (friendData == null) {
      try {
        const res = await axios.get(
          process.env.REACT_APP_GET_USER_DATA + `/${id}`,

          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        console.log(res.data);
        setFriendData(res.data);
      } catch (error) {
        errorHandler(error);
      }
    }
  }, []);

  const likeUser = async (id) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_LIKE_USER + `/${friendData._id}`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(res.data);
      setUserPoints(res.data);
    } catch (error) {
      errorHandler(error);
    }
  };

 

  return (
    
   
     
    
    <Container fluid
    style={{
      background: `url(${pattern})`,
      height: "100vh",
      backgroundSize: "cover",
      
    
    }}
    >
       {_.isNull(friendData) ? (
      <Spinner animation="border" role="status" />
    ) : ( <React.Fragment>
      <Row>
        <Header/>
      </Row>
      <Row>

      <Col lg={4} md={12} sm={10} className="aboutMe">
        <Row>
          <Col>
          <Button className="talk">Razgovaraj</Button>
          </Col>
          <Col>
          <div style={{float:"right"}}>
          <Button style={{marginTop:"10px",marginRight:"10px",borderRadius:"0px",backgroundColor:"#F59391",border:"none"}}>Like</Button>
          <Button style={{marginTop:"10px",borderRadius:"0px",backgroundColor:"#DF314D",border:"none"}}>Dislike</Button>
          </div>
          <div style={{clear:"both"}}></div>
          </Col>
        
        </Row>


        <Row>
          <Col>
          <img src={friendData?.imageUrl} width="50%" className="myProfilePhoto" />
       
          </Col>
        </Row>

        <Row style={{paddingLeft:"50px"}}>

        <Col>
        <h3 className="credentials">{friendData.firstName} {friendData.lastName},{friendData.age}, {friendData.gender}</h3>
        <h5 className="credentials" style={{marginTop:"20px"}}>{friendData.city},{friendData.zip}</h5>
        </Col>


        </Row>


        <Row style={{paddingLeft:"50px"}}>

          <Col lg={8}>
            <h3 className="titleMe">O meni</h3>
            <p className="desc"> 
             <p>{_.isUndefined(friendData.description) ? "Nema opis." : friendData.description}</p> 
        
              </p>
          </Col>
          <Col>
         
  
          </Col>
        </Row>


        <Row style={{paddingLeft:"50px"}}>

          <Col lg={8}>
          <h3 className="titleMe">Posao/Edukacija</h3>
          <p>{_.isUndefined(friendData.education) ? "Nema dodanu edukaciju." : friendData.education}</p> 
          <p>{_.isUndefined(friendData.job) ? "Nema dodan posao." : friendData.job}</p> 
          </Col>


          <Col>
        



          </Col>
          </Row>

          



      </Col>

     
      <Col lg={7} md={7} sm={10} className="nextMe">

      <Row>

      <Col lg={10}>
      <h3 className="titleMe" style={{marginTop:"30px",marginLeft:"20px"}}>Galerija</h3>
      

      </Col>
     

      </Row>
    
      <Row style={{marginLeft:"10px",marginTop:"10px"}}> 
      

      {_.isEmpty(friendData.gallery) ? "Prazna galerija." : friendData.gallery.map(img=>{
        return <img src={img.imageUrl} style={{width:"30%",height:"200px",backgroundSize:"cover",borderRadius:"0px"}}
        onClick={handleShowSlideShow}
        />
      })}
      


    <Modal show={showSlideShow} onHide={handleCloseSlideShow} className="slideShow" size="xl" closeButton>
              {/* <Modal.Header closeButton>
                <Modal.Title>Uredi Galeriju</Modal.Title>
              </Modal.Header> */}
              <Modal.Body >

              <Slideshow images={friendData.gallery}/>
            
      </Modal.Body>
     
    </Modal>

     
      </Row>


      <Row>
        <Col lg={10}>
        <h3 className="titleMe" style={{marginTop:"30px",marginLeft:"20px",marginBottom:"20px"}}>Moji interesi</h3>

        {_.isEmpty(friendData.interests) ? "Nema interesa za prikaz." : 
        
        friendData.interests.map(i=>{
          return <li className="myHobbies">{i.interest}</li>
        })
        }
      
    
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
      </React.Fragment> )}
    </Container>


    // <Container fluid>
    //   {_.isNull(friendData) ? (
    //     <Spinner animation="border" role="status" />
    //   ) : (
    //     <React.Fragment>
    //       <Row>
    //         <div className="profile">
    //         <Button size="lg" variant="primary" onClick={handleClick}>
    //             Chat Now
    //           </Button>
    //           <Button
    //             size="lg"
    //             variant="primary"
    //             onClick={() => likeUser(friendData._id)}
    //             disabled={
    //               userPoints?.liked.includes(friendData._id) ? true : false
    //             }
    //           >
    //             Like
    //           </Button>
    //           <div className="profilePhoto">
    //             <img src={friendData?.imageUrl} width="50%" />

    //             <br />
    //           </div>{" "}
    //           {console.log(friendData)}
    //           <p className="name">
    //             {friendData.firstName} {friendData.lastName} , {friendData.age}{" "}
    //             , {friendData.gender}
    //           </p>
    //           <h3>City</h3>
    //           <p>
    //             {friendData.city},{friendData.zip}
    //           </p>
    //           <p></p>
    //           <h3>I'm interested in</h3>
    //           {friendData.sexualOrientation == null ? (
    //             <p>Not yet filled</p>
    //           ) : (
    //             <p>{getSexOr(friendData.sexualOrientation)}</p>
    //           )}
    //           <h3>Gallery</h3>
    //           {friendData.gallery == "" ? (
    //             <p>No images in gallery</p>
    //           ) : (
    //             friendData.gallery.map((img) => {
    //               return (
    //                 <img
    //                   src={img.imageUrl}
    //                   style={{
    //                     borderRadius: "0px",
    //                     width: "30%",
    //                     marginRight: "10px",
    //                   }}
    //                 />
    //               );
    //             })
    //           )}
    //           <h3>About</h3>
    //           <div className="description">
    //             {friendData.desc == null ? (
    //               <p>No description added</p>
    //             ) : (
    //               <p>{friendData.desc}</p>
    //             )}
    //           </div>
    //           <div className="description">
    //             <h3>Education</h3>
    //             {friendData.education == null ? (
    //               <p>No education added</p>
    //             ) : (
    //               <p>{friendData.education}</p>
    //             )}
    //           </div>
    //           <div className="description">
    //             <h3>Job</h3>
    //             {friendData.job == null ? (
    //               <p>No job added</p>
    //             ) : (
    //               <p>{friendData.job}</p>
    //             )}
    //           </div>


    //           <br />
    //           <h3>Hobbies</h3>


            
               
    //             {friendData.gallery == "" ? (
    //               <p>No hobbies yet to show</p>
    //             ) : (
    //               friendData.interests.map((i) => {
    //                 return <li className="hobbies">{i.interest}</li>;
    //               })
    //             )}
             
              
            
    //         </div>
    //       </Row>
    //     </React.Fragment>
    //   )}
    // </Container>
  );
}

export default UserProfile;
