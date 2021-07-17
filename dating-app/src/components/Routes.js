import React, { useContext, useEffect, useState } from 'react'
import LandingPage from './LandingPage'
import LogIn from './LogIn'
import Register from './Register'
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import CompleteSetup from './CompleteSetup'
import myContext from './contexts/myContext'
import Main from './Main'
import { Spinner } from 'react-bootstrap'
import {default as _} from 'lodash'
import UserProfile from './UserProfile'
import Chat from './chat/Chat'
import MyProfile from './MyProfile'



function Routes() {


  const {accessToken,userData,chatId,refreshToken} = useContext(myContext)


  useEffect(() => {
    console.log(chatId)
  }, [chatId])
    return (
        <Router>
            <Switch>
          <Route exact path="/">
           <LandingPage />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        
         
          <Route exact path="/completeSetup" component={CompleteSetup} />

          <Route exact path="/myProfile">
          {_.isNull(userData) || _.isUndefined(userData)? <Spinner animation="border" />:<MyProfile/>}
          </Route>


          <Route exact path="/main" >
            {_.isNull(localStorage.getItem("refreshToken"))? <Redirect to="/"/> :
            _.isNull(userData) || _.isUndefined(userData)? <Spinner animation="border" />:<Main/>}
            </Route>


            <Route exact path="/user/:id" component={UserProfile} />


                  


            <Route exact path="/chat/:id" >
            {_.isNull(chatId) || _.isNull(userData) || _.isUndefined(accessToken)? <Redirect to="/login" />:<Chat/>}
            </Route>



        </Switch>
        </Router>
    )
}

export default Routes
