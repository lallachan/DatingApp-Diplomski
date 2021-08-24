import React, { useContext, useRef, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import "./MyProfile.css";
import { hobbies as hobbiesJSON } from "./Files/Hobbies.json";
import HobbiesButton from "./HobbiesButton";
import { default as _ } from "lodash";
import { errorHandler, getSexOr } from "./functions/Functions";
import myContext from "./contexts/myContext";
import axios from "axios";

import "./MyProfile.css"

function Hobbies(props) {
  const { hobbies: old } = props;

  const {accessToken} = useContext(myContext)

  const [hobbies, setHobbies] = useState(
    old.map((i) => {
      return { category: i.category, interest: i.interest };
    })
  );

  const [toggle, setToggle] = useState(false);

  const [selectValues, setSelectValues] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const selectValue = useRef(null);

  const setSelect = (values, category) => {
    let arr = [];
    setActiveCategory(category);
    values.forEach((element) => {
      let isIn = false;
      hobbies.forEach((el) => {
        if (el.interest == element) {
          isIn = true;
        }
      });
      if (!isIn) {
        arr.push(element);
      }
    });
    console.log(arr);
    setSelectValues(arr);
  };

  const addHobby = (value) => {
    setHobbies([...hobbies, { category: activeCategory, interest: value }]);
    setSelectValues([...selectValues.filter((i) => i != value)]);
  };

  const deleteHobbie = (indx,category,value) => {
    setHobbies(hobbies.filter((el,i)=>i != indx))
    if(activeCategory==category){
        setSelectValues([...selectValues,value])
    }
     
  }

  const saveData = async() => {
    try {
        console.log({ interests: hobbies });
        const res = await axios.patch(
          process.env.REACT_APP_GET_USER_DATA,
          {
            interests: hobbies.map((i) => {
              return {
                category: i.category,
                interest: i.interest,
              };
            }),
          },
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        console.log(res.data);
        setHobbies(res.data.data.interests);
        window.location.reload();
      } catch (error) {
        errorHandler(error);
      }
}


  return (
    <>
      <Row>
        <Col lg={12} style={{marginLeft:"-20px"}}>
        {hobbies.map((hobbie,i) => {
          return <button className="myHobbies" onClick={()=>deleteHobbie(i,hobbie.category,hobbie.interest)}>{hobbie.interest}</button>;
        })}

        </Col>
       
      </Row>


        <>
         <Button
                variant="success"
                onClick={()=>saveData()}
              >
                Spremi promjene
              </Button>
         
          {selectValues.length == 0 ? (
            <Alert variant="danger" >Nema više interesa za ovu kategoriju</Alert>
          ) : (
            <>
              <select ref={selectValue} className="select-categories">
                {selectValues.map((v) => {
                  return <option>{v}</option>;
                })}
              </select>
              <Button
                variant="primary"
                onClick={() => addHobby(selectValue.current.value)}
                style={{backgroundColor:"#578BB8",border:"none",borderRadius:"0",padding:"10px",width:"20%"}}
              >
                Add
              </Button>
             
            </>
          )}

          
        </>
     

     
       
        <Row>
          
          {Object.keys(hobbiesJSON).map((category, i) => {
            return (
              <Col

                onClick={() => {
                  setSelect(hobbiesJSON[category], category);
                }}
              >
                <HobbiesButton name={category} index={i} />
              </Col>
            );
          })}

         
        </Row>
         
        </>
  
   
  );
}

export default Hobbies;
