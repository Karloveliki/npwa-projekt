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

    return <span>
            <button onClick={()=>{deleteFrameBuilder(frameBuilderId)}}>obrisi</button>
            {greska ? <div>greska</div>: null}
            {load ? <div>loading</div>: null}
            </span>
}


function AdminPage(){
    const [frameBuilders,setFrameBuilders]=useState(null)
    const [load,setLoad]=useState(false)
    const [greska,setGreska]=useState(false)

    async function getFrameBuilders(){
        setGreska(false)
        console.log("getframebuilderes")
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        setLoad(true)
        const response = await fetch("http://localhost:5050/frameBuilders", requestOptions)
        setLoad(false)
        if(response.ok){
            const responseData=await response.json()
            setFrameBuilders(responseData)
            console.log("response: ",responseData)
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

    
    return <div>
            <div>U adminu sam</div>
            <Link to="/admin/addBuilder">dodaj buildera</Link>
            {frameBuilders ? frameBuilders.map((frBuilder)=>{
                return <div key={frBuilder._id}><Link to={`/admin/frameBuilders/${frBuilder._id}`}>{frBuilder.name}</Link> <BrisiButon frameBuilderId={frBuilder["_id"]} onDelete={getFrameBuilders}/></div>}) 
                : null}

            {greska ? <div>greska</div> : null}
            {load ? <div>loading</div>:null}
        </div>

    
}
export default AdminPage