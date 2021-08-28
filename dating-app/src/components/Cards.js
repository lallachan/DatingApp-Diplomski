import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Modal, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Cards.css";
import myContext from "./contexts/myContext";
import { errorHandler, getSexOr } from "./functions/Functions";
import axios from "axios";
import { default as _ } from "lodash";
import { FaHeart } from "react-icons/fa";

import hearts from "../images/hearts.jpg";

import Card from "./Card.js"

import LogoSpinner from "../components/spinner/LogoSpinner"

function Cards(props) {
  const { users, setViewport, setUsers } = props;

  const { userData, accessToken, userPoints, setUserPoints } =
    useContext(myContext);

 

  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShowAlert(false);
  const handleShow = () => setShowAlert(true);


  const [modalID, setModalID] = useState(null)


  
  const ShowModal = (props) => {

    const {id} = props

    return (
      <Modal
        show={showAlert}
        onHide={handleClose}
        style={{ fontSize: "1.5rem" }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#DF314D", color: "white" }}
        >
          <Modal.Title>Čestitamo!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Uspješno ste se spojili sa korisnikom! Sada možete započeti razgovor.
          Sretno! :)
          <Button
            style={{
              backgroundColor: "#578BB8",
              border: "none",
              borderRadius: "0",
            }}
            onClick={()=>startChat(id)}
          >
            Započni razgovor
          </Button>
        </Modal.Body>
      </Modal>
    );
  };

  const startChat = async (id) => {
    //Set the user id to cookie

    

    localStorage.setItem("recieverId", id);

    //Create chat

    try {
      const res = await axios.post(
        process.env.REACT_APP_CHAT_ROUTE,
        { recipient_id: id },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );

      console.log(res.data);
      history.push(`/chat/${res.data.chat_id}`);
    } catch (err) {
      console.log(err);
      errorHandler(err);
    }
  };


  if(userPoints == null){
    return <LogoSpinner/>
  }

  return (
    <div className="cards">
      <ShowModal id={modalID} />
      

      <h3 style={{ color: "white" }}>Korisnici na mapi</h3>

      {users.map((user) => {
        if (user._id == userData._id) return;
       
        return (
          <Card user={user} setViewport={setViewport} setModalID={setModalID} handleShow={handleShow} users={users} setUsers={setUsers}/>
         
        );
      })}
    </div>
  );
}

export default Cards;
