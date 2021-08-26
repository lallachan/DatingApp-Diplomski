import axios from "axios";
import { range } from "lodash";
import React, { useContext, useRef, useState } from "react";
import { Button, Col, Dropdown, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import myContext from "./contexts/myContext";
import "./Filters.css";
import { errorHandler } from "./functions/Functions";
import { default as _ } from "lodash";

import { FaSearch } from "react-icons/fa";

function Filters(props) {
  const ranges = [50, 100, 150, 200, 500];
  const { users, setMarkers } = props;
  const { userData } = useContext(myContext);

  const rangeRef = useRef(null);
  const minAgeRef = useRef(null);
  const maxAgeRef = useRef(null);

  const hobbieRef = useRef(null);
  const [mapHobbies, setMapHobbies] = useState([]);
  const [radioVal, setRadioVal] = useState(null);
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [results, setResults] = useState(null)

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
      const res = await axios.post(
        process.env.REACT_APP_FIND_SOMEONE,
        {},
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

  const filterUsers = async () => {
    const obj = {
      range: rangeRef.current.value,
    };

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
        // setRadius(range) //TODO CHANGE THIS FIX IT
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
  };
  return (
    <div className="filters">

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Najbolji rezultati za vas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
          
                    {results?.map(result=>{
                      return <Row style={{fontSize:"30px"}} className="result-card">
                      <Col
                    
                      className={

                        (result.score).toFixed(2) < 0.1 ? "red" : "green"

                      }
                      >
                      {(result.score).toFixed(2) + "%"}
                      
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
        <h5 style={{ display: "inline" }}>Godine :</h5> min{" "}
        <input type="number" min="18" ref={minAgeRef} className="input-age" />
        <input
          type="number"
          ref={maxAgeRef}
          className="input-age"
          max="100"
        />{" "}
    max
      </span>
       
       </Col>
     </Row>

     <Row>

       <Col>
       <span>
        <h5 style={{marginTop:"10px",display:"inline"}}>Spol :</h5>
        <div
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
              Ostalo
            </label>
           
        </div>
      </span>
       </Col>
     </Row>
     

   
     
      <Button id="search-someone" onClick= {()=>findMeSomeone()}>Pronađi mi nekoga danas</Button>





     </Col>

     <Col lg={6}>
     <h5>Moji interesi</h5>
      {userData.interests.map((i) => {
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
      })}
        <br/>
      <Button onClick={filterUsers} id="search-button">Pretraži</Button>
     
     </Col>
      

   
     
      
      </Row>
     
    </div>
  );
}

export default Filters;
