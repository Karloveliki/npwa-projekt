import KosaricaContext from "../KosaricaContext"
import { useContext } from "react"
function KosaricaDetails({item,indeks}){
    const kosarica=useContext(KosaricaContext)
   // console.log("brisanje ind: ",indeks);
    return <div>
        <div>name: {item.frame.name} frameBuilder: {item.frame.frameBuilder.name} kolicina: {item.kolicina}</div>
       <button onClick={()=>{
            console.log("brisem: ",indeks) 
            kosarica.brisanjeStavke(indeks)
        }}>brisi ovaj stavak</button>
    </div>
}
export default KosaricaDetails