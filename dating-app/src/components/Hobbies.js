import React, { useContext, useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import "./MyProfile.css";
import { hobbies as hobbiesJSON } from "./Files/Hobbies.json";
import HobbiesButton from "./HobbiesButton";
import { default as _ } from "lodash";
import { errorHandler, getSexOr } from "./functions/Functions";
import myContext from "./contexts/myContext";
import axios from "axios";

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
      <div>
        {hobbies.map((hobbie,i) => {
          return <button className="hobbies" disabled={!toggle} onClick={()=>deleteHobbie(i,hobbie.category,hobbie.interest)}>{hobbie.interest}</button>;
        })}
      </div>

      <Button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Edit
      </Button>
      {toggle ? (
        <>
         <Button
                variant="success"
                onClick={()=>saveData()}
              >
                Spremi promjene
              </Button>
              <br/>
          {selectValues.length == 0 ? (
            <Alert variant="danger">No more hobbies for this category</Alert>
          ) : (
            <>
              <select ref={selectValue}>
                {selectValues.map((v) => {
                  return <option>{v}</option>;
                })}
              </select>
              <Button
                variant="primary"
                onClick={() => addHobby(selectValue.current.value)}
              >
                Add
              </Button>
             
            </>
          )}

          
        </>
      ) : null}

      {toggle ? (
        <>
          {Object.keys(hobbiesJSON).map((category, i) => {
            return (
              <div
                onClick={() => {
                  setSelect(hobbiesJSON[category], category);
                }}
              >
                <HobbiesButton name={category} index={i} />
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}

export default Hobbies;
