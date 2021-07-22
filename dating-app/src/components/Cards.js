import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import "./Cards.css"
import myContext from './contexts/myContext';
import { getSexOr } from "./functions/Functions";

function Cards(props) {
    const {users} = props

    const {userData} = useContext(myContext)
    return (
        <div className="cards">
            {users.map(user=>{
                if(user._id == userData._id) return
                return <div className="card">
                    <br/>
                    <img src={user.imageUrl} width="30%" style={{margin:"0 auto"}}/>
                    <p>{user.firstName} {user.lastName}</p>
                   <p>{user.sexualOrientation == null ? null : "Looking for : " + getSexOr(user.sexualOrientation)}</p>
                    <p>{user.education}</p>
                    <p>{user.job}</p>
                    <p>{user.description}</p>
                  <p>{user.city},{user.zip}</p>

                <p style={{margin:"0 auto"}}>
                  <Button  className="btn" variant="primary">View Profile</Button>
                    <Button className="btn"  variant="primary">Like</Button></p>
                    </div>
                   
                  
                      
                       
            })}
        </div>
    )
}

export default Cards
