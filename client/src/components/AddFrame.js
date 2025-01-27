import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import KosaricaContext from '../KosaricaContext';
import { Link } from "react-router-dom";

function AddFrame(){
    const params = useParams()
    const builderName = params.builderName
    const context=useContext(KosaricaContext)
    const user=context.user
    const [greska,setGreska]=useState(null)
    const [load,setLoad]=useState(null)
    const [dodan,setDodan]=useState(false)

    console.log("user:  ",user)
    async function addingFrames(ev){
        setGreska(false)
        //setLoad(false)
       // setGreska(false)
        ev.preventDefault()
        const form = ev.currentTarget
        const formElements = form.elements
        const name=formElements.name.value
        const bikeType=formElements.bikeType.value
        const geometry_type=formElements.geometryType.value
        const wheelSize=formElements.wheelSize.value
        const suspension=formElements.suspension.value
        const material=formElements.material.value
        const availableSizes= Array.from(formElements.availableSizes.selectedOptions).map((option)=>{return option.value})
        const images=[formElements.images.value]
        const frameBuilder=params.id 
        const basePrice=formElements.basePrice.value
        const downPayment=formElements.downPayment.value
        const forkIncluded=formElements.vilica.checked
        console.log(formElements.vilica)
        
        const body={name,bikeType,geometry_type,wheelSize,suspension,
            material,availableSizes,images,frameBuilder,basePrice,
            downPayment,forkIncluded}
        
        console.log("body:   ",body)
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
                "Authorization": `Bearer ${user.token} `
              },
            body: JSON.stringify(body)
        };
        setLoad(true)
        const response = await fetch(`http://localhost:5050/frames`, requestOptions)
        setLoad(false)
        if(!response.ok){
            console.log("neuspjeh")
            setGreska(true)
            setLoad(false)
        }
        else{
            setDodan(true)
            
        }
    }
    if(dodan){
        return <div>
                <div>uspjesno dodan</div>
                <Link to={`/admin/frameBuilders/${params.id}/${builderName}`}>Natrag na {`${builderName}`}</Link>
            </div>
    }
    return<div className="w3-container w3-display-topmiddle w3-padding-large w3-margin-bottom" >
        <div className="w3-container w3-margin-top">
            <h1 className="w3-center">Novi Frame Builder</h1>
        </div>
        <div className="w3-card-4 w3-padding-large w3-light-gray w3-display-container">
            <form onSubmit={(ev)=>{addingFrames(ev)}}>
                
                {load ? <div>loading</div>: null}
                <label htmlFor="name"> Name</label><br/>
                <input className="w3-input w3-border w3-margin-bottom" type="text" id="name" name="name"/><br/>
        
                <label htmlFor="bikeType">Bike type: </label><br/>
                <select className="w3-input w3-border w3-margin-bottom w3-padding-small"
                 name="bikeType" id="bikeType" defaultValue='road'>
                    <option value="road">Road</option>
                    <option value="mtb">Mtb</option>
                    <option value="trekking">Trekking</option>
                    <option value="gravel">Gravel</option>
                    <option value="city">City</option>
                    <option value="cargo">Cargo</option>
                    <option value="bmx">Bmx</option>
                </select><br/>

                <label htmlFor="geometryType">Geometry type</label><br/>
                <select className="w3-input w3-border w3-margin-bottom w3-padding-small"
                 name="geometryType" id="geometryType" defaultValue='universal'>
                    <option value="man">Man</option>
                    <option value="women">Women</option>
                    <option value="universal">Universal</option>
                </select><br/>

                <label htmlFor="wheelSize">Wheel size</label><br/>
                <select className="w3-input w3-border w3-margin-bottom w3-padding-small"
                 name="wheelSize" id="wheelSize" defaultValue='20"'>
                    <option value='20"'>20"</option>
                    <option value='24"'>24"</option>
                    <option value='26"'>26"</option>
                    <option value='27.5"'>27.5"</option>
                    <option value='28"'>28"</option>
                    <option value='29"'>29"</option>
                    <option value='12"'>12"</option>
                    <option value='16"'>16"</option>
                </select><br/>

                <label htmlFor="suspension">Suspension: </label><br/>
                <select className="w3-input w3-border w3-margin-bottom w3-padding-small"
                 name="suspension" id="suspension" defaultValue='no'>
                    <option value='no'>No</option>
                    <option value='front'>Front</option>
                    <option value='back'>Back</option>
                    <option value='full'>Full</option>
                </select><br/>
                
                <label htmlFor="material">Material: </label><br/>
                <select className="w3-input w3-border w3-margin-bottom w3-padding-small"
                 name="material" id="material" defaultValue='steel'>
                    <option value='steel'>Steel</option>
                    <option value='aluminium'>Aluminium</option>
                    <option value='titan"'>Titan</option>
                    <option value='carbon'>Carbon</option>
                </select><br/>

                <label htmlFor="availableSizes"> Available Sizes</label><br/>
                <select className="w3-input w3-border w3-margin-bottom w3-padding-small" 
                name="availableSizes" id="availableSizes" defaultValue={['56']} multiple>
                    <option value='47'>47</option>
                    <option value='50'>50</option>
                    <option value='52'>52</option>
                    <option value='54'>54</option>
                    <option value='56'>56</option>
                    <option value='58'>58</option>
                    <option value='60'>60</option>
                    <option value='62'>62</option>
                    <option value='XS'>XS</option>
                    <option value='S'>S</option>
                    <option value='M'>M</option>
                    <option value='M/L'>M/L</option>
                    <option value='L'>L</option>
                    <option value='XL'>XL</option>
                    <option value='XXL'>XXL</option>
                </select><br/>
                <label htmlFor="images"> Images </label><br/>
                <input className="w3-input w3-border w3-margin-bottom" type="text" id="images" name="imagess"/><br/>
                <label htmlFor="basePrice"> Base Price </label><br/>
                <input className="w3-input w3-border w3-margin-bottom" type="text" id="basePrice" name="basePrice"/><br/>
                <label htmlFor="downPayment"> Down Payment </label><br/>
                <input className="w3-input w3-border w3-margin-bottom" type="text" id="downPayment" name="downPayment"/><br/>
                <label htmlFor="forkIncluded">Is Fork included </label>
                <input className="w3-input w3-border w3-margin-bottom" type="checkbox" id="vilica" name="vilica"/><br/>
                <div className="w3-center">
                    <button className="w3-centre w3-margin-left" type="submit">Dodaj</button>
                </div>
            </form>
        </div>
        {greska ? <div className="w3-red w3-large">greska</div>: null}
    </div>
}
export default AddFrame