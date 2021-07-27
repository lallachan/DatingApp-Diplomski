import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import myContext from '../contexts/myContext';
import { errorHandler } from '../functions/Functions';
import {default as _} from 'lodash'
import { Button,Spinner,Container,Col,Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import "./Chat.css"


function ChatThreads(props) {


    const {accessToken,userData} = useContext(myContext)
    const [threads, setThreads] = useState([])

    const history = useHistory()

    const {blocked} = props
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
              
          
         
            setThreads(res.data)
           

          } catch (error) {
            errorHandler(error);
          }
      
    }, [])



  

    const changeChat = (id)=>{
        history.push(`/chat/${id}`)
    }
    
  

    return (

    
        <div className="chatThreads"> 
            
            <h1>Chats</h1>
          
        {threads.map(t=>{
            return<> <Button className="thread" disabled={blocked}  onClick={()=>changeChat(t._id)}>{t.firstName}{t.lastName}<img src={t.imageUrl} width="50px"/></Button>
            <br/>
            <hr/>
            </>
        })}


        </div>
    )
}

export default ChatThreads
