import axios from "axios";
import { range } from "lodash";
import React, { useContext, useRef, useState } from "react";
import { Button, Col, Dropdown,DropdownButton, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import myContext from "./contexts/myContext";
import "./Filters.css";
import { errorHandler } from "./functions/Functions";
import { default as _ } from "lodash";
import Select from 'react-select';
import { FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import MySelect from "./MySelect";

function Filters(props) {
  const ranges = [50, 100, 150, 200, 500];
  const { users, setMarkers } = props;
  const { userData } = useContext(myContext);

  const rangeRef = useRef(null);
  const minAgeRef = useRef(null);
  const maxAgeRef = useRef(null);

  const hobbieRef = useRef(null);
  const [mapHobbies, setMapHobbies] = useState([]);
  const [radioVal, setRadioVal] = useState(0);
  const [show, setShow] = useState(false);
  
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [results, setResults] = useState(null)

  const sexes = [
    "Muškarci",
    "Žene",
    "NonBinary"
  ]

  const { accessToken } = useContext(myContext);

  const handleChange = (e, interst) => {
    if (e.target.checked) {
      setMapHobbies([...mapHobbies, interst.interest]);
    } else {
      setMapHobbies(mapHobbies.filter((i) => i != interst.interest));
    }
  };

  const findMeSomeone = async() => {

   

    try {
      const res = await axios.get(
        process.env.REACT_APP_FIND_SOMEONE,
     
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      
      console.log(res.data);
      setResults(res.data)
      setShow(true)
      
    } catch (error) {
      errorHandler(error);
    }


  }

  const viewProfile = (id) => {
    history.push(`/user/${id}`);
  };

  const filterUsers = async () => {
    const obj = {
      range: rangeRef.current.value,
    };

    console.log(radioVal)
    if (!_.isNull(radioVal)) {
      obj["sex"] = radioVal;
    }

    if (!_.isEmpty(mapHobbies)) {
      obj["interests"] = mapHobbies.map((i) => {
        return { category: "1", interest: i };
      });
    }

    if (!minAgeRef.current.value == "" && !maxAgeRef.current.value == "") {
      console.log(minAgeRef.current.value);
      obj["age"] = {
        min: minAgeRef.current.value,
        max: maxAgeRef.current.value,
      };
    }
    
    console.log("OBJJJJ");
    console.log(obj);

    if (Object.keys(obj).length == 1 && Object.keys(obj)[0] == "range") {
      console.log("hej range");

      try {
        const res = await axios.get(
          process.env.REACT_APP_MAP + "?range=" + obj.range,
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
      
        console.log(res.data);
        setMarkers(res.data);
      } catch (error) {
        errorHandler(error);
      }
    } else {
      try {
        const res = await axios.post(process.env.REACT_APP_MAP, obj, {
          headers: {
            authorization: accessToken,
          },
        });

        console.log(res.data);
        setMarkers(res.data);
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  const handleRChange = (e) => {
    setRadioVal(e.target.value);
    console.log(e.target.value)
  };
  return (
    <div className="filters">

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Najbolji rezultati za vas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
          
                    {results?.map(result=>{
                      console.log(result._id)
                      return <Row style={{fontSize:"30px"}} className="result-card" onClick={()=>history.push(`/user/${result._id}`)}>
                      <Col
                    
                      className={

                        (result.score).toFixed(2) < 0.1 ? "red" : "green"

                      }
                      >
                       {console.log(result.score.toFixed(2))}
                      {(result.score*100).toFixed(2) + "%"}
                      
                      </Col>
                      <Col><h5>{result.firstName}  {result.lastName}</h5>
                      <h5>{result.city} {result.zip}</h5>
                      <h5>{result.age}</h5>
                      </Col>
                      <Col><img src={result.imageUrl} id="rounded-image-results" style={{marginTop:"10px"}}/>
                    </Col>
                      </Row>
                    })}

                 
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Zatvori
              </Button>
            
            </Modal.Footer>
          </Modal>
     
     <h4 style={{color:"white"}}>Filtriraj korisnike</h4>
      <Row style={{backgroundColor:"white",margin:"0",padding:"5px",height:"80%"}}>

     <Col lg={6}>
     
     <Row>
       <Col>
       <span>
        
        <h5 style={{ display: "inline" }}>Radijus :</h5>{" "}
        <select
          ref={rangeRef}
          style={{ display: "inline" }}
          className="radius-select"
        >
          {ranges.map((r) => {
            return <option value={r}>{r} km</option>;
          })}
        </select>
      </span>
      <br />
      <br />
      <span style={{ marginTop: "10px" }}>
        <h5>Godine:</h5>
      <div className="age-range">
          <h5>min - max</h5>
          <div>
              <input type="number" name="min" id="min" min="18" ref={minAgeRef}/>
              <input type="number" name="max" id="max"  max="100"  ref={maxAgeRef}/>
          </div>
      </div>


          
      

        {/* <label htmlFor="minAge">Min</label>
        <input type="number" name="minAge" min="18" ref={minAgeRef} className="input-age" />
        <input
          type="number"
          ref={maxAgeRef}
          className="input-age"
          max="100"
        />{" "} */}
    
      </span>
       
       </Col>
     </Row>


<br/>
     <Row>

       <Col>
       <span>
        
        <h5 style={{marginTop:"20px",display:"inline"}}>Spol :</h5>
        <select style={{padding:"5px",marginLeft:"20px",marginTop:"10px"}} onChange={(e)=>{setRadioVal(e.target.value)}}>
          <option value="0">Muškarci</option>
          <option value="1">Žene</option>
          <option value="2">Ne binarno</option>
        </select>
        
        {/* <Select
        style={{display:"inline"}}
        placeholder="Odaberite spol"
        options={sexes.map((s,i)=>({value: i,label:s}))}
        
        classNamePrefix="select"
        onChange={(x)=>setRadioVal(x.map(el=>el.value))}
      /> */}

        {/* <div
          class="form-check"
          id="radioGroup"
          style={{ marginLeft: "5px",display:"inline"}}
          onChange={(e) => handleRChange(e)}
        >
          
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={0}
              id="flexRadioDefault1"
              onChange={(e) => handleRChange(e)}
              
              
            />
            <label class="form-check-label" for="flexRadioDefault1" >
              M
            </label>
          
        
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={1}
              id="flexRadioDefault1"
              
              onChange={(e) => handleRChange(e)}
              
             
            />
            <label class="form-check-label" for="flexRadioDefault1" >
              Ž
            </label>
         
         
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={2}
              id="flexRadioDefault1"
              onChange={(e) => handleRChange(e)}
             
            />
            <label class="form-check-label" for="flexRadioDefault1" >
              
            </label>
           
        </div> */}
      </span>
       </Col>
     </Row>
     

   
     
    





     </Col>

     <Col lg={6}>
     <h5>Moji interesi</h5>
     <MySelect myInterests={userData.interests} setMapHobbies={setMapHobbies}/>
      {/* {userData.interests.map((i) => {
        return (
          <span
            style={{marginLeft:"20px",paddingLeft:"5px"}}
            onChange={(e) => handleChange(e, i)}
          >
            <input
              class="form-check-input"
              type="checkbox"
              value={i.interest}
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              {i.interest}
            </label>
          </span>
          
        );
      })} */}
        <br/>
        <Button id="search-someone"  onClick= {()=>findMeSomeone()} style={{float:"right"}}>Pronađi mi nekoga danas</Button><br/>
      <Button onClick={filterUsers} id="search-button">Pretraži</Button>
      <div style={{clear:"both"}}></div>
    
      
      
     </Col>
      

   
     
      
      </Row>
     
    </div>
  );
}

export default Filters;
