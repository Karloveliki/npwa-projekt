import KosaricaContext from "../KosaricaContext"
import { useContext } from "react"
function KosaricaDetails({frame,indeks}){
    const kosarica=useContext(KosaricaContext)
   // console.log("brisanje ind: ",indeks);
    return <div>
        <div>name: {frame.name} frameBuilder: {frame.frameBuilder.name}</div>
       <button onClick={()=>{
            console.log("brisem: ",indeks) 
            kosarica.brisanjeStavke(indeks)
        }}>brisi ovaj stavak</button>
    </div>
}
export default KosaricaDetails