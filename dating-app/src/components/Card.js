import axios from "axios";
import React, { useContext,useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import myContext from "./contexts/myContext";
import { errorHandler, resizeCloudinary } from "./functions/Functions";
import { default as _ } from "lodash";

function Card(props) {
  const { user, setViewport, users, handleShow, setModalID, setUsers  } = props;

  const history = useHistory();

  const { userData, accessToken, userPoints, setUserPoints} =
    useContext(myContext);

  const [buttonLiked, setButtonLiked] = useState(
    userPoints.liked.includes(user._id)
  );

  const viewProfile = (id) => {
    history.push(`/user/${id}`);
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

      setButtonLiked(true);
      //CHECK MATCH WITH USER

      try {
        const res = await axios.get(process.env.REACT_APP_MATCH + `/${id}`, {
          headers: {
            authorization: accessToken,
          },
        });
        console.log(res.data);
        if (res.data) {
          console.log(setModalID);
          setModalID(id);
          handleShow();
        }
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
          <img src={resizeCloudinary(user.imageUrl)} width="30%" id="rounded-image" />
          <Button className="user-button" onClick={() => viewProfile(user._id)}>
            Pogledaj Profil
          </Button>
        </Col>

        <Col lg={6}>
          <Row>
            <Col lg={10}>
              <h3 className="user-name">
                {user.firstName} {user.lastName}, {user.age}, {user.gender}
              </h3>
            </Col>

          
          </Row>

          <Row>
            <Col lg={10}>
              <h3 className="user-city">
                {user.city},{user.zip}
              </h3>
            </Col>

          
          </Row>

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
          {/* <h5>O meni</h5>
          <p>{_.isEmpty(user.description) ? "Nema opisa" : user.description}</p> */}
          <p>
            {_.isEmpty(user.interests)? "Nema interesa za prikaz" : user.interests?.map((i) => {
              return <li className="user-interest" style={{marginBottom:"10px"}}>{i.interest}</li>;
            })}
            
          </p>
        </Col>

        <Col lg={2}>
              <Button
                variant="primary"
                className="likeButton"
                onClick={() => {
                  likeUser(user._id);
                }}
                disabled={buttonLiked}
              >
                Like
              </Button>
              <br/>
              <Button
                variant="primary"
                onClick={() => dislikeUser(user._id)}
                className="dislikeButton"
              >
                Dislike
              </Button>
            </Col>

           
             
          



      </Row>
    </Row>
  );
}

export default Card;
