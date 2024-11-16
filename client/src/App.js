import logo from './logo.svg';
import './App.css';
import MojZadatak from './components/MojZadatak';
import DropDown from './components/DropDown';
import SelectFrameBuilder from './components/SelectFrameBuilder';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      
        
        
        
        <DropDown options={[{name: "izbor1",value: 1},{name:"izbor2",value: 22}]} onSelectionChange={(value)=>{console.log("value je",value)}}></DropDown>
        <SelectFrameBuilder onSelect={(s)=>{console.log("mjenja se na ") 
        console.log(s)}}></SelectFrameBuilder>
        
      </header>
    </div>
  );
}

export default App;
