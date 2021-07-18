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


function Header() {

    const { accessToken,setAccessToken,userData } = useContext(myContext);
   
    const history = useHistory()

    const [lifes, setLifes] = useState(null)

     //FETCH LIVES OF USER

     useEffect(async() => {
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
          console.log(res.data.lifes)
          setLifes(res.data.lifes)

          } catch (error) {
            errorHandler(error);
          }
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


   



    return (
        <Row className="header">
          <Col lg={10}>Lifes 
          <h1>{lifes}</h1>
          </Col>
         
            <Col lg={2} md={12} sm={12}>
            <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="button" >
                {/* Dropdown Button */}
                <img src={userData.imageUrl} width="30px"/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={myProfile}>My Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Notifications</Dropdown.Item>
                <Dropdown.Item onClick={LogOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </Col>
        </Row>
    )
}

export default Header
