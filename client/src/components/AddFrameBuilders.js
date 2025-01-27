import { useState,useContext } from "react"
import { Link } from "react-router-dom"
import KosaricaContext from '../KosaricaContext';

function AddFrameBuilders(){
    const [load,setLoad]=useState(false)
    const [greska,setGreska]=useState(false)
    const [ifDodan,setIfDodan]=useState(false)
    const context=useContext(KosaricaContext)
    const user=context.user
    async function addingFrBuilder(ev){
        setLoad(false)
        setGreska(false)
        ev.preventDefault()
        const form = ev.currentTarget
        const formElements = form.elements
        const name=formElements.name.value
        const country=formElements.country.value
        console.log("******* name:  ",name)
        console.log("******* country:  ",country)
        const contact=formElements.contact.value
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
                'Authorization': `Bearer ${user.token}`
              },
            body: JSON.stringify({name,country,contact})
        };
        setLoad(true)
        const response = await fetch(`http://localhost:5050/frameBuilders`, requestOptions)
        setLoad(false)
        if(!response.ok){
            setGreska(true)
            setIfDodan(false)
        }
        else{
            setIfDodan(true)
        }
    
    }

    if(ifDodan){
        return <div>
            <div>Uspjesno dodan framebuilder</div>
            <Link to={'/admin'}>lista framebuildera</Link>
        </div>
    }
    return <div className="w3-container w3-display-topmiddle w3-padding-large w3-margin-bottom" >
                <div className="w3-container w3-margin-top">
                    <h1 className="w3-center">Novi Frame Builder</h1>
                </div>
                <div className="w3-card-4 w3-padding-large w3-light-gray w3-display-container">
                    <form onSubmit={(ev)=>{addingFrBuilder(ev)}}>
                        <label htmlFor="name"> name</label><br/>
                        <input className="w3-input w3-border w3-margin-bottom" type="text" id="name" name="name"/><br/>
                        <label htmlFor="contact">contact:</label><br/>
                        <input className="w3-input w3-border w3-margin-bottom" type="text" id="contact" name="contact"/><br/>
                        <label htmlFor="country"> country</label><br/>
                        <input className="w3-input w3-border w3-margin-bottom" type="text" id="country" name="country"/><br/>
                        <div className="w3-center">
                        <button className="w3-centre w3-margin-left" type="submit">dodaj</button>
                        </div>
                    </form> 
                </div>
                {load ? <div>loading</div>: null}
                {greska ? <div className="w3-red w3-large">Greska</div> : null}
            </div>
}
export default AddFrameBuilders