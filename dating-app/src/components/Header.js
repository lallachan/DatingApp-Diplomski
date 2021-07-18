import React, { useContext, useEffect, useState } from 'react'
import "./Header.css"
import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    Dropdown
  } from "react-bootstrap";
import myContext from './contexts/myContext';
import { useHistory } from 'react-router-dom';
import { default as _ } from "lodash";
import axios from 'axios';
import { errorHandler } from './functions/Functions';
import Timer from "./Timer"

function Header() {

    const { accessToken,setAccessToken,userData } = useContext(myContext);
   
    const history = useHistory()

    const [lifes, setLifes] = useState(null)
    const [timeToFill, setTimeToFill] = useState(null)

     //FETCH LIVES OF USER



     useEffect(async() => {
       
      await fetchHearts()
          
    }, [])

    
    const LogOut = () => {
        
        setAccessToken(null)
        const refreshToken = localStorage.removeItem("refreshToken")
        
       
        if(_.isUndefined(refreshToken)){
            
            history.push("/")
        }

    }

    const myProfile = () => {
        history.push("/myProfile")
    }


  
    console.log(timeToFill)

    const fetchHearts = async () => {
      try {
       
        const res = await axios.get(
          process.env.REACT_APP_GET_USER_POINTS,
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
    
      console.log("lifes")
      console.log(res.data)
      setLifes(res.data.lifes)
      setTimeToFill(res.data.nextHeartAt)

      } catch (error) {
        errorHandler(error);
      }



    }



    return (
        <Row className="header">
          <Col lg={10}>Lifes 
          <h1>{lifes}</h1>
          {timeToFill == null ? null : <Timer date={timeToFill} fetchHearts={fetchHearts}/>}
          </Col>
         
            <Col lg={2} md={12} sm={12}>
            <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="button" style={{padding:"10px",marginLeft:"120px"}}>
                {/* Dropdown Button */}
                <img src={userData.imageUrl} width="30px"/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={myProfile}>My Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Notifications</Dropdown.Item>
                <Dropdown.Item href="#/action-2">My Chats</Dropdown.Item>
                <Dropdown.Item onClick={LogOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </Col>
        </Row>
    )
}

export default Header
