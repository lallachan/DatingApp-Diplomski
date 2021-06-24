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
  //Fetching conversation


  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const socket = useRef(); //get socket url


  //Scroll ref
  const scrollRef = useRef();

    //Check user data
    const { userData } = useContext(myContext);
   
    console.log("user =",userData._id)

    const receiverId = localStorage.getItem("recieverId")
    

  useEffect(() => {
    //Connect to socket
    socket.current = io("ws://localhost:8900");

    //Update arrival message
    socket.current.on("getMessage", (data) => {
      setArrivalMessage([...arrivalMessage,{
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(), //create new date
      }]);
    });
  }, []);

  //Check for new arrival messages
  useEffect(() => {

  }, [arrivalMessage]);

  //Send user id to socket
  useEffect(() => {
    socket.current.emit("addUser", userData._id); //TODO ADD USER ID
    socket.current.on("getUsers", (users) => {

    });
  }, [userData]);

  console.log(socket);



//   useEffect(() => {
//     const getConversations = (async = () => {
//       try {
//         const res = await axios.get("/conversations/" + userData._id);
//         setConversations(res.data);
//       } catch (err) {
//         errorHandler(err);
//       }
//     });
//   }, [userData]); // or user id




  //Fetch messages
//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat._id);
//         setMessages(res.data);
//       } catch (err) {
//         errorHandler(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);


//   const recieverId = currentChat.members.find(
//     (member) => member !== userData._id
//   );

  
  //Send new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userData._id,
      text: newMessage,
    //   conversationId: currentChat._id,
    };
    console.log("reciver =",receiverId)
    socket.current.emit("sendMessage", {
      senderId: userData._id, //currentuser iD
      receiverId:receiverId,
      text: newMessage,
    });

    // try {
    //   const res = await axios.post("/messages", message);
    //   setMessages([...message, res.data]); //refreshing message
    //   setNewMessage("");
    // } catch (err) {
    //   errorHandler(err);
    // }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {conversations.map((c) => {
        <div onClick={() => setCurrentChat(c)}>
          {/* <Conversation conversation={c} currentUser={userData} /> */}
        </div>;
      })}
      {/* {currentChat ? ( */}
        <>
            {arrivalMessage.map(m=>{
                return <>
                
                <p>{m.text}
              
                </p></>
            })}
          <textarea
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          ></textarea>
          <Button onClick={handleSubmit}>Send</Button>
        </>
      {/* ) : (
        <span>Open a conversation to start a chat.</span> */}
      {/* )} */}
    </div>
  );
}

export default Chat;
