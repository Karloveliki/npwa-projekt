
import { useContext } from "react"
import KosaricaContext from '../KosaricaContext';
import KosaricaItem from "./KosaricaItem";
function Kosarica(){
    const kosarica=useContext(KosaricaContext)
    return <div>
        
        {kosarica.sadrzaj.map((frame,ind)=><KosaricaItem frame={frame} indeks={ind}/>)}
        
    </div>
}


export default Kosarica