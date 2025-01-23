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
import Login from './components/Login';
import LoginPage from './components/LoginPage';
import IkonaKosarica from './components/IkonaKosarica';
import UserStatus from './components/UserStatus';
import Registration from './components/Registration';
import AdminPage from './components/AdminPage';
import AddFrameBuilders from './components/AddFrameBuilders';
import AdminFrameBuilder from './components/AdminFrameBuilder';
function App() {
  const [frameBuilder,setFrameBuilder]=useState({})
  const [kosarica, setKosarica] = useState({sadrzaj:[], user:null})

  const dodajFrame = (frame) => {
    console.log("dodaj frame")
    for(let i=0;i<kosarica.sadrzaj.length;i++){
      if(kosarica.sadrzaj[i].frame._id==frame._id){
          const noviItem={frame,kolicina: kosarica.sadrzaj[i].kolicina+1}
          const noviSadrzaj=[...kosarica.sadrzaj]
          noviSadrzaj[i]=noviItem
          setKosarica({...kosarica, sadrzaj:noviSadrzaj})
          console.log("u dodaj frame2", noviSadrzaj, kosarica)
          return
        }
    } 
    console.log("Za prvi", kosarica)
    const noviSadrzaj = [...kosarica.sadrzaj]
    noviSadrzaj.push({ frame, kolicina:1})
    setKosarica({...kosarica, sadrzaj: noviSadrzaj}) 
    console.log("u dodaj frame1", kosarica)
  }
 
  const brisanjeSve = () =>{setKosarica({...kosarica, sadrzaj: []} )}

  const brisanjeStavke = (ind)=>{ let noviSadrzaj=[...kosarica.sadrzaj]
    noviSadrzaj.splice(ind,1)
    setKosarica({...kosarica, sadrzaj:noviSadrzaj})
  }

  const setUser = (user) =>{setKosarica({...kosarica, user: user} )}


  const izracunajPrice = ()=>{
    let price=0
    for(let i=0;i<kosarica.sadrzaj.length;i++){
      const item=kosarica.sadrzaj[i]
      price+=item.frame.basePrice*item.kolicina
    }
    return price
  }

  const izracunajKolicinu = ()=>{
    let kolicina=0
    for(let i=0;i<kosarica.sadrzaj.length;i++){
      kolicina+=kosarica.sadrzaj[i].kolicina
    }
    return kolicina
  }

  const izracunKolicineTogFramea = (frameId)=>{
    let kolicina=0
    for(let i=0;i<kosarica.sadrzaj.length;i++){
      const item=kosarica.sadrzaj[i]
      if(item.frame._id==frameId){
        kolicina+=item.kolicina
      }
    }
    return kolicina
  }

  const kosaricaValue = {
    ...kosarica,
    dodajFrame,
    brisanjeSve,
    brisanjeStavke,
    setUser,
    izracunajPrice,
    izracunajKolicinu,
    izracunKolicineTogFramea
  }  

  console.log("inicijalna kosarica, ", kosaricaValue)
  function ispisFrameBuildera(s){
    setFrameBuilder(s)
    console.log("mjenja se na: ",s)
  }
  return (
    <div className="App">
      <KosaricaContext.Provider value={kosaricaValue}>
        <header className="App-header"> 
          <div>
            <Router>
                
              <div>
                <Link to="/">Home</Link>
              </div>
              
              <IkonaKosarica/>
              <UserStatus/>
              <Routes>
                <Route path="/admin/addBuilder" element={<AddFrameBuilders/>}/>
                <Route path="/admin/frameBuilders/:id" element={<AdminFrameBuilder/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/login" element={<LoginPage/>}/>
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
