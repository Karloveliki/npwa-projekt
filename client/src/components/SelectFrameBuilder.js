import { useState,useEffect } from "react";
import DropDown from "./DropDown";
import { useContext } from "react";
import KosaricaContext from "../KosaricaContext";

function SelectFrameBuilder({onSelect}){
  const context=useContext(KosaricaContext)
  const user=context.user
  const[frBuilders,setFrBuilders]=useState([])
  const [greska,setGreska]=useState("")
  const [loading,setLoading]=useState(false)

    async function catchFrameBuilders(){
        try{
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json', // Tell the server the data format
                    'Authorization': `Bearer ${user.token}`
                },
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

    useEffect(
        () => { catchFrameBuilders()},
        []
    )

    return <div>
        {loading ? <div>loading</div>: null}
        {greska ? <p>{greska}</p>: null}
        {frBuilders ? <DropDown options={putInDropDown(frBuilders)} onSelectionChange={internalOnSelect} /> : null}


    </div>
    
}

export default SelectFrameBuilder