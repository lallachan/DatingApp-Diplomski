import React, { useContext, useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import LogIn from "./LogIn";
import Register from "./Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CompleteSetup from "./CompleteSetup";
import myContext from "./contexts/myContext";
import Main from "./Main";
import { Spinner } from "react-bootstrap";
import { default as _ } from "lodash";
import UserProfile from "./UserProfile";
import Chat from "./chat/Chat";
import MyProfile from "./MyProfile";
import SendEmailForgotPass from "./SendEmailForgotPass";
import Page from "./Page";

function Routes() {
  const { accessToken, userData, socket, refreshToken } = useContext(myContext);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Page />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route exact path="/completeSetup" component={CompleteSetup} />

        <Route exact path="/forgotPassword" component={SendEmailForgotPass} />
        
        <Route exact path="/myProfile">
          {_.isNull(userData) || _.isUndefined(userData) || _.isNull(socket) ? 
            <Spinner animation="border" />
           : 
            <MyProfile />
          }
        </Route>

        {_.isNull(localStorage.getItem("refreshToken")) ? 
          <Redirect to="/" />
         : 
          <div>
          
            {_.isNull(userData) ||
            _.isUndefined(userData) ||
            _.isNull(socket) ? 

            
              <Spinner animation="border" />
             : 
              <div>
                <Route exact path="/main">
                  <Main />
                </Route>

                <Route exact path="/user/:id" component={UserProfile} />

                <Route exact path="/chat/:id">
                  <Chat />
                </Route>
              </div>
            }
          </div>
        }
      </Switch>
    </Router>
  );
}

export default Routes;
