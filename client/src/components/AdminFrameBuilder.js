import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

    function AdminFrameBuilder(){
        const [frames,setFrames]=useState(null)
        const [load,setLoad]=useState(false)
        const [greska,setGreska]=useState(false)
        
        const params = useParams()
        const frameBuilderId=params.id 
        async function getFramesForBuilder(){
            setGreska(false)
            console.log("getframebuilderes")
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoad(true)
            const response = await fetch(`http://localhost:5050/frames?frameBuilder=${frameBuilderId}`, requestOptions)
            setLoad(false)
            if(response.ok){
                const responseData=await response.json()
                setFrames(responseData)
                console.log("response: ",responseData)
                
            }
            else{
                setGreska(true)
                setLoad(false)
            }
        }
        
        useEffect(
               () => { getFramesForBuilder()},
               []
            )
        return <div>
                <div> Frame Builder Admin</div>
                <Link to={`/admin/frameBuilders/${frameBuilderId}/addFrame`}>doaj novi frame</Link>
                {frames ? frames.map((frame)=>{ return <div>{frame.name}</div>}) : null}
            </div>
}

export default AdminFrameBuilder