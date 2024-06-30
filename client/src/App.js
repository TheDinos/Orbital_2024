import './App.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Control from "./pages/Control";
import Connect from './pages/Connect';
import Navbar from './components/Navbar';
import Intro from './pages/Intro'
import PrivateRoute from './components/PrivateRoute';


function App() {
  
  
  return (
    <Router>

    <Navbar />
      <Routes>
        <Route path = "/" element={<Intro/>}/>
        <Route path = "/Connect" element={<Connect/>}/>
        
        <Route path='/' element={<PrivateRoute/>}>  
            <Route path='/Control' element={<Control/>}/> 
        </Route>

      </Routes>
    </Router>

    
  );
}

export default App;
