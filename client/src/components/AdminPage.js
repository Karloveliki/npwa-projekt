import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function BrisiButon({frameBuilderId}){
    const [load,setLoad]=useState(false)
    const [greska,setGreska]=useState(false)

    async function deleteFrameBuilder(frameBuilderId){
        setGreska(false)
        console.log("id: ",frameBuilderId)
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        setLoad(true)
        const response = await fetch(`http://localhost:5050/frameBuilder/${frameBuilderId}`, requestOptions)
        setLoad(false)
        if(!response.ok){
            setGreska(true)
            setLoad(false)
        }
    }

    return <div>
            <button onClick={()=>{deleteFrameBuilder(frameBuilderId)}}>obrisi</button>
            {greska ? <div>greska</div>: null}
            {load ? <div>loading</div>: null}
          </div>
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
                return <div><div>{frBuilder.name}</div> <BrisiButon frameBuilderId={frBuilder["_id"]}/></div>}) 
                : null}

            {greska ? <div>greska</div> : null}
            {load ? <div>loading</div>:null}
        </div>

    
}
export default AdminPage