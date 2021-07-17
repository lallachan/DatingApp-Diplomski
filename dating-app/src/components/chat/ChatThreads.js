import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import myContext from '../contexts/myContext';
import { errorHandler } from '../functions/Functions';
import {default as _} from 'lodash'
import { Button,Spinner,Container,Col,Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import "./Chat.css"


function ChatThreads() {


    const {accessToken,userData} = useContext(myContext)
    const [threads, setThreads] = useState([])
    const [id, setId] = useState(null)
    const history = useHistory()

    useEffect(async() => {
    
        try {
            const res = await axios.get(
             process.env.REACT_APP_GET_USER_CHATS,
              {
                headers: {
                  authorization: accessToken,
                },
              }
            );
              
            console.log("Chat Threads")
          
            setThreads(res.data)
            if(userData._id == res.data.user_1){
                setId(res.data.user_1)
            }else{
                setId(res.data.user_2)
            }

          } catch (error) {
            errorHandler(error);
          }
      
    }, [])

    const changeChat = (id)=>{
        history.push(`/chat/${id}`)
    }

    return (

        <div className="chatThreads"> 
            {console.log(threads)}
            <h1>Chats</h1>
          
        {threads.map(t=>{
            return<> <Button className="thread" onClick={()=>changeChat(t._id)}>{t._id}</Button>
            <br/>
            <hr/>
            </>
        })}


        </div>
    )
}

export default ChatThreads
