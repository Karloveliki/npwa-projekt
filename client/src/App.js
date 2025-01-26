import './App.css';
import BuilderFrameSelector from './components/BuilderFrameSelector'
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import KosaricaContext from './KosaricaContext';
import FramePage from './components/FramePage';
import KosaricaPage from './components/KosaricaPage';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration';
import AdminPage from './components/AdminPage';
import AddFrameBuilders from './components/AddFrameBuilders';
import AdminFrameBuilder from './components/AdminFrameBuilder';
import AddFrame from './components/AddFrame';
import UserPage from './components/UserPage';
import AdminContent from './components/AdminContent';
import PublicPage from './components/PublicPage';
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

  
  return (
    <KosaricaContext.Provider value={kosaricaValue}>
      <Router>
        <Routes>
          <Route path="/admin/frameBuilders/addFrame/:id/:builderName" element={<AdminContent><AddFrame/></AdminContent>}/>
          <Route path="/admin/addBuilder" element={<AdminContent><AddFrameBuilders/></AdminContent>}/>
          <Route path="/admin/frameBuilders/:id/:name" element={<AdminContent><AdminFrameBuilder/></AdminContent>}/>
          <Route path="/admin" element={<AdminContent><AdminPage/></AdminContent>}/>
          <Route path="/register" element={<PublicPage><Registration/></PublicPage>}/>
          <Route path="/login" element={<PublicPage><LoginPage/></PublicPage>}/>
          <Route path="/details/:id" element={<UserPage><FramePage/></UserPage>} />
          <Route path="/" element={<UserPage><BuilderFrameSelector/></UserPage>} />
          <Route path="/shoppingCart" element={<UserPage><KosaricaPage/></UserPage>}/>
        </Routes>
      </Router>
    </KosaricaContext.Provider>
  );
}

export default App;
