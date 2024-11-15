import { useState } from "react";
import ForOneFrame from "./ForOneFrame"
function Frame(){
    const [allFrames,setAllFrames]=useState([])

    async function catchFrame(){
        console.log("dogvaća")

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5050/frames", requestOptions)
        console.log("response: ",response)
        if(response.ok){
            const json=await response.json()
            setAllFrames(json)
            console.log("u jsonu: ",json)
        }
        
    }




    const frames=[{
        name: "bika1",
        bikeType: "road",
        geometry_type: "man",
        wheelSize: '20"',
        suspension: "no",
        material: "steel",
        availableSizes: ["47","50","52"],
        
    },
    {
        name:"bika2",
        bikeType: "mtb",
        geometry_type: "women",
        suspension: "front",
        material: "titan",
        availableSizes: ["54","60","62"]
    },
    {
        name:"bika3",
        bikeType: "treking",
        geometry_type: "universal",
        suspension: "back",
        material: "aluminium",
        availableSizes: ["62","47","54"]
    }
    ]
    return <div>
        {allFrames.map((frame=>{return <ForOneFrame key={frame._id} frameDic={frame}></ForOneFrame>}))}
        <button onClick={()=>{catchFrame()}}>dohFrame</button>
    </div>
}

export default Frame