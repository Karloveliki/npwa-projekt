import { useState , useContext} from "react";
import KosaricaContext from "../KosaricaContext";
import { Link } from "react-router-dom";

function IkonaKosarica(){
    const kosarica=useContext(KosaricaContext)
    
    return <div>
           {kosarica.izracunajKolicinu() ? 
            <div>
            <div>kolicina:{kosarica.izracunajKolicinu()}</div> 
            <p>price:{kosarica.izracunajPrice()}</p>
            <Link to={"/shoppingCart"}>KOsarica detalji</Link>
            </div>:
            <div>Kosarica je prazna</div>
        } 
            
            
    
    </div>
}
export default IkonaKosarica