
import DropDown from "./DropDown";
import { useState,useEffect,useContext } from "react";
import KosaricaContext from "../KosaricaContext";
function SelectFrame({frameBuilderId,onSelect}){
    const context=useContext(KosaricaContext)
    const user=context.user
    const[frames,setFrames]=useState([])
    const [greska,setGreska]=useState("")
    const [loading,setLoading]=useState(false)

    
    async function catchFrames(){
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
            const response = await fetch(`http://localhost:5050/frames?frameBuilder=${frameBuilderId}`, requestOptions)
            setLoading(false)
            console.log(response)
            if(response.ok){
                const json= await response.json()
                setFrames(json)
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
        return frameList
    }
    function internalOnSelect(match){
        const rez= frames.filter((frame)=>{return frame._id==match})
        onSelect(rez[0])
    }
    
    useEffect(
       () => { catchFrames()},
       [frameBuilderId]
    )

    return <div>
            {loading ? <p>loading</p>: null}
            {greska ? <p>{greska}</p>:null}
            {frames ? <DropDown options={putInDropDown(frames)} onSelectionChange={internalOnSelect}></DropDown>: null}
    </div>
}
export default SelectFrame