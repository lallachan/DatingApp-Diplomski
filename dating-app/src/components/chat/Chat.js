import React, { useContext, useEffect, useRef, useState } from "react";
import myContext from "../contexts/myContext";
import axios from "axios";
import { errorHandler, getParsedDate, resizeCloudinary } from "../functions/Functions";
import Conversation from "./Conversation";
import {
  Button,
  Spinner,
  Container,
  Col,
  Row,
  Alert,
  FormControl,
} from "react-bootstrap";
import { io } from "socket.io-client";
import Mesage from "./Mesage";
import { useHistory, useParams } from "react-router-dom";
import "./Chat.css";
import { default as _ } from "lodash";
import ChatThreads from "./ChatThreads";
import pattern from "../../images/pattern.jpg";
import Header from "../Header.js";
import { FaCamera } from "react-icons/fa";

import LogoSpinner from "../spinner/LogoSpinner";

function Chat() {
  const {
    userData,
    chatId,
    accessToken,
    socket,
    setChatId,
    setUserPoints,
    userPoints,
  } = useContext(myContext);
  const [chatMessages, setChatMessages] = useState([]);
  const [arriveMessage, setArriveMessage] = useState(null);
  const [reciverID, setReciverID] = useState(null);

  const [oldReciverID, setOldReciverID] = useState(reciverID);
  const [blocked, setBlocked] = useState(false);
  const [userWhoBlocked, setUserWhoBlocked] = useState(null);

  const [friendData, setFriendData] = useState(null);
  const [image, setImage] = useState(null);

  const [showOnlyThreads, setShowOnlyThreads] = useState(false);

  ///WIDGET

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dbfwwnhat",
      uploadPreset: "jydos0sa",
      folder: "users",
      //  cropping:true,
      name: "hey",
    },
    (error, result) => {
      if (result.event == "queues-end") {
        setImage(result.info.files[0].uploadInfo.secure_url); //path for backend

        sendImage(result.info.files[0].uploadInfo.secure_url);
      }
    }
  );

  function showWidget() {
    widget.open();
  }

  const uploadImage = () => {
    showWidget();
  };

  const textArea = useRef();

  const { id: chat_id } = useParams();

  //GET CHAT

  useEffect(() => {
    console.log(chat_id);
    try {
      axios
        .get(process.env.REACT_APP_CHAT_ROUTE, {
          headers: {
            authorization: accessToken,
            chat_id: chat_id,
          },
        })
        .then((res) => {
          const { user_1, user_2 } = res.data;

          if (user_1 == userData._id) {
            setReciverID(user_2);
          } else {
            setReciverID(user_1);
          }
          setChatMessages(res.data.messages);
          console.log(res.data);
          setBlocked(res.data);
          setShowOnlyThreads(false);
        })
        .catch((err) => {
          errorHandler(err);
          setShowOnlyThreads(true);
          console.log("Hey");
        });
    } catch (error) {
      errorHandler(error);
      setShowOnlyThreads(true);
    }
  }, [chat_id]);

  //FETCH FRIEND DATA

  useEffect(async () => {
    if (reciverID == null) {
      return;
    }

    if (
      _.isNull(friendData) ||
      _.isUndefined(friendData) ||
      reciverID != oldReciverID
    ) {
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
        setOldReciverID(reciverID);
      } catch (error) {
        errorHandler(error);
      }
    }
  }, [reciverID]);

  useEffect(() => {
    if (arriveMessage != null) {
      setChatMessages([...chatMessages, arriveMessage]);
    }
  }, [arriveMessage]);

  useEffect(() => {
    if (socket != null) {
      socket.on("getUsers", (users) => {});

      socket.on("getMessage", (data) => {
        let newMessageArray = Array.from(chatMessages);
        let messObj = {
          message: data.text,
          date: Date.now(),
          senderID: data.senderId,
          imageUrl: data.imageUrl,
        };
        setArriveMessage(messObj);
      });
    }
  }, [socket]);

  //BLOCK CHAT

  const rejectUser = async (chat_id,block) => {
    try {

      const res = await axios.patch(
        process.env.REACT_APP_BLOCK_CHAT,
        { chat_id: chat_id, block: !block },

        {
          headers: {
            authorization: accessToken,
          },
        }
      );

      setBlocked(res.data);
      setUserWhoBlocked(res.data.userWhoBlocked);


      // LOSE POINTS

     
        const res2 = await axios.get(process.env.REACT_APP_GET_USER_POINTS, {
          headers: {
            authorization: accessToken,
          },
        });
        console.log(res2.data);
        setUserPoints(res2.data)
  
      
    } catch (error) {
      const err = errorHandler(error);
      alert(err)
      window.location.reload();
    }


    


  };


  const sendImage = async (imgUrl) => {
    socket.emit("sendMessage", {
      senderId: userData._id,
      receiverId: reciverID,
      text: "m",
      chatId: chat_id,
      imageUrl: imgUrl,
    });
    try {
      const res = await axios.patch(
        process.env.REACT_APP_CHAT_ROUTE,
        { message: "m", imageUrl: imgUrl, chat_id: chat_id },
        {
          headers: {
            authorization: accessToken,
            chat_id: chat_id,
          },
        }
      );
      setChatMessages([...chatMessages, { message: "m", imageUrl: imgUrl }]);
      delete textArea.current.value;

      //OVO NETREBA JER VE?? RADIM SENDMESSAGE
      // socket.emit('sendNotification',{
      //   senderId: userData._id,
      //   receiverId: reciverID,
      //   text: "You got a new message from "+friendData.firstName+ " "+friendData.lastName,
      // })
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleSubmit = async () => {
    const messageM = textArea.current.value;
    socket.emit("sendMessage", {
      senderId: userData._id,
      receiverId: reciverID,
      text: messageM,
      chatId: chat_id,
    });
    console.log({
      senderId: userData._id,
      receiverId: reciverID,
      text: messageM,
      chatId: chat_id,
    });
    try {
      const res = await axios.patch(
        process.env.REACT_APP_CHAT_ROUTE,
        { message: messageM, chat_id: chat_id },
        {
          headers: {
            authorization: accessToken,
            chat_id: chat_id,
          },
        }
      );

      setChatMessages([...chatMessages, { message: messageM }]);
      delete textArea.current.value;
      const newMessages = res.data.chat_notifications;
      const newMessages2 = res.data.chat_notifications;
      console.log(newMessages, newMessages2)
      // setUserPoints(newMessages, newMessages2);
    } catch (error) {
      errorHandler(error);
    }
  };

  if (_.isNull(userData) || _.isUndefined(userData)) return <LogoSpinner />;

  // if (_.isNull(friendData) || _.isUndefined(friendData)) return <Spinner />;
  return (
    <Container
      fluid
      style={{
        background: `url(${pattern})`,
        backgroundRepeat: "repeat-x",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Row>
        <Header />
      </Row>

      <Row>
        <Col lg={4} md={12} sm={10} className="conversations">
          <h2 className="conversation-title">Razgovori</h2>

          <ChatThreads chat={blocked} />
        </Col>
        {showOnlyThreads ? null : (
            <Col
              lg={7}
              md={7}
              sm={10}
              style={{ position: "relative" }}
            >
              <Row className="chatBox">
               
                <Row>
                  <Col
                    className="conversation-title"
                    style={{ fontSize: "1rem" }}
                  >
                    {friendData === null ? null : (
                      <h2 className="headline">
                        {friendData.firstName} {friendData.lastName}
                      </h2>
                    )}
                  </Col>
              
              {userWhoBlocked == userData._id?
                  <Col>
                    {blocked.blockChat ? (
                      <Button
                        id="blockButton"
                        onClick={() => rejectUser(chat_id,blocked.blockChat)}
                      
                      >
                        Odblokiraj
                      </Button>
                    ) : (
                      <Button
                        id="blockButton"
                        onClick={() => rejectUser(chat_id,blocked.blockChat)}
                       
                      >
                        Blokiraj
                      </Button>
                    )}
                  </Col>:null}
                </Row>

                <Row>
                  <Col>
                    {chatMessages?.map((m, i) => {
                      if (i == 0) return;

                      return (
                        <>
                          <Row key={i} style={{alignItems:"center",marginBottom:"20px"}}>
                            {_.isUndefined(friendData) ||
                            _.isNull(friendData) ? (
                              <LogoSpinner />
                            ) : m.senderID != userData._id &&
                              m.senderID != undefined ? (
                              
                                <Col lg={1}>
                                  <img
                                    src={resizeCloudinary(friendData.imageUrl)}
                                    className="userPhotoImage"
                                  />
                                </Col>
                              
                            ) : null}

                            <Col style={{ float: "right", display: "inline" }}>
                              {m.imageUrl != undefined ? (
                                <img
                                  src={resizeCloudinary(m.imageUrl)}
                                  className={
                                    m.senderID === userData._id
                                      ? "myImage"
                                      : "friendImage"
                                  }
                                />
                              ) : (
                                <span
                                  className={
                                    m.senderID == userData._id ||
                                    m.senderID === undefined
                                      ? "msg"
                                      : "fmsg"
                                  }
                                >
                                  {m.message}
                                  <span className="timeMessageFriend">
                                  {getParsedDate(m.date)}
                                  </span>
                                </span>
                              )}
                            </Col>
                            <div style={{ clear: "both" }}></div>
                          </Row>

                          <div className="clear"></div>
                        </>
                      );
                    })}
                  </Col>
                  
                  <Row>
                    <Col>
                      {blocked.blockChat == true ? (
                        <Alert
                          variant="danger"
                          style={{
                            backgroundColor: "#DF314D",
                            color: "white",
                            marignTop: "80px",
                            width: "30%",
                            borderRadius: "50px",
                          }}
                        >
                          {userWhoBlocked !== userData._id
                            ? friendData.firstName + friendData.lastName + " " : userData.firstName + " " + userData.lastName + " "
                            }
                          je blokirala razgovor
                        </Alert>
                      ) : null}
                    </Col>
                  </Row>
                </Row>

              </Row>

              
              <Row
                  style={{ backgroundColor: "#578BB8"}}
                  className="chatFooter"
                >
                  <Col lg={2}>
                    <Button className="uploadPhotoButton" onClick={showWidget}>
                      <FaCamera />
                    </Button>
                  </Col>

                  <Col lg={10}>
                    <FormControl
                      ref={textArea}
                      className="messageBox"
                      aria-describedby="basic-addon2"
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={blocked.blockChat}
                      className="sendButton"
                    >
                      Send
                    </Button>
                  </Col>
                </Row>

            </Col>
        )}
      </Row>

      {/* <Col lg={3}>
          <ChatThreads blocked={blocked} />
        </Col>
        <Col lg={6} className="chat">
          {friendData === null ? null : (
            <h1 className="headline">
              Chat sa {friendData.firstName}
              {friendData.lastName}
            </h1>
          )}
          <Button variant="danger" onClick={() => rejectUser(chat_id)}>
            Im not interested
          </Button>
          {chatMessages?.map((m, i) => {
            if (i == 0) return;

            return (
              <>
                <p
                  key={i}
                  className={
                    m.senderID == userData._id || m.senderID === undefined
                      ? "msg"
                      : "fmsg"
                  }
                >
                  {_.isUndefined(friendData) || _.isNull(friendData) ? (
                    <Spinner animation="border" />
                  ) : m.senderID != userData._id && m.senderID != undefined ? (
                    <img src={friendData.imageUrl} width="20px" />
                  ) : null}

               
                  
                
                  {m.imageUrl != undefined ? <img src={m.imageUrl}  style={{borderRadius:"0px",width:"100%",marginRight:"300px"}}/>  : m.message}
                 
                 
                  
                  
                </p>

                <div className="clear"></div>

               
              </>
            );
          })}

          {blocked == true ? (
            <Alert variant="danger">
              {userWhoBlocked == userData._id
                ? userData.firstName + userData.lastName + " "
                : friendData.firstName + friendData.lastName + " "}
              has blocked the chat
            </Alert>
          ) : null}

          <hr />
          <textarea ref={textArea} className="textarea">

          </textarea>

          <Button
            variant="secondary"
            style={{
              backgroundColor: "lightgrey",
              marginRight: "10px",
              border: "none",
            }}
            onClick={showWidget}
          >
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png"
              width="30px"
            />
          </Button>
          <Button onClick={handleSubmit} disabled={blocked}>
            Send
          </Button>
        </Col>
        <Col lg={1}></Col>
      </Row> */}
    </Container>
  );
}

export default Chat;
