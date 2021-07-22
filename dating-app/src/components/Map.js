import axios from "axios";
import { accessToken,Feature } from "mapbox-gl";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, Layer, Popup, Source, } from "react-map-gl";
import myContext from "./contexts/myContext";
import { errorHandler } from "./functions/Functions";
import img from "../images/default-photo.png";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
} from "react-bootstrap";
import { default as _, range } from "lodash";
import Cards from "./Cards";

function Map(props) {
  const history = useHistory();
  const { userData, accessToken } = useContext(myContext);

  const userImage = userData.imageUrl;

  const [radius, setRadius] = useState(100)


    


  const [viewport, setViewport] = useState({
    width: "100%",
    height: "500px",
    latitude: userData.lastKnownLocation.coordinates[0],
    longitude: userData.lastKnownLocation.coordinates[1],

    zoom: 13,
  });

  const [usersMarkers, setUsersMarkers] = useState([]);

  const input = useRef("");

  const goToUserPage = (id) => {
    history.push(`/user/${id}`);
  };

  const onMarkerClick = (id) => {
    alert("You clicked on marker");

    history.push(`/user/${id}`);
  };


 

  const getUsersInRadius = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_MAP + "?range=" + radius,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setUsersMarkers(res.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getUsersInRadius();
  }, []);

  const changeRange = async (range) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_MAP + "?range=" + range,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setRadius(range) //TODO CHANGE THIS FIX IT
 
      setUsersMarkers(res.data);
    } catch (error) {
      errorHandler(error);
    }
  };
  
 
  const geojson = {
    
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: 
          [
            [10,10], [-10, 10], [-10, -10],
            [10,-10], [10,10]
          ]
        
      }
  };



  return (
    <>
    
      <InputGroup className="mb-3" style={{ width: "30%" }}>
        <Button
          variant="outline-secondary"
          id="button-addon1"
          onClick={() => changeRange(input.current.value)}
        >
          Range
        </Button>
        <FormControl
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          ref={input}
        />
      </InputGroup>
     
      <ReactMapGL
     
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/fakkkkkk123/ckq6pcalq3jpd17o6c7kiwz2y"
      >

<Source
id="bull"
type='geojson'
data={geojson}
>
  <Layer
  id="nes"
  type="fill"
  source="bull"
  paint={{
    'fill-color':'#228b22',
    'fill-opacity':1,
  }}
  >

  </Layer>
</Source>

        
        <Marker
          latitude={userData.lastKnownLocation.coordinates[0]}
          longitude={userData.lastKnownLocation.coordinates[1]}
          offsetLeft={-50}
          zoom={11}
        >
          <img width="40px" src={userImage} onClick={(event) => {}} />
        </Marker>
        {usersMarkers.map((user, i) => {
          if (user._id === userData._id) return <></>;

          return (
            <Marker
              key={i}
              latitude={user.lastKnownLocation.coordinates[0]}
              longitude={user.lastKnownLocation.coordinates[1]}
              zoom={11}
              onClick={() => onMarkerClick(user._id)}
              offsetRight={-50}
            >
              <img width="40px" src={user.imageUrl} />
            </Marker>
          );
        })}
      </ReactMapGL>
      <Cards users={usersMarkers}/>
    </>
  );
}

export default Map;
