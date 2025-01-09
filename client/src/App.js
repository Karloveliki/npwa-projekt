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
    dodajFrame: (frame) => {
      for(let i=0;i<kosarica.length;i++){
        if(kosarica[i].frame._id==frame._id){
            const noviItem={frame,kolicina: kosarica[i].kolicina+1}
            const novaKosarica=[...kosarica]
            novaKosarica[i]=noviItem
            setKosarica(novaKosarica)
            return
        }
      } 
      setKosarica([...kosarica, { frame, kolicina:1}]) 
    },
    brisanjeSve: ()=>{setKosarica([])},
    brisanjeStavke: (ind)=>{ let cop=[...kosarica]
                              cop.splice(ind,1)
                              setKosarica(cop)
    },
    izracunajPrice: ()=>{
      let price=0
      for(let i=0;i<kosarica.length;i++){
        const item=kosarica[i]
        price+=item.frame.basePrice*item.kolicina
      }
      return price
    },
    izracunajKolicinu: ()=>{
      let kolicina=0
      for(let i=0;i<kosarica.length;i++){
        kolicina+=kosarica[i].kolicina
      }
      return kolicina
    },
    izracunKolicineTogFramea: (frameId)=>{
      let kolicina=0
      for(let i=0;i<kosarica.length;i++){
        const item=kosarica[i]
        if(item.frame._id==frameId){
          kolicina+=item.kolicina
        }
      }
      return kolicina
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
