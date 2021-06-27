
import { useEffect, useState } from 'react';
import './App.css';
import myContext from './components/contexts/myContext';
import Routes from "./components/Routes"
import axios from "axios"
import { errorHandler } from './components/functions/Functions';
import { useHistory } from 'react-router-dom';

function App() {
  
  //TokenContext
  const [accessToken,setAccessToken] = useState()
  const [refreshToken,setRefreshToken] = useState(localStorage.getItem('refreshToken'))
  const [userData,setUserData] = useState(null)
  const [chatId, setChatId] = useState(null)
  
  const {Provider} = myContext

  const history = useHistory()
 
  //TODO CHECK REFRESH TOKEN (if false redirect on login)

  useEffect(async() => {
   await getAcessToken()
 
     
  
 }, [])
  
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
  



 



  
  return (
    <div>
      <Provider value={{accessToken,setAccessToken,refreshToken,setRefreshToken,userData,setUserData,chatId,setChatId}}>

      <Routes />
      </Provider>
      
    </div>
  );
}

export default App;
