import { Link } from "react-router-dom";
import KosaricaContext from "../KosaricaContext";
import { useState , useContext} from "react";


function Registration(){
    const [registered,setRegistered]=useState(false)
    const [greska,setGreska]=useState(false)
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
        }
        if(response){
            setRegistered(true)
        }
    }
    return <div >
        <h1>Registracija</h1>
        {registered ? <Link to="/login">Login</Link>:
        <form onSubmit={(ev)=>{register(ev)}}>
            <label htmlFor="mail">Email</label><br/>
            <input type="text" id="mail" name="mail"/><br/>
            <label htmlFor="uname">Korisnicko ime:</label><br/>
            <input type="text" id="uname" name="uname"/><br/>
            <label htmlFor="password">Lozinka</label><br/>
            <input type="password" id="password" name="password"/><br/>
            <button type="submit">Registration</button>
        </form> }
        {greska ? <div>Greska pri registraciji</div> : null}

    </div>
}
export default Registration