import React from 'react'
import {format} from "timeago"

function Mesage({message,own}) {
    return (
        <>
        <p>
            {message.text}
        </p>
        <div>{format(message.createdAt)}</div> 
        {/* //format date with timeago */}
        </>
    )
}

export default Mesage
