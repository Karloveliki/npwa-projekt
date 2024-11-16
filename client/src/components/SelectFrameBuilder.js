import { useState } from "react";
import DropDown from "./DropDown";
function SelectFrameBuilder({onSelect}){
    
  const[frBuilders,setFrBuilders]=useState([])
  const [greska,setGreska]=useState("")
  const [loading,setLoading]=useState(false)

    async function catchFrameBuilders(){
        try{
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            const response = await fetch("http://localhost:5050/frameBuilders", requestOptions)
            setLoading(false)
            console.log(response)
            if(response.ok){
                const json= await response.json()
                setFrBuilders(json)
                console.log("u jsonu",json)
            }
            else{
                throw new Error("response nije dohvacen")
            }
        }
        catch(err){
            setGreska(err.message)
        }
    }  
    function putInDropDown(frameBuilders){

        const frameBuilderList=frameBuilders.map((builder)=>{
            return {"name": builder.name, "value":  builder._id}
                    
        })
        return frameBuilderList
    }
    function internalOnSelect(par){
       const rez= frBuilders.filter((builder)=>{return builder._id==par})
       onSelect(rez[0])
    }

    return <div>
        <button onClick={()=>{catchFrameBuilders()}}>dohFrameBuilders</button>
        {loading ? <div>loading</div>: null}
        {greska ? <p>{greska}</p>: null}
        {frBuilders ? <DropDown options={putInDropDown(frBuilders)} onSelectionChange={internalOnSelect} /> : null}


    </div>
    
}

export default SelectFrameBuilder