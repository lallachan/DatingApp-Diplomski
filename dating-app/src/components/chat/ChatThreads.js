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

    
        <div style={{marginTop:"20px"}}> 
            
          
          
        {threads.map(t=>{
            return<><img src={t.imageUrl} className="myProfilePhotoThumbNail"/> <span className="thread" disabled={blocked}  className="nameUser" onClick={()=>changeChat(t._id)}>{t.firstName}  {t.lastName}</span>
          
            <hr/>
            </>
        })}
       

        </div>
    )
}

export default ChatThreads
