import SelectFrameBuilder from "./SelectFrameBuilder";
import SelectFrame from "./SelectFrame";
import { useState } from "react";
import { Link } from "react-router-dom";
function BuilderFrameSelector(){

    const[frameBuilder,setFrameBuilder]=useState(null)
    const[frame,setFrame]=useState(null)
    function onFrameBuilderSelect(fB){
        setFrameBuilder(fB)
        setFrame(null)
    }
    function onFrameSelect(fr){
        setFrame(fr)
    }
    return <div>
        <SelectFrameBuilder onSelect={onFrameBuilderSelect} />
        {frameBuilder ? <SelectFrame frameBuilderId={frameBuilder._id} onSelect={onFrameSelect}/>: null}
        {frameBuilder ? frameBuilder.name : null} 
        {frame ? <div><Link to={`/details/${frame._id}`}>{frame.name}</Link></div>: null}
    </div>
}
export default BuilderFrameSelector