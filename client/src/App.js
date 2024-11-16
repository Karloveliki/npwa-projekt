import logo from './logo.svg';
import './App.css';
import MojZadatak from './components/MojZadatak';
import DropDown from './components/DropDown';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          first try <code>src/App.js</code> and save to reload.
        </p>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MojZadatak maliPatak="Patak007" bonde="james"></MojZadatak>
        <DropDown options={[{name: "izbor1",value: 1},{name:"izbor2",value: 22}]} onSelectionChange={(value)=>{console.log("value je",value)}}></DropDown>
        <p>jedandaV</p>
      </header>
    </div>
  );
}

export default App;
