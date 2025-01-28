import { useState , useContext} from "react";
import KosaricaContext from "../KosaricaContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { CiShoppingBasket } from "react-icons/ci";

function IkonaKosarica(){
    const kosarica=useContext(KosaricaContext)
    
    return <div className="w3-display-container w3-right">
           {kosarica.izracunajKolicinu() ? 
            <div className="w3-card-2 w3-padding w3-round-large w3-theme-l3 w3-light-blue">
            <div className="w3-small">
                <div >kolicina:{kosarica.izracunajKolicinu()}</div> 
                <p>price:{kosarica.izracunajPrice()}</p>
            </div>
            <Link className="w3-button w3-theme" to={"/shoppingCart"}>
            <CiShoppingBasket style={{ fontSize: '3em' }} /></Link>
            </div>:
            <div className="w3-text-gray">
                Kosarica je prazna
            </div>
        } 
            
    </div>
}
export default IkonaKosarica