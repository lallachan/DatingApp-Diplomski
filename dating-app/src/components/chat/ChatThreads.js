import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import myContext from "../contexts/myContext";
import { errorHandler } from "../functions/Functions";
import { default as _ } from "lodash";
import { Button, Spinner, Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Chat.css";

function ChatThreads(props) {
  const { accessToken, userData, userPoints } = useContext(myContext);
  const [threads, setThreads] = useState([]);



  const history = useHistory();

  const { chat } = props;

  useEffect(async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_GET_USER_CHATS, {
        headers: {
          authorization: accessToken,
        },
      });

      setThreads(res.data);
    } catch (error) {
      errorHandler(error);
    }
  }, []);



  const changeChat = (id) => {
    history.push(`/chat/${id}`);
  };

  const checkBlockStatus = (t)=>{
    if(t.blockChat != chat.blockChat){
      let new_threads = threads.filter(el=>el._id != t._id)
      let new_t = t
      new_t.blockChat = chat.blockChat
      new_threads.push(new_t)
      setThreads([...new_threads])
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {threads.map((t) => {
      let help=t.blockChat
        if(chat._id == t._id){
          
          help = chat.blockChat
          checkBlockStatus(t)
        }

        return (
          <div className={help ? "blockedThread" : "thread"} onClick={() => changeChat(t._id)}>
            <img src={t.imageUrl} className={"myProfilePhotoThumbNail"} />{" "}
            <span className="thread" className="nameUser">
              {t.firstName} {t.lastName}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ChatThreads;
