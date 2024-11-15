import logo from './logo.svg';
import './App.css';
import MojZadatak from './components/MojZadatak';
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
        <p>jedandaV</p>
      </header>
    </div>
  );
}

export default App;
