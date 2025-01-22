import { useState } from "react"
import { Link } from "react-router-dom"
function AddFrameBuilders(){
    const [load,setLoad]=useState(false)
    const [greska,setGreska]=useState(false)
    const [ifDodan,setIfDodan]=useState(false)

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
    return <div>
            <button >Dodaj frame builder</button>
            <form onSubmit={(ev)=>{addingFrBuilder(ev)}}>
            <label htmlFor="name"> name</label><br/>
            <input type="text" id="name" name="name"/><br/>
            <label htmlFor="contact">contact:</label><br/>
            <input type="text" id="contact" name="contact"/><br/>
            <label htmlFor="country"> country</label><br/>
            <input type="text" id="country" name="country"/><br/>
            <button type="submit">dodaj</button>
        </form> 
        {load ? <div>loading</div>: null}
        {greska ? <div>Greska</div> : null}
        </div> 
}
export default AddFrameBuilders