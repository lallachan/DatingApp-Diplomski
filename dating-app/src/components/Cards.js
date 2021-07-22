import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "./Cards.css"
import myContext from './contexts/myContext';
import { getSexOr } from "./functions/Functions";

function Cards(props) {
    const {users,setViewport} = props

    const {userData} = useContext(myContext)
    const history = useHistory()

    const viewProfile = (id) => {
        history.push(`/user/${id}`);
    }
    return (
        <div className="cards">
            <h3 style={{textAlign:"center",color:"white"}}>Users on Map</h3>
            {users.map(user=>{
                if(user._id == userData._id) return
                return <div className="card" onClick={()=>setViewport({
                    width: "100%",
                    height: "500px",
                    latitude: user.lastKnownLocation.coordinates[0],
                    longitude: user.lastKnownLocation.coordinates[1],
                    zoom: 15,
                  })}>
                    <br/>
                    <img src={user.imageUrl} width="30%" style={{margin:"0 auto"}}/>
                    <p>{user.firstName} {user.lastName}</p>
                   <p>{user.sexualOrientation == null ? null : "Looking for : " + getSexOr(user.sexualOrientation)}</p>
                    <p>{user.education}</p>
                    <p>{user.job}</p>
                    <p>{user.description}</p>
                  <p>{user.city},{user.zip}</p>
                  <p>{user.interests.map(i=>{
                      return <li>{i.interest}</li>
                  })}</p>

                <p style={{margin:"0 auto"}}>
                  <Button  className="btn1" variant="primary" onClick={()=>viewProfile(user._id)}>View Profile</Button>
                    <Button className="btn1"  variant="primary">Like</Button></p>
                    </div>
                   
                  
                      
                       
            })}
        </div>
    )
}

export default Cards