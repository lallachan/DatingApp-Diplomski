import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { Alert, Button, FormControl, InputGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import myContext from './contexts/myContext';
import { errorHandler } from './functions/Functions';

function SendEmailForgotPass() {

    const email = useRef(null)
    const {accessToken} = useContext(myContext)

    const history = useHistory()

    const sendToEmail = async(value) => {
        console.log(value)
        
        try {
           
                  const res = await axios.post(
                    process.env.REACT_APP_FORGOT_PASSWORD ,
                    {
                      email:value
                    },
                    {
                      headers: {
                        authorization: accessToken,
                      },
                    }
                  );
                  console.log(res.data);
                  
                
                } catch (error) {
                  errorHandler(error);
                }


                history.push("/")
                
    }

    return (

       
        <div style={{width:"50%",margin:"150px auto"}}>
            <h2>Enter your Email</h2>

            {/* <input type="email" name="email" placeholder="Enter your Email" className="mb-3" ref={email}/> */}
          
            <InputGroup className="mb-3">
            <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            type="email"
            name="email"
            ref={email}
        />
             <Button variant="outline-secondary" id="button-addon2" onClick={()=>sendToEmail(email.current.value)}>
            Send
            </Button>

        </InputGroup>

        </div>
    )
}

export default SendEmailForgotPass
