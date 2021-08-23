import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "./Cards.css"
import myContext from './contexts/myContext';
import { errorHandler, getSexOr } from "./functions/Functions";
import axios from "axios";
import { default as _ } from "lodash";
import { FaHeart } from 'react-icons/fa';

function Cards(props) {
    const {users,setViewport} = props

    const {userData,accessToken,userPoints,setUserPoints} = useContext(myContext)
    console.log(userPoints)
    const history = useHistory()
   
    
    const viewProfile = (id) => {
        history.push(`/user/${id}`);
    }


    const likeUser = async(id) => {
      try {
        const res = await axios.get(process.env.REACT_APP_LIKE_USER + `/${id}`,
        {
            headers:{
                'authorization': accessToken
              }
        }
        )
        console.log(res.data)
        setUserPoints(res.data)
       
        
      } catch (error) {
        errorHandler(error);
      }
    }


    return (
        <div  className="cards">
            <h3 style={{color:"white"}}>Korisnici na mapi</h3>
            
            {users.map(user=>{
                if(user._id == userData._id) return
                return <Row style={{margin:"0",padding:"0",marginTop:"20px"}} className="card" onClick={()=>setViewport({
                  width: "100%",
                  height: "90vh",
                    latitude: user.lastKnownLocation.coordinates[0],
                    longitude: user.lastKnownLocation.coordinates[1],
                    zoom: 15,
                  })}>
                    <br/>
                    <Row style={{marginTop:"10px"}}>
                    <Col lg={4}>
                    <img src={user.imageUrl} width="30%" id="rounded-image"/>
                    <Button className="user-button" onClick={()=>viewProfile(user._id)}>Pogledaj Profil</Button>
                   
                    {/* <FaHeart className="like" /> */}
                 
                    <Button className="btn1"  variant="primary" style={{width:"50%",marginTop:"10px",marginLeft:"10px"}} onClick={()=>likeUser(user._id)} disabled={
                      userPoints?.liked.includes(user._id) ? true : false
                    }>Like
                 
                    </Button>
                    </Col>

                    <Col lg={8}>
                    <h1 className="user-name">{user.firstName} {user.lastName} ,{user.age},{user.gender}</h1>
                    
                    <h3 className="user-city">{user.city},{user.zip}</h3>
                    {/* //DISTANCE 2km od tebe */}<p style={{color:"#578BB8",fontWeight:"bold"}}>2 km od mene</p>
                    <h5>O meni</h5>
                    <p>{_.isNull(user.description) ? user.description : "Nema opisa"}</p>
                    <p>{user.interests?.map(i=>{
                      return <li className="user-interest"
                      >{i.interest}</li>
                  })}</p>
                    </Col>

                  

                    

                   
                   

                    </Row>

                   
                
                   
               

                
               
                   
                    </Row>
                   
                  
                      
                       
            })}
        </div>
    )
}

export default Cards
