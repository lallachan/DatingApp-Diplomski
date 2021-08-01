import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import "./EmailValidation.css"

function EmailValidation() {

    const history = useHistory()

    return (
        <>
        <div className="emailVal">
            Poslali smo vam email na vašu E-mail adresu.
            Please validate your Email.
            <img
            width="50%"
            style={{padding:"20px"}} 
            src="https://www.kindpng.com/picc/m/285-2852276_email-id-verification-reminder-plugin-verify-email-illustration.png"/>
            <br/>
             <Button variant="light" size="lg" onClick={()=>history.push("/")}>Back to Page</Button>
        </div>
       
        </>
    )
}

export default EmailValidation
