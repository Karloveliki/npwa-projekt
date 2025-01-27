import { Link } from "react-router-dom";
import KosaricaContext from "../KosaricaContext";
import { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";

function Registration(){
    const [registered,setRegistered]=useState(false)
    const [greska,setGreska]=useState(false)
    const navigate=useNavigate()
   async function register(ev){
        ev.preventDefault()
        const form = ev.currentTarget
        const formElements = form.elements
        const userName=formElements["uname"].value
        const password=formElements["password"].value
        const mail=formElements["mail"].value
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
              },
            body: JSON.stringify({userName,password,mail})
        };
            const response = await fetch(`http://localhost:5050/users`, requestOptions)
        if(!response.ok){
            setGreska(true)
            setRegistered(false)
        }
        if(response.ok){
            setRegistered(true)
        }
    }
    return <div >
        {registered ? navigate('/login'):
            <div className="w3-container w3-display-topmiddle w3-padding-large w3-margin-bottom" >
                <h1 className="w3-center">Registracija</h1>
                <div className="w3-card-4 w3-padding-large w3-light-gray">
                    <form className="w3-container" onSubmit={(ev)=>{register(ev)}}>
                        <label htmlFor="mail">Email</label><br/>
                        <input className="w3-input w3-border w3-margin-bottom" type="text" id="mail" name="mail"/><br/>
                        <label htmlFor="uname">Korisnicko ime:</label><br/>
                        <input className="w3-input w3-border w3-margin-bottom" type="text" id="uname" name="uname"/><br/>
                        <label htmlFor="password">Lozinka</label><br/>
                        <input className="w3-input w3-border w3-margin-bottom" type="password" id="password" name="password"/><br/>
                        <button type="submit">Registration</button>
                    </form>
                </div>
                {greska ? <div className="w3-large w3-red">Greska pri registraciji</div> : null}
            </div>
        }
       

    </div>
}
export default Registration