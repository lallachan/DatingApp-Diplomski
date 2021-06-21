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
          
        </Switch>
        </Router>
    )
}

export default Routes
