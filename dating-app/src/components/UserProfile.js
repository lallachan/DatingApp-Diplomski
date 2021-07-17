import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import myContext from "./contexts/myContext";
import { errorHandler } from "./functions/Functions";
import { Spinner, Container, Button } from "react-bootstrap";
import { default as _ } from "lodash";


function UserProfile() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const { accessToken,setChatId,chatId } = useContext(myContext);
  console.log("access token "  + accessToken)
  const history = useHistory();

  const handleClick = async () => {
    //Set the user id to cookie

    localStorage.setItem("recieverId", id);

    //Create chat

    try {
      console.log("sending")
      const res = await axios.post(
        process.env.REACT_APP_CHAT_ROUTE, {recipient_id : id},
        {
          headers:{
              'authorization': accessToken
            }
      }
       
      );
      console.log("hey")
      console.log(res.data);
      setChatId(res.data.chat_id)
      console.log(chatId)
      history.push(`/chat/${chatId}`);
    } catch (err) {
      console.log(err)
      errorHandler(err);
    }
 
    
     


    //TODO FIX


 
  };

  useEffect(async () => {
    if (userData == null) {
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
        setUserData(res.data);
      } catch (error) {
        errorHandler(error);
      }
    }
  }, []);

  console.log(userData);
  return (
    <Container fluid>
      <h1>User Profile</h1>

      {_.isNull(userData) ? (
        <Spinner animation="border" role="status" />
      ) : (
        <React.Fragment>
          <h2>
            {userData.firstName} {userData.lastName}
          </h2>
          <img
            width="50%"
            src={userData.imageUrl}
          />

          <p>{userData.description}</p>
        </React.Fragment>
      )}

      <Button onClick={handleClick}>Chat Now</Button>
    </Container>
  );
}

export default UserProfile;
