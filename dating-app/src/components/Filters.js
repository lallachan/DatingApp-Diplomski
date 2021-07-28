import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap'
import myContext from './contexts/myContext'
import "./Filters.css"
import { errorHandler } from './functions/Functions'

function Filters(props) {

    const ranges = [50,100,150,200,500]
    const {users,setMarkers} = props
    const {userData} = useContext(myContext)

    const rangeRef = useRef(null)
    const minAgeRef = useRef(null)
    const maxAgeRef = useRef(null)
  
    const hobbieRef = useRef(null)
    const [mapHobbies, setMapHobbies] = useState([])
    const [radioVal, setRadioVal] = useState(null)

    const {accessToken} = useContext(myContext)

    const handleChange = (e,interst)=>{

        if(e.target.checked){
            setMapHobbies([...mapHobbies,interst.interest])
        }
        else{
            setMapHobbies(mapHobbies.filter(i=>i!=interst.interest))
        }
    }



    const filterUsers = async() => {
        try {
            const obj = {
                range:rangeRef.current.value,
                age:{
                    min:minAgeRef.current.value,
                    max:maxAgeRef.current.value
                },
                sex : radioVal,
                interests : mapHobbies.map(i=>{return {category:'1',interest:i}})
          }
      
            const res = await axios.post(
              process.env.REACT_APP_MAP,
              obj,
              {
               
                headers: {
                  authorization: accessToken,
                }
               
              },
            );
           
           console.log(res.data)
           setMarkers(res.data)
          } catch (error) {
            errorHandler(error);
          }    
    }


    
   const handleRChange = (e) => {
      
      
           setRadioVal(e.target.value)
     
        
    }
    return (
        <div className="filters">
            <h3>Filter Users</h3>
            <h5>Range</h5>
           
            <select
            ref={rangeRef}>
                {ranges.map(r=>{
                    return <option value={r}>{r} km</option>
                })}
            </select>
            <br/><br/>
            <h5>Age</h5>
            <input type="number" ref={minAgeRef}/> Min Age
            <input type="number" ref={maxAgeRef}/> Max Age
            <br/><br/>
            <h5>Sex</h5>
           
            <div class="form-check" style={{marginLeft:"5px"}} onChange={(e)=>handleRChange(e)}>
            <p>
            <input class="form-check-input" type="radio" name="flexRadioDefault" value={0} id="flexRadioDefault1" onChange={(e)=>handleRChange(e)}/>
            <label class="form-check-label" for="flexRadioDefault1">
                Males
            </label>
            </p>
            <p>
            <input class="form-check-input" type="radio" name="flexRadioDefault" value={1} id="flexRadioDefault1" onChange={(e)=>handleRChange(e)}/>
            <label class="form-check-label" for="flexRadioDefault1">
                Females
            </label>
            </p>
            <p>
            <input class="form-check-input" type="radio" name="flexRadioDefault" value={2} id="flexRadioDefault1" onChange={(e)=>handleRChange(e)}/>
            <label class="form-check-label" for="flexRadioDefault1">
                Both
            </label>
            </p>
            </div>
            <br/>
            <h5>My Hobbies</h5>
              
            {userData.interests.map(i=>{
                return <p style={{marginLeft:"20px"}}  
                onChange={(e)=>handleChange(e,i)}
                >
                
                <input class="form-check-input" type="checkbox" value={i.interest} id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                   {i.interest}
                </label>
                
                </p>
            })}

                <Button onClick={filterUsers}>Traži</Button>
        </div>

       
    )
}

export default Filters
