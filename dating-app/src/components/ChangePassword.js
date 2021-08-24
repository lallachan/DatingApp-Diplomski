import axios from 'axios'
import React, { useContext } from 'react'
import { useRef } from 'react'
import { Button, FormControl } from 'react-bootstrap'
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
         

           
            {/* <input type="password" name="password" ref={pass1}/> */}
            <FormControl
            placeholder="Stara lozinka"
            type="password"
            name="password"
            ref={pass1}
            aria-label="Stara lozinka"
            aria-describedby="basic-addon1"
          />

            <br/>
          

            <FormControl
            placeholder="Nova lozinka"
            type="password"
            name="password2"
            ref={pass2}
            ref={pass1}
            aria-label="Nova lozinka"
            aria-describedby="basic-addon1"
          />

            <br/><br/>
            <Button variant="primary" onClick={()=>changePassword()}>Promijeni lozinku</Button>
        </div>
    )
}

export default ChangePassword
