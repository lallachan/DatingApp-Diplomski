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

function Header() {
  const { accessToken, setAccessToken, userData, socket,setUserPoints } =
    useContext(myContext);

  const history = useHistory();

  const [lifes, setLifes] = useState(null);
  const [timeToFill, setTimeToFill] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [arrivalNotification, setArrivalNotification] = useState(null);
  const [chatNotification, setChatNotifications] = useState(null)
  const [hasNewNotifications, setHasNewNotifications] = useState(false)
  //FETCH LIVES OF USER

  useEffect(async () => {
    await fetchHearts();
  }, []);



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

  useEffect(() => {
  
  }, [lifes])

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
      setUserPoints(res.data)
      setLifes(res.data.lifes);
      setTimeToFill(res.data.nextHeartAt);
      setNotifications(res.data.notifications)
      setChatNotifications(res.data.chat_notifications)
    } catch (error) {
      errorHandler(error);
    }
  };

  const setSeenNotification = async(n_id,type,senderId,chat_id) => {
    const txt = type=='0'?process.env.REACT_APP_GET_CHAT_NOTIFICATION:process.env.REACT_APP_GET_NOTIFICATION

    const goToPage = (senderId) => {
      if(type == 0){
        history.push(`chat/${chat_id}`)
      }
      else if(type == 1){
        history.push(`user/${senderId}`)
      }
    }

    

    try {
      const res = await axios.get(txt + `${n_id}`, 
        {
        headers: {
          authorization: accessToken,
        },
      });

     
      console.log(res.data);
      goToPage(senderId)
      
    } catch (error) {
      errorHandler(error);
    }

  }

  const decrease = async() => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/userPoints/decrease",
        {  },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(res.data);
      
      setUserPoints(res.data)
      setLifes(res.data.lifes);
      setTimeToFill(res.data.nextHeartAt);
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <Row className="header">
      <Col lg={5}>
        Lifes
        <h1>{lifes}</h1>
        {timeToFill == null ? null : (
          <Timer date={timeToFill} fetchHearts={fetchHearts} />
        )}
      </Col>

      <Col lg={5}>
        {/* <Button onClick={decrease}>Decrease</Button> */}
      </Col>

      <Col lg={2} md={2} sm={2}>
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
            {/* Dropdown Button */}
            <img src={userData.imageUrl} width="30px" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={myProfile}>My Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">My Chats</Dropdown.Item>
            <Dropdown.Item onClick={LogOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default Header;
