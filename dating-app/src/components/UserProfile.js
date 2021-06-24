import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import myContext from "./contexts/myContext";
import { errorHandler } from "./functions/Functions";
import { Spinner,Container,Button } from "react-bootstrap";
import { default as _ } from "lodash";


function UserProfile() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const { accessToken } = useContext(myContext);

  const history = useHistory()

  const handleClick = () => {

  //Set the user id to cookie
    
    localStorage.setItem("recieverId",id)
    history.push("/chat")

   
  }

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
         src={process.env.REACT_APP_CLOUDINARY_URL +"/" + userData.imageUrl} />

        <p>{userData.description}</p>
        </React.Fragment>
      )}

      <Button onClick={handleClick}>Chat Now</Button>
    </Container>
  );
}

export default UserProfile;
