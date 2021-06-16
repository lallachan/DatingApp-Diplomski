
import { useEffect, useState } from 'react';
import './App.css';
import myContext from './components/contexts/myContext';
import Routes from "./components/Routes"
import axios from "axios"
import { errorHandler } from './components/functions/Functions';

function App() {

  //TokenContext
  const [accessToken,setAccessToken] = useState()
  const [refreshToken,setRefreshToken] = useState()
  const [userData,setUserData] = useState()
  
  const {Provider} = myContext

 
  //TODO CHECK REFRESH TOKEN (if false redirect on login)
  

  useEffect(() => {
    
     //CHECK IF REFRESH TOKEN 
    console.log("New Access token",Date.now())
    setTimeout(async ()=>{
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
        setAccessToken(data.access)
      }
      catch(error){
        errorHandler(error)
        //if error 444 redirect to login page
      }
    }
      
      , 60*1000); //900000
      
   
  }, [accessToken])
  
 



  
  return (
    <div>
      <Provider value={{accessToken,setAccessToken,refreshToken,setRefreshToken,userData,setUserData}}>

      <Routes />
      </Provider>
      
    </div>
  );
}

export default App;
