import axios from 'axios'
import React, { useContext } from 'react'
import { useRef } from 'react'
import { Button } from 'react-bootstrap'
import myContext from './contexts/myContext'
import { errorHandler } from './functions/Functions'

function ChangePassword() {

    const pass1 = useRef(null)
    const pass2 = useRef(null)

    const {accessToken} =useContext(myContext)

    const changePassword = async() => {
        

        try {
            const res = await axios.patch(
              process.env.REACT_APP_CHANGE_PASSWORD,
              { oldPassword: pass1.current.value,
                newPassword : pass2.current.value
                
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

          window.location.reload();
        
    }

    return (
        <div>
            <h2>Change your Password</h2>

            <label>Your old password</label><br/>
            <input type="password" name="password" ref={pass1}/>

            <br/>
            <label>Your new password</label><br/>
            <input type="password" name="password2" ref={pass2}/>

            {/* <br/>
            <label>Repeat your new password</label><br/>
            <input type="password" name="repeatpassword"/> */}

            <br/><br/>
            <Button variant="primary" onClick={()=>changePassword()}>Change Password</Button>
        </div>
    )
}

export default ChangePassword
