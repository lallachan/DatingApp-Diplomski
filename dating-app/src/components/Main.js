import React, { useContext, useEffect, useState } from 'react'
import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    Spinner
  } from "react-bootstrap";
import Map from './Map';
import Header from "./Header"
import axios from 'axios';
import { errorHandler } from './functions/Functions';
import myContext from './contexts/myContext';
import { default as _ } from "lodash";



function Main() {

    const [lastKnownLocation, setLastKnownLocation] = useState(false);
    const {accessToken,userData} = useContext(myContext)

    //PATCH USER LOCATION

    // useEffect(() => {
    //     if ("geolocation" in navigator) {
    //       console.log("Available");
    //     } else {
    //       console.log("Not Available");
    //     }
    
    //     navigator.geolocation.getCurrentPosition(async function (position) {
    //       console.log("Latitude is :", position.coords.latitude);
    //       console.log("Longitude is :", position.coords.longitude);
    

         
    //       try {
           
    //         const res = await axios.patch(
    //           process.env.REACT_APP_USER_LOCATION,
    //           {
    //             latitude : position.coords.latitude,
    //             longitude: position.coords.longitude
              
    //           },
    //           {
    //             headers: {
    //               authorization: accessToken,
    //             },
    //           }
    //         );
    //         console.log(res.data);
           
    //       } catch (error) {
    //         errorHandler(error);
    //       }
          
    //     });
    
    //     IF DOESNT WANT LOCATION SEND FALSE
    
    
    //   }, []);


    //   PATCH USER LOCATION IF LOCATION FALSE

    //   const sendLocation = async() => {
    //     try {
           
    //       const res = await axios.patch(
    //         process.env.REACT_APP_GET_USER_DATA,
    //         {
    //           latitude : false,
    //           longitude: false
            
    //         },
    //         {
    //           headers: {
    //             authorization: accessToken,
    //           },
    //         }
    //       );
    //       console.log(res.data);
         
    //     } catch (error) {
    //       errorHandler(error);
    //     }
        
    
    //   }
    
   

    // if(_.isUndefined(userData.lastKnownLocation)) sendLocation()
    //   console.log(userData)
    return (
        <Container fluid>
        
        <Row><Header/></Row>
       
        <br/>
      
        {_.isUndefined(userData.lastKnownLocation)?  <Spinner animation="border" />  : <Map/> }
        
        </Container>
    )

    
}

export default Main
