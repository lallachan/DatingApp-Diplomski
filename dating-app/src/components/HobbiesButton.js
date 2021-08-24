import React from 'react'
import { Button } from 'react-bootstrap'
import {hobbieColor} from "./Files/Hobbies.json"


function HobbiesButton(props) {
    const {name,index}= props
    
    return (
        <Button className="categoryBtn" style={{backgroundColor:hobbieColor[index],border:"none",marginTop:"10px"}}>
            {name}
        </Button>
    )
}

export default HobbiesButton
