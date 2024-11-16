import { useState } from "react";
import ForOneFrame from "./ForOneFrame"
import DropDown from "./DropDown";

function Frame(){
    const [allFrames,setAllFrames]=useState([])
    const [greska,setGreska]=useState("")
    const [loading,setLoading]=useState(false)
    async function catchFrame(){
       
        try{
            console.log("dogvaća")

            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            const response = await fetch("http://localhost:5050/frames", requestOptions)
            
            console.log("response: ",response)
            if(response.ok){
                const json=await response.json()
                setAllFrames(json)
                setLoading(false)
                console.log("u jsonu: ",json)
            }
            else{
                throw new Error("response nije dohvacen")
            }
        }
        catch(err){
            //console.log("greska",err)
            setGreska(err.message)
            setLoading(false)
        }
    }

    function putInDropDown(frames){

        const frameList=frames.map((frame)=>{
            return {"name": frame.name, "value": frame}
                    
        })
        return frameList
    }


    
    return <div>
        {allFrames.map((frame=>{return <ForOneFrame key={frame._id} frameDic={frame}></ForOneFrame>}))}
        <button onClick={()=>{catchFrame()}}>dohFrame</button>
        <DropDown options={putInDropDown(allFrames)} onSelectionChange={(value)=>{console.log("value is: ",value)}}></DropDown>
        {loading ? <div>loading</div>:null}
        {greska ? <p>{greska}</p> : null}
    </div>
}

export default Frame