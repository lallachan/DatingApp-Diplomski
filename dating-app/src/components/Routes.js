import React from 'react'
import LandingPage from './LandingPage'
import LogIn from './LogIn'
import Register from './Register'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
function Routes() {
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
        </Switch>
        </Router>
    )
}

export default Routes
