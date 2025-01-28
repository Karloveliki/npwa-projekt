import { useState , useContext} from "react";
import KosaricaContext from "../KosaricaContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { CiShoppingBasket } from "react-icons/ci";

function IkonaKosarica(){
    const kosarica=useContext(KosaricaContext)
    
    return <div>
           {kosarica.izracunajKolicinu() ? 
            <div>
            <div>kolicina:{kosarica.izracunajKolicinu()}</div> 
            <p>price:{kosarica.izracunajPrice()}</p>
            <Link to={"/shoppingCart"}><CiShoppingBasket style={{ fontSize: '3em' }} /></Link>
            </div>:
            <div>Kosarica je prazna</div>
        } 
            
    </div>
}
export default IkonaKosarica