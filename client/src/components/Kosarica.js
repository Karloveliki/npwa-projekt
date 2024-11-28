
import { useContext } from "react"
import KosaricaContext from '../KosaricaContext';

function Kosarica(){
    const kosarica=useContext(KosaricaContext)
    return <div>
        
        {kosarica.sadrzaj.map((frame)=><p>{frame.name}</p>)}
        
    </div>
}


export default Kosarica