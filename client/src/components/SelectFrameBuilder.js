import { useState,useEffect } from "react";
import DropDown from "./DropDown";
import { useContext } from "react";
import KosaricaContext from "../KosaricaContext";


function FrameBuilderList({frameBuilders, onSelect,selected}) {
   
    return (
        <ul className="w3-ul  w3-card-4 w3-pale-blue">
            {frameBuilders.map((frameBuilder)=>{
                console.log("frBuilders:   ",frameBuilder)
                if(selected && frameBuilder._id==selected._id){
                    return (
                        <li key={frameBuilder._id} onClick={()=>{onSelect(frameBuilder._id)}}
                    className="w3-bar w3-purple">
                        <div className="w3-bar-item">
                            <span className="w3-large">{frameBuilder.name}</span>
                        </div>
                    </li>
                    )
                }
                return(
    
                    <li key={frameBuilder._id} onClick={()=>{onSelect(frameBuilder._id)}}
                    className="w3-bar">
                        <div className="w3-bar-item">
                            <span className="w3-large">{frameBuilder.name}</span>
                        </div>
                    </li>
               
                )

            })
            }
        </ul>
    )
}

function SelectFrameBuilder({onSelect,frameBuilder}){
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
        console.log("internalOnSelect:    ",par)
       const rez= frBuilders.filter((builder)=>{return builder._id==par})
       onSelect(rez[0])
    }

    useEffect(
        () => { catchFrameBuilders()},
        []
    )

    return (
        <>
            {loading ? <div>loading</div>: null}
            {greska ? <div>{greska}</div>: null}
            {frBuilders ? <FrameBuilderList frameBuilders={frBuilders} onSelect={internalOnSelect} selected={frameBuilder} /> : null}
        </>
    )
}

export default SelectFrameBuilder