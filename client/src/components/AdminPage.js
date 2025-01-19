import { useState,useEffect } from "react";

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

    /*async function deleteFrameBuilder(){
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        const response = await fetch("http://localhost:5050/frameBuilders?", requestOptions)
    }
   */
    useEffect(
            () => { getFrameBuilders()},
            []
        )


    return <div>
            <div>U adminu sam</div>
            {frameBuilders ? frameBuilders.map((frBuilder)=>{return <div>{frBuilder.name}</div>}) : null}
            {greska ? <div>greska</div> : null}
            {load ? <div>loading</div>:null}
        </div>

    
}
export default AdminPage