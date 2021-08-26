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

function Cards(props) {
  const { users, setViewport, setUsers } = props;

  const { userData, accessToken, userPoints, setUserPoints } =
    useContext(myContext);

 

  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShowAlert(false);
  const handleShow = () => setShowAlert(true);

  const [spinner, setSpinner] = useState(false)

  const viewProfile = (id) => {
    history.push(`/user/${id}`);
  };

  useEffect(() => {
    setSpinner(false)
  }, [userPoints])


  const ShowModal = (id) => {
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
            onClick={() => startChat(id)}
          >
            Započni razgovor
          </Button>
        </Modal.Body>
      </Modal>
    );
  };

  const startChat = async (id) => {
    //Set the user id to cookie

    console.log(id);

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

  const likeUser = async (id) => {
    try {
      const res = await axios.get(process.env.REACT_APP_LIKE_USER + `/${id}`, {
        headers: {
          authorization: accessToken,
        },
      });
      console.log(res.data);
      setUserPoints(res.data);
      const newUserPoints = { ...userPoints };
      newUserPoints.lifes = res.data.lifes;
      newUserPoints.nextHeartAt = res.data.nextHeartAt;
      setUserPoints(newUserPoints);

      //CHECK MATCH WITH USER

      try {
        const res = await axios.get(process.env.REACT_APP_MATCH + `/${id}`, {
          headers: {
            authorization: accessToken,
          },
        });
        console.log(res.data);
        setShowAlert(res.data);
        // setUserPoints(res.data)
      } catch (error) {
        errorHandler(error);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const dislikeUser = async (id) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_DISLIKE_USER + `/${id}`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(res.data);

      setUserPoints(res.data);

      const newU = users.filter((el) => {
        return el._id !== id;
      });
      setUsers(newU);
    } catch (error) {
      errorHandler(error);
    }
  };
  if(userPoints == null){
    return <Spinner/>
  }

  return (
    <div className="cards">
      <ShowModal />

      <h3 style={{ color: "white" }}>Korisnici na mapi</h3>

      {users.map((user) => {
        if (user._id == userData._id) return;

        
        return (
          <Row
            style={{ margin: "0", padding: "0", marginTop: "20px" }}
            className="card"
            onClick={() =>
              setViewport({
                width: "100%",
                height: "90vh",
                latitude: user.lastKnownLocation.coordinates[0],
                longitude: user.lastKnownLocation.coordinates[1],
                zoom: 15,
              })
            }
          >
            <br />
            <Row style={{ marginTop: "10px" }}>
              <Col lg={4}>
                <img src={user.imageUrl} width="30%" id="rounded-image" />
                <Button
                  className="user-button"
                  onClick={() => viewProfile(user._id)}
                >
                  Pogledaj Profil
                </Button>
              </Col>

              <Col lg={8}>
                <Row>
                  <Col lg={10}>
                    <h1 className="user-name">
                      {user.firstName} {user.lastName} ,{user.age},{user.gender}
                    </h1>
                  </Col>

                  <Col lg={1}>
                    <Button
                      variant="primary"
                      className="likeButton"
                      onClick={() => {likeUser(user._id)}}
                      disabled={userPoints.liked.includes(user._id)}
                    >
                    Like
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col lg={10}>
                    <h3 className="user-city">
                      {user.city},{user.zip}
                    </h3>
                  </Col>

                  <Col lg={2}>
                    <Button
                      variant="primary"
                      onClick={() => dislikeUser(user._id)}
                      className="dislikeButton"
                    >
                      Dislike
                    </Button>
                  </Col>
                </Row>

                {/* //DISTANCE 2km od tebe */}
                <p
                  style={{
                    color: "#578BB8",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {user.distance < 1
                    ? "manje od 1 km"
                    : Math.round(user.distance) + " km"}
                </p>
                <h5>O meni</h5>
                <p>
                  {_.isEmpty(user.description)
                    ? "Nema opisa"
                    : user.description}
                </p>
                <p>
                  {user.interests?.map((i) => {
                    return <li className="user-interest">{i.interest}</li>;
                  })}
                </p>
              </Col>
            </Row>
          </Row>
        );
      })}
    </div>
  );
}

export default Cards;
