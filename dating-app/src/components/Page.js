import React from 'react'
import Footer from './Footer'
import LandingPage from "./LandingPage"
import LandingRegister from './LandingRegister'
import MapPage from './MapPage'
import UserReviews from './UserReviews'

function Page() {
    return (
        <React.Fragment>

        <LandingPage/>
        <LandingRegister/>
        <MapPage/>
        <UserReviews/>
        <Footer/>
            
        </React.Fragment>
    )
}

export default Page
