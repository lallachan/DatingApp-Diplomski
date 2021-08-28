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
import { errorHandler, resizeCloudinary } from "./functions/Functions";
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
  
  const [numberOfNotifications, setNumberofNotification] = useState(0)
  
  //FETCH LIVES OF USER

  useEffect(async () => {
    await fetchHearts();
  }, []);

  useEffect(() => {
    if(userPoints!=null){
      
      setLifes(userPoints.lifes);
      setTimeToFill(userPoints.nextHeartAt);
    }

    
  }, [userPoints])

  useEffect(()=>{
    setNumberofNotification(notifications.filter(el=>!el.seen).length)
  
  },[notifications])


  useEffect(() => {
    socket.on("getNotification", async(data) => {

      try {
        const res = await axios.get(process.env.REACT_APP_GET_USER_DATA+"/"+data.senderId,{
        headers: {
          authorization: accessToken,
        }})
  

        const noficationText = `Dobili ste novu poruku od ${res.data.firstName} ${res.data.lastName}` 
        const obj = data
        obj.text = noficationText
        setArrivalNotification(obj);
      } catch (error) {
        errorHandler(error)
      }

      
    });
  }, []);



  useEffect(() => {
    if (arrivalNotification != null) {
      let arr = [...notifications, arrivalNotification]
      arr =arr.filter(el=>[...new Set(arr.map(el=>el._id))].includes(el._id)) 
      console.log(arr)
      setNotifications(arr);
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

      let arr  = [...res.data.notifications,...res.data.chat_notifications]
      arr = arr.sort((a,b)=> b.date-a.date )
      console.log(arr)
      setNotifications(arr)

    } catch (error) {
      errorHandler(error);
    }
  };

  const setSeenNotification = async (n_id, type, senderId, chat_id = null) => {
    
    console.log( (n_id, type, senderId, chat_id) )
    
    const txt =
      type == "0"
        ? process.env.REACT_APP_GET_CHAT_NOTIFICATION
        : process.env.REACT_APP_GET_NOTIFICATION;

    const goToPage = (senderId) => {
      if (type == 0) {
        history.push(`/chat/${chat_id}`);
      } else if (type == 1) {
        history.push(`/user/${senderId}`);
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
      setNumberofNotification(numberOfNotifications-1)
      
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
          <img  src={logo} style={{ width: "200px",marginTop:"-10px"}} onClick={()=>history.push("/main")} /><span className="title-app">FindMe</span>
        </Col>

        

        

       

        <Col lg={8} md={2} sm={2} style={{textAlign:"right"}}>
         
        {/* <Col lg={2}>
        <Button onClick={()=>decrease()}> decrease</Button>
         
        </Col>
         */}
      
        <Col style={{marginLeft:"90px",marginTop:"30px"}}>
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

         
              
            <div class="dropdown">
            <FaBell id="notBell" /> 
            {numberOfNotifications == 0 ? null : <span id="badge">{numberOfNotifications}</span>} 
            
            <div class="dropdown-notification">
            {notifications?.map((n) => {
            
              return (
               
                <p style={n.seen == false? {backgroundColor:"lightgrey"} : {backgroundColor:"white"}} onClick={()=>{
                  n.type == 0?setSeenNotification(n._id,n.type,n.senderId,n.chat_id):setSeenNotification(n._id,n.type,n.senderId)
                }}>
               
                  {n.text}
                </p>
              );
            })}
            {/* {chatNotification?.map(n=>{
           
              return  (<p style={n.seen == false? {backgroundColor:"lightgrey"} : {backgroundColor:"white"}} onClick={()=>setSeenNotification(n._id,n.type,n.senderId,n.chat_id)}>
               
              {n.text}
            </p>)
            })} */}

            </div>
          </div>
      
              
           
            </Col>

            <Col lg={4} md={4} sm={4}>
            <div class="dropdown">
            <img src={resizeCloudinary(userData.imageUrl)} className="userPhoto"/>
        <div class="dropdown-content">
        <p className="dropdown-item" onClick={myProfile}>My Profile</p>
        <p className="dropdown-item" onClick={()=>history.push("/chat/threads")}>My Chats</p>
        <p className="dropdown-item" onClick={LogOut}>Log Out</p>
        

        </div>
      </div>
      
              
          </Col>

         
        </Row>


        </Col>


        
    </Row> 


     </Container>
  );
}

export default Header;
