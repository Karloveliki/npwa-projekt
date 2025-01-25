import KosaricaContext from "../KosaricaContext";
import { useState , useContext} from "react";
import { useNavigate } from 'react-router-dom';

function Login(){
    const [greska,setGreska]=useState(false)
    const [load,setLoad]=useState(false)
    const context=useContext(KosaricaContext)
    const navigate = useNavigate();
    async function login(ev){
        setGreska(false)
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
        setLoad(true)
        const response = await fetch(`http://localhost:5050/users/login`, requestOptions)
        setLoad(false)
        console.log(response)
        if (!response.ok) {
            setGreska(true)
            console.log("bad response ")
            return
        }
        const responseData = await response.json();
        console.log("responseData:  ",responseData)
        context.setUser(responseData)
        navigate('/');
    }

    return <div class="login">
        <form  onSubmit={(ev)=>{login(ev)}} class="container"> 
            <label htmlFor="uname">Korisnicko ime:</label><br/>
            <input type="text" id="uname" name="uname"/><br/>
            <label htmlFor="password">Lozinka</label><br/>
            <input type="password" id="password" name="password"/><br/>
            {load ? <button type="submit" disabled >Login</button>:<button type="submit">Login</button>}
        </form>
        {greska ? <div>Greska pri loginu</div>:null}

    </div>
}
export default Login