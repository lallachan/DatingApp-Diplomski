import React, { useContext } from 'react'
import LandingPage from './LandingPage'
import LogIn from './LogIn'
import Register from './Register'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import CompleteSetup from './CompleteSetup'
import myContext from './contexts/myContext'
import Main from './Main'
import { Spinner } from 'react-bootstrap'
import {default as _} from 'lodash'
import UserProfile from './UserProfile'
import Chat from './chat/Chat'



function Routes() {


  const {accessToken,userData} = useContext(myContext)
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
          <Route exact path="/main" >
            {_.isNull(userData)?<Spinner animation="border" role="status" />:<Main/>}
            </Route>
            <Route exact path="/user/:id" component={UserProfile} />
            <Route exact path="/chat" >
            {_.isNull(userData)?<Spinner animation="border" role="status" />:<Chat/>}
            </Route>
        </Switch>
        </Router>
    )
}

export default Routes
