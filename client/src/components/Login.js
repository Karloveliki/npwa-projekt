import KosaricaContext from "../KosaricaContext";
import { useState , useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
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
        if(responseData.userType=="admin"){
            navigate('/admin')
            return
        }
        navigate('/');
    }

    return <div className="w3-container w3-display-topmiddle w3-padding-large w3-margin-bottom" >
            <h1>Magic Cycles Frame Shop</h1>

            <div className="w3-card-4 w3-padding-large w3-light-gray">
                <form className="w3-container" onSubmit={(ev)=>{login(ev)}} > 
                    <label  htmlFor="uname">Korisnicko ime:</label><br/>
                    <input className="w3-input w3-border w3-margin-bottom" type="text" id="uname" name="uname" /><br/>
                    <label htmlFor="password" style={{ marginBottom: '10px' }}>Lozinka</label><br/>
                    <input  className="w3-input w3-border w3-margin-bottom" type="password" id="password" name="password"/><br/>
                    {load ? <button type="submit" disabled >Login</button>:<button type="submit" >Login</button>}
                </form>
                
                {greska ? <div>Greska pri loginu</div>:null}
            </div>
            <div className="w3-container w3-margin-top  ">
                <Link className=" w3-xlarge w3-center w3-button " to='/register'>Ili se registrirajte</Link>
            </div>
        </div>
}
export default Login