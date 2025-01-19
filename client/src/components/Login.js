import KosaricaContext from "../KosaricaContext";
import { useState , useContext} from "react";
function Login(){

    const context=useContext(KosaricaContext)
    async function login(ev){
        ev.preventDefault()
        console.log("botun klik ",ev)
        const form = ev.currentTarget
        const formElements = form.elements
        console.log("form elements: ",formElements)
        const userName=formElements["uname"].value
        const password=formElements["password"].value
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
              },
            body: JSON.stringify({userName,password})
        };
        const response = await fetch(`http://localhost:5050/users/login`, requestOptions)
        console.log(response)
        if (!response.ok) {
            console.log("bad response ")
        }
        const responseData = await response.json();
        console.log("responseData:  ",responseData)
        context.setUser(responseData)
    }

    return <div>
        <form  onSubmit={(ev)=>{login(ev)}}> 
            <label htmlFor="uname">Korisnicko ime:</label><br/>
            <input type="text" id="uname" name="uname"/><br/>
            <label htmlFor="password">Lozinka</label><br/>
            <input type="password" id="password" name="password"/><br/>
            <button type="submit" >Login</button>
        </form>
           
    </div>
}
export default Login