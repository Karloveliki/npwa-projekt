
import DropDown from "./DropDown";
import { useState,useEffect,useContext } from "react";
import KosaricaContext from "../KosaricaContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FrameList({frames,onSelecttionChange}){
    const navigate=useNavigate()
    return(
        <ul className="w3-ul  w3-card-4 w3-pale-blue">
            { frames.map((frame)=>{
                return (<li key={frame._id} onClick={()=>{onSelecttionChange(frame.value)}} className="w3-bar">
                            <div className="w3-bar-item">
                                <span onClick={()=>{navigate(`/details/${frame.value}`)}} className="w3-large">{frame.name}</span>
                            </div>
                        </li>
                        )
            })
            }
        </ul>
    )
}
//{frames ? <DropDown options={putInDropDown(frames)} onSelectionChange={internalOnSelect}></DropDown>: null}

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
        //console.log("match:   ",match)
        const rez= frames.filter((frame)=>{return frame._id==match})
        //console.log("rez[0   ",rez[0])
        onSelect(rez[0])
    }
    
    useEffect(
       () => { catchFrames()},
       [frameBuilderId]
    )

    return <>
            {loading ? <p>loading</p>: null}
            {greska ? <p>{greska}</p>:null}
            {frames? <FrameList frames={putInDropDown(frames)} onSelecttionChange={internalOnSelect}/>:null}
    </>
}
export default SelectFrame