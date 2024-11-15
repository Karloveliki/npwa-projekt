import Proba from "./Proba"
import Frame from "./Frame"

import {useState} from "react"


function MojZadatak({maliPatak,bonde}){
    const podatki = [
        {ime: "Imic", prezime: "prezimić", punoljetan: true},
        {ime: "koko", prezime: "kokic", punoljetan: false},
        {ime: "proba", prezime: "probic",punoljetan: false}
    ]



    const [gajba, setGajba] = useState(6)
    const [potrosenG,setPotrosenG]=useState(0)

    function naruciGajbu(){
        setGajba(6)
        setPotrosenG(potrosenG+1)
    }
    return <div>
        {1+2}jojo
        {maliPatak}
        {bonde}
        <p>U gajbi je preostalo {gajba} boca piva</p>

        {
            podatki.map(p => <p key={p.ime}>{p.ime} {p.prezime}
                {(p.punoljetan && gajba>0)? <button onClick={()=>{console.log(`${p.ime} ${p.prezime} kupuje pivo`) 
    
                    setGajba(gajba-1)
                
                }}>kupi pivo</button> : null}
               
            </p>)
            
        }
        <div> {gajba==0 ? <button onClick={()=>{naruciGajbu()}}>nova gajba</button> : null }</div>
        <div>potrosene gajbe: {potrosenG}</div>
        
        <Proba></Proba>
        <Frame></Frame>
        </div>
}

export default MojZadatak