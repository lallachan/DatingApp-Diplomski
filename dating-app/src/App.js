
import { useEffect, useState } from 'react';
import './App.css';
import myContext from './components/contexts/myContext';
import Routes from "./components/Routes"
import axios from "axios"
import { errorHandler } from './components/functions/Functions';
import { Route, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import _ from 'lodash';
import { Spinner } from 'react-bootstrap';
import LandingPage from './components/LandingPage';

function App() {
  
  //TokenContext
  const [accessToken,setAccessToken] = useState()
  const [refreshToken,setRefreshToken] = useState(localStorage.getItem('refreshToken'))
  const [userData,setUserData] = useState(null)
  const [userPoints,setUserPoints] = useState(null)
  const [chatId, setChatId] = useState(null)
  const [socket,setSocket] = useState(null)
  const [loggedIn,setLoggedIn] = useState(false)
  
  const {Provider} = myContext

  const history = useHistory()
 
  //TODO CHECK REFRESH TOKEN (if false redirect on login)

 
  useEffect(async() => {
  if(localStorage.getItem("refreshToken") != null){
    setSocket(io("ws://localhost:8900"));
    await getAcessToken()
  }
  
 }, [loggedIn])

 
  useEffect(()=>{
    if(! _.isNull(userData) && !_.isUndefined(userData)){
      socket.emit("addUser", userData._id);
    }
  },[userData])

  
  const getUserData = async (access = accessToken)=>{
    try{
 
      const res = await axios.get(
        process.env.REACT_APP_GET_USER_DATA,
        {
          headers: {
            "authorization": access,
          }
        }
      );
      setUserData(res.data)
      
    }
    catch(error){
      errorHandler(error)
    }
  }

  const getAcessToken = async ()=>{
    
    //CHECK IF REFRESH TOKEN 
    if(refreshToken != null){
  
      try{
        const res = await axios.get(
          process.env.REACT_APP_GET_ACCESS,
          {
            headers: {
              "authorization": refreshToken,
            }
          }
        );
        const { data, message, length } = res.data;

        await setAccessToken(data)

        getUserData(data)
      
      }
      catch(error){
        errorHandler(error)
        //if error 444 call get access
        
      }
          
   }
  }

  useEffect(async () => {
     //CHECK IF REFRESH TOKEN 
     if(refreshToken != null){
      setTimeout(await getAcessToken, 60*900000); //900000
     }
  }, [accessToken])
  
  console.log(socket)
  
  return (
    <div>
      <Provider value={{accessToken,setAccessToken,refreshToken,setRefreshToken,userData,setUserData,chatId,setChatId,socket,loggedIn,setLoggedIn,
      userPoints,setUserPoints
      }}>
     
     
       <Routes/>
    
      </Provider>
      
    </div>
  );
}

export default App;
