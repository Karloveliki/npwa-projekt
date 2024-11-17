import logo from './logo.svg';
import './App.css';
import MojZadatak from './components/MojZadatak';
import DropDown from './components/DropDown';
import SelectFrameBuilder from './components/SelectFrameBuilder';
import SelectFrame from './components/SelectFrame';
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
        
      
        
        
        
        <DropDown options={[{name: "izbor1",value: 1},{name:"izbor2",value: 22}]} onSelectionChange={(value)=>{console.log("value je",value)}}></DropDown>
        <SelectFrameBuilder onSelect={(s)=>{ispisFrameBuildera(s)}}></SelectFrameBuilder>
        {frameBuilder ? <SelectFrame frameBuilderId={frameBuilder._id} onSelect={(s)=>{console.log("mjenja se na")
          console.log(s) }}></SelectFrame>: null }
      </header>
    </div>
  );
}

export default App;
