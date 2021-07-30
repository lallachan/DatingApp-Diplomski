import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import myContext from "./contexts/myContext";
import { errorHandler, getSexOr } from "./functions/Functions";
import { Spinner, Container, Button, Row } from "react-bootstrap";
import { default as _ } from "lodash";
import "./MyProfile.css";
import Gallery from "./Gallery.js";

function UserProfile() {
  const [friendData, setFriendData] = useState(null);
  const { id } = useParams();
  const { accessToken, userData } = useContext(myContext);

  const history = useHistory();

  const handleClick = async () => {
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

      history.push(`/chat/${res.data.chat_id}`);
    } catch (err) {
      errorHandler(err);
      alert("You dont have points! :(");
    }
  };

  useEffect(async () => {
    if (friendData == null) {
      try {
        const res = await axios.get(
          process.env.REACT_APP_GET_USER_DATA + `/${id}`,

          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        console.log(res.data);
        setFriendData(res.data);
      } catch (error) {
        errorHandler(error);
      }
    }
  }, []);

  return (
    <Container fluid>
      {_.isNull(friendData) ? (
        <Spinner animation="border" role="status" />
      ) : (
        <React.Fragment>
          <Row>
            <div className="profile">
              <div className="profilePhoto">
                <img src={friendData?.imageUrl} width="50%" />
                
                <br />
              </div>{" "}
              <p className="name">
                {friendData.firstName} {friendData.lastName} ,  {friendData.age} , {friendData.gender}
              </p>
              <h3>City</h3>
              <p>
                {friendData.city},{friendData.zip}
              </p>
              <p></p>
              <h3>I'm interested in</h3>
              {friendData.sexualOrientation == null ? (
                <p>Not yet filled</p>
              ) : (
                <p>{getSexOr(friendData.sexualOrientation)}</p>
              )}
              <h3>Gallery</h3>
              {friendData.gallery == "" ? (
                <p>No images in gallery</p>
              ) : (
                friendData.gallery.map((img) => {
                  return <p>{img.imageUrl}</p>;
                })
              )}
              <h3>About</h3>
              <div className="description">
                {friendData.desc == null? <p>No description added</p> : <p>{friendData.desc}</p>}
            
              </div>
              <div className="description">
                <h3>Education</h3>
                {friendData.education == null? <p>No education added</p> : <p>{friendData.education}</p>}
               
              </div>
              <div className="description">
                <h3>Job</h3>
                {friendData.job == null? <p>No job added</p> : <p>{friendData.job}</p>}
              
              </div>
              <br />
              <h3>Hobbies</h3>
              {friendData.gallery == "" ? (
                <p>No hobbies yet to show</p>
              ) : (
                friendData.interests.map((i) => {
                  return <li>{i.interest}</li>;
                })
              )}
              <Button onClick={handleClick}>Chat Now</Button>
            </div>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
}

export default UserProfile;
