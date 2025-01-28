import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import KosaricaContext from '../KosaricaContext';
import { useNavigate } from "react-router-dom";
function UpdateFrameBuilder(){
    const params = useParams()
    const frameBuilderId=params.frameBuilderId
    const context=useContext(KosaricaContext)
    const user=context.user
    const [frameBuilder,setFrameBuilder]=useState(null)
    const [name,setName]=useState('')
    const [country,setCountry]=useState('')
    const [contact,setContact]=useState('')
    const [greska,setGreska]= useState(false)
    const [dodan,setIfDodan]= useState(false)
    const[load,setLoad]=useState(false)
    const navigate=useNavigate()

    async  function getFrameBuilder(){
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
                'Authorization': `Bearer ${user.token}`
              }
        };
    
        const response = await fetch(`http://localhost:5050/frameBuilders/${frameBuilderId}`, requestOptions)
        const dataResponse= await response.json()
        console.log("frameBuilder:   ",dataResponse)
        setName(dataResponse.name)
        setContact(dataResponse.contact)
        setCountry(dataResponse.country)
        setFrameBuilder(dataResponse)
    }
    async function handleSubmit(ev){
        ev.preventDefault()
        console.log("dodabio submit")
        setLoad(false)
        setGreska(false)
        ev.preventDefault()
        
        const requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
                'Authorization': `Bearer ${user.token}`
              },
            body: JSON.stringify({name,country,contact})
        };
        setLoad(true)
        const response = await fetch(`http://localhost:5050/frameBuilders/${frameBuilderId}`, requestOptions)
        setLoad(false)
        if(!response.ok){
            setGreska(true)
            setIfDodan(false)
        }
        else{
            setIfDodan(true)
        }
    }
    useEffect(
        () => {getFrameBuilder()},
        []
     )
     if(!frameBuilder){
        return <div>Loading</div>
     }
     console.log("dodan:   ",dodan)
    if(dodan){
        navigate("/admin")
    }
    return <div className="w3-container w3-display-topmiddle w3-padding-large w3-margin-bottom" >
    <div className="w3-container w3-margin-top">
        <h1 className="w3-center">Novi Frame Builder</h1>
    </div>
    <div className="w3-card-4 w3-padding-large w3-light-gray w3-display-container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name"> name</label><br/>
            <input value={name} onChange={ev => {setName(ev.target.value)}} className="w3-input w3-border w3-margin-bottom" type="text" id="name" name="name"/><br/>
            <label htmlFor="contact">contact:</label><br/>
            <input value={contact} onChange={ev => {setContact(ev.target.value)}} className="w3-input w3-border w3-margin-bottom" type="text" id="contact" name="contact"/><br/>
            <label htmlFor="country"> country</label><br/>
            <input value={country} onChange={ev => {setCountry(ev.target.value)}} className="w3-input w3-border w3-margin-bottom" type="text" id="country" name="country"/><br/>
            <div className="w3-center">
            <button className="w3-centre w3-margin-left" type="submit">dodaj</button>
            </div>
        </form> 
        {greska ? <div>greska</div> : null }
    </div>
</div>
}
export default UpdateFrameBuilder