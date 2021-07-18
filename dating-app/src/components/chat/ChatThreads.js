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
           

          } catch (error) {
            errorHandler(error);
          }
      
    }, [])



    // useEffect(async () => {
    //   if(id == undefined){
    //       try {
    //         const res = await axios.get(
    //           process.env.REACT_APP_GET_USER_DATA + `/${id}`,
    
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
    //   }
    //   }, [id]);

    const changeChat = (id)=>{
        history.push(`/chat/${id}`)
    }
    
  

    return (

    
        <div className="chatThreads"> 
            {console.log(threads)}
            <h1>Chats</h1>
          
        {threads.map(t=>{
            return<> <Button className="thread" onClick={()=>changeChat(t._id)}>{t.firstName}{t.lastName}<img src={t.imageUrl} width="50px"/></Button>
            <br/>
            <hr/>
            </>
        })}


        </div>
    )
}

export default ChatThreads
