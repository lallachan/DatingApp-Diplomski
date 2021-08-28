import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import "./EmailValidation.css"

function EmailValidation() {

    const history = useHistory()

    return (
        <>
        <div className="emailVal">
           <h1 style={{color:"#578BB8",marginBottom:"50px"}}>Poslali smo vam poruku na email adresu. </h1> 
            <img
            width="50%"
          
            src="https://www.kindpng.com/picc/m/285-2852276_email-id-verification-reminder-plugin-verify-email-illustration.png"/>
          
        </div>
       
        </>
    )
}

export default EmailValidation
