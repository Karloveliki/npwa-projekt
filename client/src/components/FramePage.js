import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import DataFrame from "./DataFrame"
import { Link } from "react-router-dom";
function FramePage(){
    const params = useParams()
    const frameId=params.id 
    const [greska,setGreska]=useState("")
    const [loading,setLoading]=useState(false)
    const [frame,setFrame]=useState(null)
    
    console.log(params)
    async function catchFrame(){
        try{
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            const response = await fetch(`http://localhost:5050/frames/${frameId}`, requestOptions)
            setLoading(false)
            console.log(response)
            if(response.ok){
                const json= await response.json()
                setFrame(json)
            }
            else{
                throw new Error("response nije dohvacen")
            }
        }
        catch(err){
            setGreska(err.message)
        }
    }
    useEffect(
        ()=>{catchFrame()},
        []
    )
    return <div>
        {loading ? <div>loading</div>: null}
        {greska ? <div>{greska}</div>: null}
        {frame ? <DataFrame dict={frame}/>: null}
        <div>
            <Link to={"/"}>Home</Link>
        </div>
    </div>
}
export default FramePage