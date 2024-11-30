import { useState , useContext} from "react";
import KosaricaContext from "../KosaricaContext";
import { Link } from "react-router-dom";

function IkonaKosarica(){
    const kosarica=useContext(KosaricaContext)
    
    return <div>kolicina:{kosarica.sadrzaj.length} 
            <p>price:{kosarica.sadrzaj.reduce((acc,curVal)=>{
              return  acc=acc+curVal.basePrice
            },0)}</p>
            <Link to={"/shoppingCart"}>Kosarica detalji</Link>
    
    </div>
}
export default IkonaKosarica