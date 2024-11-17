
import DropDown from "./DropDown";
import { useState,useEffect } from "react";
function SelectFrame({frameBuilderId,onSelect}){
    
    const[frames,setFrames]=useState([])
    const [greska,setGreska]=useState("")
    const [loading,setLoading]=useState(false)

    async function catchFrames(){
        try{
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            const response = await fetch(`http://localhost:5050/frames?frameBuilder=${frameBuilderId}`, requestOptions)
            setLoading(false)
            console.log(response)
            if(response.ok){
                const json= await response.json()
                setFrames(json)
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
    function putInDropDown(frames){
        const frameList=frames.map((frame)=>{
            return {"name": frame.name, "value":  frame._id}
                    
        })
        console.log("frameList je: ",frameList)
        return frameList
    }
    function internalOnSelect(match){
        const rez= frames.filter((frame)=>{return frame._id==match})
        onSelect(rez[0])
    }
    useEffect(
       () => { catchFrames()},
       []
    )

    return <div>
            {loading ? <p>loading</p>: null}
            {greska ? <p>{greska}</p>:null}
            {frames ? <DropDown options={putInDropDown(frames)} onSelectionChange={internalOnSelect}></DropDown>: null}
    </div>
}
export default SelectFrame