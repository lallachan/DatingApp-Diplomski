import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Dropdown,
  NavDropdown,
  Badge,
  Nav,
  Navbar,
  
} from "react-bootstrap";
import myContext from "./contexts/myContext";
import { useHistory } from "react-router-dom";
import { default as _, set } from "lodash";
import axios from "axios";
import { errorHandler } from "./functions/Functions";
import Timer from "./Timer";
import notImg from "../images/Notifications.png";

import logo from "../images/logo_transparent.svg";
import heart from "../images/heart.png";
import bell from "../images/bell.svg";

import { FaBell } from "react-icons/fa";

function Header() {
  const { accessToken, setAccessToken, userData, socket, setUserPoints,userPoints } =
    useContext(myContext);

  const history = useHistory();

  const [lifes, setLifes] = useState(null);
  const [timeToFill, setTimeToFill] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [arrivalNotification, setArrivalNotification] = useState(null);
  const [chatNotification, setChatNotifications] = useState(null);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  
  
  //FETCH LIVES OF USER

  useEffect(async () => {
    await fetchHearts();
  }, []);

  useEffect(() => {
    if(userPoints!=null){
      console.log(userPoints.lifes)
      setLifes(userPoints.lifes);
      setTimeToFill(userPoints.nextHeartAt);
    }

    
  }, [userPoints])

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setArrivalNotification(data);
    });
  }, []);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  useEffect(() => {
    if (arrivalNotification != null) {
      setNotifications([...notifications, arrivalNotification]);
    }
  }, [arrivalNotification]);

  useEffect(() => {}, [lifes]);

  const LogOut = () => {
    setAccessToken(null);
    const refreshToken = localStorage.removeItem("refreshToken");

    if (_.isUndefined(refreshToken)) {
      history.push("/");
    }
  };

  const myProfile = () => {
    history.push("/myProfile");
  };


  const fetchHearts = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_GET_USER_POINTS, {
        headers: {
          authorization: accessToken,
        },
      });

      console.log("lifes");
      console.log(res.data);
      setUserPoints(res.data);


      setLifes(res.data.lifes);
      setTimeToFill(res.data.nextHeartAt);
      setNotifications(res.data.notifications);
      setChatNotifications(res.data.chat_notifications);


    } catch (error) {
      errorHandler(error);
    }
  };

  const setSeenNotification = async (n_id, type, senderId, chat_id) => {
    const txt =
      type == "0"
        ? process.env.REACT_APP_GET_CHAT_NOTIFICATION
        : process.env.REACT_APP_GET_NOTIFICATION;

    const goToPage = (senderId) => {
      if (type == 0) {
        history.push(`chat/${chat_id}`);
      } else if (type == 1) {
        history.push(`user/${senderId}`);
      }
    };

    try {
      const res = await axios.get(txt + `${n_id}`, {
        headers: {
          authorization: accessToken,
        },
      });

      console.log(res.data);
      goToPage(senderId);
    } catch (error) {
      errorHandler(error);
    }
  };



  const decrease = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/userPoints/decrease",
        {},
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(res.data);

      setUserPoints(res.data);
      setLifes(res.data.lifes);
      setTimeToFill(res.data.nextHeartAt);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
   
    <Container fluid
    style={{margin:"0",padding:"0"}}
    className="header">

    <Row
        style={{ width: "100%", padding: "0", margin: "0" }}
        
      >


        <Col lg={2} md={2} sm={2} >
          <img  src={logo} style={{ width: "60%",}} onClick={()=>history.push("/main")} /><span className="title-app">FindMe</span>
        </Col>

        

       

        <Col lg={8} md={2} sm={2} style={{textAlign:"right"}}>
         
        {/* <Col lg={2}>
        <Button onClick={()=>decrease()}> decrease</Button>
         
        </Col>
         */}
      
        <Col style={{marginLeft:"90px"}}>
        {timeToFill == null ? null : (
          <Timer date={timeToFill}  fetchHearts={fetchHearts} style={{marginTop:"-30px"}} />
        )}
        </Col>
       
        </Col>

     
        <Col lg={2} md={8} sm={8}>

        <Row>      

      
        
     

        <Col lg={2} md={2} sm={2}>
              <img
                src={heart}
                
                style={{
                  width: "50px",
                  marginTop: "20px",
                }}
              />
            <span>

            </span>
            </Col>
            
            <Col lg={1} style={{marginTop:"20px"}}>
              <h1 id="numberOfHearts">{lifes}</h1>
            </Col>

            <Col lg={2} md={2} sm={2} style={{marginLeft:"50px"}}>

           {/* //TODO ADD BADGE FOR UNSEEN NOTIFICATIONS */}
              
            <div class="dropdown">
            <FaBell id="notBell" /> 
            <div class="dropdown-notification">
            {notifications?.map((n) => {
              
              return (
                <p style={n.seen == false? {backgroundColor:"lightgrey"} : {backgroundColor:"white"}} onClick={()=>setSeenNotification(n._id,n.type,n.senderId)}>
                 
                  {n.text}
                </p>
              );
            })}
            {chatNotification?.map(n=>{

              return  (<p style={n.seen == false? {backgroundColor:"lightgrey"} : {backgroundColor:"white"}} onClick={()=>setSeenNotification(n._id,n.type,n.senderId,n.chat_id)}>
               
              {n.text}
            </p>)
            })}

            </div>
          </div>
      
              
           
            </Col>

            <Col lg={4} md={4} sm={4}>
            <div class="dropdown">
            <img src={userData.imageUrl} className="userPhoto"/>
        <div class="dropdown-content">
        <p className="dropdown-item" onClick={myProfile}>My Profile</p>
        <p className="dropdown-item">My Chats</p>
        <p className="dropdown-item" onClick={LogOut}>Log Out</p>

        </div>
      </div>
      
              
          </Col>

         
        </Row>


        </Col>

     

        {/* <Col lg={6} style={{backgroundColor:"pink",alignContent:"right"}}>

        <Row>


        <Col lg={2}>
              <img
                src={heart}
                style={{
                  width: "50%",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              />
            </Col>

            <Col lg={1} style={{ marginTop: "20px", marginLeft: "-90px" }}>
              <h1 id="numberOfHearts">5</h1>
            </Col>

            
            <Col lg={2}>
              <FaBell id="notBell" />
            </Col>

        
        <Col lg={2}>
              <img src={userData.imageUrl} className="userPhoto" />
          </Col> 

        </Row>
    
        </Col>  */}


    {/* <Col lg={5}>
        Lifes
        <h1>{lifes}</h1>
        {timeToFill == null ? null : (
          <Timer date={timeToFill} fetchHearts={fetchHearts} />
        )}
      </Col>  */}

   {/* <Col lg={12}> 

   <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Notifications
            {hasNewNotifications == true ? <span className="badge">1</span> : null}
            
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {notifications?.map((n) => {
              
              return (
                <Dropdown.Item style={n.seen == false? {backgroundColor:"lightgrey"} : {backgroundColor:"white"}} onClick={()=>setSeenNotification(n._id,n.type,n.senderId)}>
                 
                  {n.text}
                </Dropdown.Item>
              );
            })}
            {chatNotification?.map(n=>{

              return  (<Dropdown.Item style={n.seen == false? {backgroundColor:"lightgrey"} : {backgroundColor:"white"}} onClick={()=>setSeenNotification(n._id,n.type,n.senderId,n.chat_id)}>
               
              {n.text}
            </Dropdown.Item>)
            })}
          </Dropdown.Menu>
        </Dropdown> 
 <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="button"
            style={{ padding: "10px", marginLeft: "120px" }}
          >
           
            <img src={userData.imageUrl} width="30px" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={myProfile}>My Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">My Chats</Dropdown.Item>
            <Dropdown.Item onClick={LogOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> 

    </Col>  */}
    </Row> 
     </Container>
  );
}

export default Header;
