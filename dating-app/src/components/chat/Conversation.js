import React, { useEffect, useState } from 'react'
import { errorHandler } from '../functions/Functions'
import myContext from "../contexts/myContext";
import axios from "axios";

function Conversation({conversation,currentUser}) {

    const [user, setUser] = useState(null)


    //Set the friend user
    // useEffect(() => {
    //  const friendId = conversation.members.find(m=>m !== currentUser._id)

    //  //Fetch friend by id
    //  const getUser = async () => {
    //      try{
    //         const res = await axios("/users?userId="+friendId)
    //         setUser(res.data)
    //      }catch(err){
    //          errorHandler(err)
    //      }
    //  }
    // }, [currentUser, conversation])

    return (
        <div>
           {/* <h1>{user.firstName} {user.lastName}</h1>  */}
           
           {/* <img src={process.env.REACT_APP_CLOUDINARY_URL + user.imageUrl}/> */}
        </div>
    )
}

export default Conversation
