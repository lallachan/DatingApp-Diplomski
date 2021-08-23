import React, { useEffect, useState } from "react";
import moment, { duration } from "moment";
import { Col, Container, Row } from "react-bootstrap";
import "./Timer.css"

function Timer(props) {

  const { date,fetchHearts } = props;

  const [timer, setTimer] = useState(0);

  function setCountdown() {

    const futureDate = moment(date);
    const today = moment();
    const clockDuration = duration(futureDate.diff(today));
    // let dana = Math.floor(clockDuration.asDays());
    // let sati = clockDuration.hours();
    let min = clockDuration.minutes();
    let sec = clockDuration.seconds();

    // if (Math.floor(clockDuration.asDays()) < 0){
    //      dana = 0;
    // }

    // if (clockDuration.hours() < 0){
    //      sati = 0;
    // }

    if (clockDuration.minutes() < 0){
         min = 0;
    }

    if (clockDuration.seconds() < 0){
         sec = 0;
    }

    setTimer({
      // dana: dana,
      // sati: sati,
      min: min,
      sec: sec,
    });
    
    if(clockDuration.seconds()<0){
      fetchHearts()
    }
  }

  useEffect(() => {
    setCountdown();
    const interval = setInterval(() => {
      setCountdown();
    

    }, 1000);


   


    return () => clearInterval(interval);
  }, [date]);



  useEffect(()=>{
  
    if(Date.now()>=new Date(date)){
      fetchHearts()
    
    }
  },[]) //TIMER

 
        return(
            <Container>
                
               
            
                {Object.keys(timer).map((key, i) => (
                    <span className="timer" >
                        <span className="key">
                            {timer[key]}
                        </span>
                        <span>
                            {key.toLowerCase()}
                        </span>
                    </span>

                    
                ))}
            
     
            </Container>
        )
    }


export default Timer;