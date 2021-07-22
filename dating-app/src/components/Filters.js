import React, { useContext } from 'react'
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap'
import myContext from './contexts/myContext'
import "./Filters.css"

function Filters(props) {

    const ranges = [50,100,150,200,500]
    const {users} = props
    const {userData} = useContext(myContext)
    return (
        <div className="filters">
            <h3>Filter Users</h3>
            <h5>Range</h5>
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Choose Range
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {ranges.map(r=>{
                    return  <Dropdown.Item >{r} km</Dropdown.Item>
                })}
              
            </Dropdown.Menu>
            </Dropdown>
            <h5>Age</h5>
            <input type="number"/> Min Age
            <input type="number"/> Max Age
            <h5>Sex</h5>
            
            <div class="form-check" style={{marginLeft:"5px"}}>
            <p>
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label class="form-check-label" for="flexRadioDefault1">
                Males
            </label>
            </p>
            <p>
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label class="form-check-label" for="flexRadioDefault1">
                Females
            </label>
            </p>
            <p>
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label class="form-check-label" for="flexRadioDefault1">
                Both
            </label>
            </p>
            </div>
            <h5>My Hobbies</h5>
           
            {userData.interests.map(i=>{
                return <p style={{marginLeft:"20px"}}>
                
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label class="form-check-label" for="flexCheckDefault">
                   {i.interest}
                </label>
                
                </p>
            })}

                <Button>Traži</Button>
        </div>

       
    )
}

export default Filters
