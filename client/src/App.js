import './App.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Control from "./pages/Control";
import Connect from './pages/Connect';
import Navbar from './components/Navbar';
import Intro from './pages/Intro'
import {socket} from './socket'

function App() {
  
  
  return (
    <Router>
      <Navbar />
      <Routes>n
        <Route path = "/" element={<Intro/>}/>
        <Route path = "/Home" element={<Home/>}/>
        <Route path = "/Control" element={<Control/>}/>
        <Route path = "/Connect" element={<Connect/>}/>
      </Routes>
    </Router>

    
  );
}

export default App;
