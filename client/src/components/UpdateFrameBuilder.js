import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import KosaricaContext from '../KosaricaContext';
function UpdateFrameBuilder(){
    const params = useParams()
    const frameBuilderId=params.frameBuilderId
    const context=useContext(KosaricaContext)
    const user=context.user
    const [frameBuilder,setFrameBuilder]=useState(null)


    async  function getFrameBuilder(){
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json', // Tell the server the data format
                'Authorization': `Bearer ${user.token}`
              }
        };
    
        const response = await fetch(`http://localhost:5050/frameBuilders/${frameBuilderId}`, requestOptions)
        const dataResponse= await response.json()
        console.log("frameBuilder:   ",dataResponse)
        setFrameBuilder(dataResponse)
    }

    useEffect(
        () => {getFrameBuilder()},
        []
     )
     if(!frameBuilder){
        return <div>Loading</div>
     }
    return <div>
        <dvi>ja sam edit frameBuildera {frameBuilderId}</dvi>
            <div>{frameBuilder.name}</div>
        </div>
}
export default UpdateFrameBuilder