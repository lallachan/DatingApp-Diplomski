import React, { useContext, useState } from 'react'
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
function Header() {

    const { accessToken,setAccessToken } = useContext(myContext);
   
 
    const history = useHistory()

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
          <Col lg={10}></Col>
            <Col lg={2} md={12} sm={12}>
            <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="button">
                Dropdown Button
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
