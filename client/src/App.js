import './App.css';
import BuilderFrameSelector from './components/BuilderFrameSelector'
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import KosaricaContext from './KosaricaContext';
import FramePage from './components/FramePage';
import KosaricaPage from './components/KosaricaPage';

function App() {
  const [frameBuilder,setFrameBuilder]=useState({})
  const [kosarica, setKosarica] = useState([])

  const pocetnaKosarica = {
    sadrzaj:kosarica,
    dodajFrame: (frame) => { setKosarica([...kosarica, frame]) },
    brisanjeSve: ()=>{setKosarica([])},
    brisanjeStavke: (ind)=>{ let cop=[...kosarica]
                              cop.splice(ind,1)
                              setKosarica(cop)
                            }

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
              <div>
                <Link to="/">Home</Link>
              </div>      
              <Routes>
                <Route path="/details/:id" element={<FramePage />} />
                <Route path="/" element={<BuilderFrameSelector/>} />
                <Route path="/shoppingCart" element={<KosaricaPage/>}/>
              </Routes>
            </Router>
          </div>
        </header>
      </KosaricaContext.Provider>
    </div>
  );
}

export default App;
