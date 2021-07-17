import React, { useContext, useEffect, useRef, useState } from "react";
import myContext from "../contexts/myContext";
import axios from "axios";
import { errorHandler } from "../functions/Functions";
import Conversation from "./Conversation";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import Mesage from "./Mesage";
import { useHistory } from "react-router-dom";



function Chat() {


  const { userData,chatId,accessToken } = useContext(myContext);
  const [chatMessages, setChatMessages] = useState([])
  const [arriveMessage, setArriveMessage] = useState(null)
  const [reciverID,setReciverID] = useState(null)
  const [socket, setSocket] = useState(null)

  const textArea = useRef();


  

  useEffect(() => {

 
    try {
       axios.get(process.env.REACT_APP_CHAT_ROUTE,{
        headers:{
          authorization:accessToken,
          chat_id:chatId
        }
      }).then(res=>{
        const {user_1,user_2} = res.data;
        if(user_1 == userData._id){
          setReciverID(user_2)
        }
        else{
          setReciverID(user_1)
        }
        setChatMessages(res.data.messages)
      })
      .catch(err=>{
        errorHandler(err)
      })

     

    
 
    


      setSocket( io("ws://localhost:8900"));
 
    } catch (error) {
      errorHandler(error)
    }



  }, [])

  useEffect(() => {
    if(arriveMessage!=null){
      setChatMessages([...chatMessages,arriveMessage])
    }

  }, [arriveMessage])

  useEffect(() => {
    if(socket!=null){
      socket.emit("addUser", userData._id);
      socket.on("getUsers", (users) => { })
  
  
      socket.on('getMessage', (data)=>{
        let newMessageArray = Array.from(chatMessages)
        let messObj = {
          message:data.text,
          date:Date.now(),
          senderID: data.senderId
        }
        setArriveMessage(messObj)
      })
  
    }

  }, [socket])


  const handleSubmit = async()=>{
    
    const messageM = textArea.current.value
    socket.emit('sendMessage',{
      senderId: userData._id,
      receiverId:reciverID,
      text:messageM,
    })
    try {
      const res = await axios.patch(process.env.REACT_APP_CHAT_ROUTE,{message:messageM,chat_id:chatId},{
        headers:{
          authorization:accessToken,
          chat_id:chatId
        }
      });
      setChatMessages([...chatMessages,{message:messageM }])
      delete textArea.current.value
    } catch (error) {
      errorHandler(error)
    }
    
    

  }

  return (
    <>
        {
          chatMessages?.map(m=>{

            {
              console.log(m)
              
            }
            return <p style={{color:m.senderID==userData._id || m.senderID === undefined?"red":"blue"}}>{m.message}</p>
          })
        }

        <textarea
        ref={textArea}
        >

        </textarea>
        <br></br>
        <button onClick={handleSubmit}>Send</button>
    </>
  );
}

export default Chat;
