import { useState , useContext} from "react";
import KosaricaContext from "../KosaricaContext";


function IkonaKosarica(){
    const kosarica=useContext(KosaricaContext)
    
    return <div>kolicina:{kosarica.sadrzaj.length} 
            <p>price:{kosarica.sadrzaj.reduce((acc,curVal)=>{
              return  acc=acc+curVal.basePrice
            },0)}</p>
    
    </div>
}
export default IkonaKosarica