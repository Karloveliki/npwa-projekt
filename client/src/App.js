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

import KosaricaContext from './Kosarica';
import FramePage from './components/FramePage';


function App() {
  const [frameBuilder,setFrameBuilder]=useState({})
  const [kosarica, setKosarica] = useState([])

  const pocetnaKosarica = {
    sadrzaj:kosarica,
    dodajFrame: (frame) => { setKosarica([...kosarica, frame])}
  }
  
  function ispisFrameBuildera(s){
    setFrameBuilder(s)
    console.log("mjenja se na: ",s)
  }
  return (
    <div className="App">
      <KosaricaContext.Provider value={pocetnaKosarica}>
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
      </KosaricaContext.Provider>
    </div>
  );
}

export default App;
