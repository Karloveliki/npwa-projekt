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

    return <span onClick={()=>{deleteFrame(frameId)}} className="w3-bar-item w3-button w3-white w3-xlarge w3-right">
            x
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
        
        function oneFrame (frame){
            return (
                <li className="w3-bar">
                    <div className="w3-bar-item">
                        <span className="w3-large">{frame.name}</span>
                    </div>
                    <BrisiButon frameId={frame._id} onDelete={getFramesForBuilder}>Obrisi</BrisiButon>
                </li>
            )
        }
        return (
            <div className="w3-container w3-section">
                <h2 className="w3-section">{frameBuilderName}</h2>
                <div className="w3-cell-row w3-section">
                    <div className="w3-twothird">
                        <ul className="w3-ul  w3-card-4 w3-pale-blue">
                        {frames ? frames.map((frame)=>{ return oneFrame(frame)}) : null}
                        </ul>
                    </div>
                    <div className="w3-third w3-container">
                        <Link className="w3-button w3-xlarge w3-round-large w3-blue"
                        to={`/admin/frameBuilders/addFrame/${frameBuilderId}/${frameBuilderName}`}>dodaj novi frame</Link>
                    </div>
                </div>
            </div>  
        )
        
}

export default AdminFrameBuilder

// (<div key={frame._id}>{frame.name}<BrisiButon frameId={frame._id}
//onDelete={getFramesForBuilder}/></div>)