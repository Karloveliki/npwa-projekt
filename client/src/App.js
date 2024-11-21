import logo from './logo.svg';
import './App.css';
import MojZadatak from './components/MojZadatak';
import DropDown from './components/DropDown';
import SelectFrameBuilder from './components/SelectFrameBuilder';
import SelectFrame from './components/SelectFrame';
import BuilderFrameSelector from './components/BuilderFrameSelector'
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import FramePage from './components/FramePage';
function App() {
  const [frameBuilder,setFrameBuilder]=useState({})

  function ispisFrameBuildera(s){
    setFrameBuilder(s)
    console.log("mjenja se na: ",s)
  }
  return (
    <div className="App">
      <header className="App-header">        
      
      <div>
        <Router>
          <Routes>
            <Route path="/details/:id" element={<FramePage />} />
            <Route path="/" element={<BuilderFrameSelector/>} />
          </Routes>
        </Router>
      </div>
        
        
        
        
      </header>
    </div>
  );
}

export default App;
