import { Container } from 'react-bootstrap';
import './App.css';
import LogIn from './components/LogIn';
import Register from './components/Register'
import LandingPage from './components/LandingPage'
function App() {
  return (
    <div style={{margin:"0",padding:"0",width:"100%",height:"100%"}}>
      
      <LandingPage />
      {/* <LogIn/>
      <Register/> */}


    </div>
  );
}

export default App;
