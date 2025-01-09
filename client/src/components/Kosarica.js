
import { useContext } from "react"
import KosaricaContext from '../KosaricaContext';
import KosaricaItem from "./KosaricaItem";
function Kosarica(){
    const kosarica=useContext(KosaricaContext)
    return <div>
        
        {kosarica.sadrzaj.map((item,ind)=><KosaricaItem key={ind} item={item} indeks={ind}/>)}
        {kosarica.sadrzaj.length!=0 ? <button onClick={kosarica.brisanjeSve}>obrisi cijelu kosaricu</button>: null}
    </div>
}


export default Kosarica