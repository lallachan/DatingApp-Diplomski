import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Map from "./Map";
import Header from "./Header";
import axios from "axios";
import { errorHandler } from "./functions/Functions";
import myContext from "./contexts/myContext";
import { default as _ } from "lodash";
import LogoSpinner from "./spinner/LogoSpinner";

function Main() {
  const [lastKnownLocation, setLastKnownLocation] = useState(false);
  const { accessToken, userData } = useContext(myContext);

  return (
    <React.Fragment>
      <Header />

      {_.isUndefined(userData.lastKnownLocation) ? <LogoSpinner /> : <Map />}
    </React.Fragment>
  );
}

export default Main;
