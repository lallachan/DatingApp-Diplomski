import { indexOf } from 'lodash';
import React, { useState } from 'react';

import Select from 'react-select';


export default (props) => {

   

    const {myInterests,setMapHobbies} = props
    console.log(myInterests.map(i=>i.interest))



    return (
        <Select
        isMulti
        placeholder="Odaberite interese"
        options={myInterests.map((el,i)=>({value: i,label: el.interest}))}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(x)=>setMapHobbies(x.map(el=>el.label))}
      />
    )
 

}

  
