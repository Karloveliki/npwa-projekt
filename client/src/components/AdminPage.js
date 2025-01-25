import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react"
import KosaricaContext from '../KosaricaContext';

function BrisiButon({frameBuilderId,onDelete}){
    const [load,setLoad]=useState(false)
    const [greska,setGreska]=useState(false)
    const context=useContext(KosaricaContext)
    const user=context.user
    async function deleteFrameBuilder(frameBuilderId){
        setGreska(false)
        console.log("id: ",frameBuilderId)
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
                'Authorization': `Bearer ${user.token}`
            },
        };
        setLoad(true)
        const response = await fetch(`http://localhost:5050/frameBuilders/${frameBuilderId}`, requestOptions)
        setLoad(false)
        if(!response.ok){
            setGreska(true)
            setLoad(false)
            return
        }
        onDelete()
    }

    return (
        <span onClick={()=>{deleteFrameBuilder(frameBuilderId)}} class="w3-bar-item w3-button w3-white w3-xlarge w3-right">
            ×
            {greska ? <div>greska</div>: null}
            {load ? <div>loading</div>: null}
        </span>

    )
}


function AdminPage(){
    const [frameBuilders,setFrameBuilders]=useState(null)
    const [load,setLoad]=useState(false)
    const [greska,setGreska]=useState(false)
    const context=useContext(KosaricaContext)
    const user=context.user
    async function getFrameBuilders(){
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
        const response = await fetch("http://localhost:5050/frameBuilders", requestOptions)
        setLoad(false)
        if(response.ok){
            const responseData=await response.json()
            setFrameBuilders(responseData)
            console.log("frameBuilders: ",responseData)
        }
        else{
            setGreska(true)
            setLoad(false)
        }
    }

    useEffect(
            () => { getFrameBuilders()},
            []
        )

    return (
        <div className="w3-container w3-section">
            <h2 className="w3-section">Frame builders</h2>
            <div className="w3-cell-row w3-section" >
                <div className="w3-twothird">
                    <ul className="w3-ul  w3-card-4 w3-pale-blue">
                    {frameBuilders ? frameBuilders.map((frBuilder)=>{
                        return (
                            <li className="w3-bar" key={frBuilder._id}>
                                <Link to={`/admin/frameBuilders/${frBuilder._id}`}>
                                    <div class="w3-bar-item">
                                        <span class="w3-large">{frBuilder.name}</span>
                                    </div>
                                </Link>
                                {frBuilder.frames.length ?  
                                    null 
                                    :
                                    <BrisiButon frameBuilderId={frBuilder["_id"]} onDelete={getFrameBuilders}/>
                                }
                            </li>
                        )}) 
                        : null
                    }
                    </ul>
                    {greska ? <div>greska</div> : null}
                    {load ? <div>loading</div>:null}
                </div>
                <div className="w3-third w3-container">
                    <Link className="w3-button w3-xlarge w3-round-large w3-blue" to="/admin/addBuilder">dodaj buildera</Link>
                </div>
            </div>
        </div>
    )
}
export default AdminPage