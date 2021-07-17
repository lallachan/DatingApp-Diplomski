import React, { useContext, useEffect, useRef, useState } from "react";
import myContext from "../contexts/myContext";
import axios from "axios";
import { errorHandler } from "../functions/Functions";
import Conversation from "./Conversation";
import { Button,Spinner } from "react-bootstrap";
import { io } from "socket.io-client";
import Mesage from "./Mesage";
import { useHistory, useParams } from "react-router-dom";
import "./Chat.css"
import {default as _} from 'lodash'

function Chat() {


  const { userData,chatId,accessToken,setChatId } = useContext(myContext);
  const [chatMessages, setChatMessages] = useState([])
  const [arriveMessage, setArriveMessage] = useState(null)
  const [reciverID,setReciverID] = useState(null)
  const [socket, setSocket] = useState(null)

  const [friendData, setFriendData] = useState(null)

  const textArea = useRef();

  const {id :chat_id} = useParams()


  useEffect(() => {

 
    try {
     
       axios.get(process.env.REACT_APP_CHAT_ROUTE,{
        headers:{
          authorization:accessToken,
          chat_id:chat_id
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

  //FETCH FRIEND DATA

  useEffect(async () => {
    if(reciverID==null){
      return
    }
    if (_.isNull(friendData) || _.isUndefined(friendData)) {
      try {
   
        const res = await axios.get(
          process.env.REACT_APP_GET_USER_DATA + `/${reciverID}`,

          {
            headers: {
              authorization: accessToken,
            },
          }
        );
      
        setFriendData(res.data);
      
      } catch (error) {
        errorHandler(error);
      }
    }
  }, [reciverID]);

  

  useEffect(() => {
    if(arriveMessage!=null){
      setChatMessages([...chatMessages,arriveMessage])
    }

  }, [arriveMessage])

  useEffect(() => {
    if(socket!=null){
      console.log("adding user id=>", userData._id)
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
      const res = await axios.patch(process.env.REACT_APP_CHAT_ROUTE,{message:messageM,chat_id:chat_id},{
        headers:{
          authorization:accessToken,
          chat_id:chat_id
        }
      });
      setChatMessages([...chatMessages,{message:messageM }])
      delete textArea.current.value
    } catch (error) {
      errorHandler(error)
    }
    
    

  }

  return (
    <div className="chat">


       

        {


          chatMessages?.map((m,i)=>{
            if(i == 0 ) return
          
            return <><p key={i} className={m.senderID==userData._id || m.senderID === undefined ? "msg":"fmsg"}>
              
              {_.isUndefined(friendData) || _.isNull(friendData)? <Spinner animation="border" /> : 
              m.senderID != userData._id? <img src={friendData.imageUrl} width="20px"/> : null}
          
              {m.message}</p>
              
              
              <div className="clear"></div>
            </>
          })
        }
      
        <hr/>
        <textarea
        ref={textArea}
        className="textarea"
        >

        </textarea>
        <br></br>
        <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
}

export default Chat;
