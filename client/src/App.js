import logo from './logo.svg';
import './App.css';
import MojZadatak from './components/MojZadatak';
import DropDown from './components/DropDown';
import SelectFrameBuilder from './components/SelectFrameBuilder';
import SelectFrame from './components/SelectFrame';
import BuilderFrameSelector from './components/BuilderFrameSelector'
import { useState } from 'react';
function App() {
  const [frameBuilder,setFrameBuilder]=useState({})

  function ispisFrameBuildera(s){
    setFrameBuilder(s)
    console.log("mjenja se na: ",s)
  }
  return (
    <div className="App">
      <header className="App-header">
        
      
        
        
        
        <BuilderFrameSelector/>
        
      </header>
    </div>
  );
}

export default App;
