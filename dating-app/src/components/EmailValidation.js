import React from 'react'
import "./EmailValidation.css"

function EmailValidation() {
    return (
        <div className="emailVal">
            Poslali smo vam email na vašu E-mail adresu.
            Please validate your Email.
            <img
            width="50%"
            style={{padding:"20px"}} 
            src="https://www.kindpng.com/picc/m/285-2852276_email-id-verification-reminder-plugin-verify-email-illustration.png"/>
        </div>
    )
}

export default EmailValidation
