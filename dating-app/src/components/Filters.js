import axios from "axios";
import { range } from "lodash";
import React, { useContext, useRef, useState } from "react";
import { Button, Col, Dropdown, FormControl, InputGroup, Row } from "react-bootstrap";
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

  const { accessToken } = useContext(myContext);

  const handleChange = (e, interst) => {
    if (e.target.checked) {
      setMapHobbies([...mapHobbies, interst.interest]);
    } else {
      setMapHobbies(mapHobbies.filter((i) => i != interst.interest));
    }
  };

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
     
     <h4 style={{color:"white"}}>Filtriraj korisnike</h4>
      <Row style={{backgroundColor:"white",margin:"0",padding:"0",height:"80%"}}>

     <Col lg={6}>
     
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

    <br/>
      <span>
        <h5 style={{display:"inline",marginTop:"10px"}}>Spol :</h5>
        <div
          class="form-check"
          style={{ marginLeft: "5px",display:"inline",paddingLeft:"30px" }}
          onChange={(e) => handleRChange(e)}
        >
          
            <inputs
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={0}
              id="flexRadioDefault1"
              onChange={(e) => handleRChange(e)}
              
              
            />
            <label class="form-check-label" for="flexRadioDefault1" >
              Muškarci
            </label>
          
        
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={1}
              id="flexRadioDefault1"
              onChange={(e) => handleRChange(e)}
              style={{marginLeft:"5px"}}
             
            />
            <label class="form-check-label" for="flexRadioDefault1" style={{marginLeft:"20px"}}>
              Žene
            </label>
         
         
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={2}
              id="flexRadioDefault1"
              onChange={(e) => handleRChange(e)}
              style={{marginLeft:"5px"}}
            />
            <label class="form-check-label" for="flexRadioDefault1" >
              Ostalo
            </label>
           
        </div>
      </span>
      <Button id="search-someone">Pronađi mi nekoga danas</Button>


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
      <Button onClick={filterUsers} id="search-button">Traži</Button>
     
     </Col>
      

   
     
      
      </Row>
     
    </div>
  );
}

export default Filters;
