import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import KosaricaContext from '../KosaricaContext';



function BrisiButon({frameId, onDelete}){
    const context=useContext(KosaricaContext)
    const user=context.user
    const [load,setLoad]=useState(false)
    const [greska,setGreska]=useState(false)
    async function deleteFrame(frameId){
        setGreska(false)
        console.log("id: ",frameId)
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
                'Authorization': `Bearer ${user.token}`
              },
        };
        setLoad(true)
        const response = await fetch(`http://localhost:5050/frames/${frameId}`, requestOptions)
        setLoad(false)
        if(!response.ok){
            setGreska(true)
            setLoad(false)
            return
        }
        onDelete()
    }

    return <span>
            <button onClick={()=>{deleteFrame(frameId)}}>obrisi</button>
            {greska ? <div>greska</div>: null}
            {load ? <div>loading</div>: null}
            </span>
}

    function AdminFrameBuilder(){
        const [frames,setFrames]=useState(null)
        const [load,setLoad]=useState(false)
        const [greska,setGreska]=useState(false)
        const context=useContext(KosaricaContext)
        const user=context.user
        const params = useParams()
        const frameBuilderId=params.id 
        const frameBuilderName=params.name 
        async function getFramesForBuilder(){
            setGreska(false)
            console.log("getframebuilderes")
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json', // Tell the server the data format
                    'Authorization': `Bearer ${user.token}`
                },
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
        return (
            <div className="w3-container w3-section">
                <h2>{frameBuilderName}</h2>
                <div className="w3-cell-row w3-section">
                    <div className="w3-twothird">
                        {frames ? frames.map((frame)=>{ return <div key={frame._id}>{frame.name}<BrisiButon frameId={frame._id}
                        onDelete={getFramesForBuilder}/></div>}) : null}
                    </div>
                    <div className="w3-third w3-container">
                        <Link to={`/admin/frameBuilders/${frameBuilderId}/addFrame`}>doaj novi frame</Link>
                    </div>
                </div>
            </div>  
        )
        
}

export default AdminFrameBuilder