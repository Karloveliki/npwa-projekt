import SelectFrameBuilder from "./SelectFrameBuilder";
import SelectFrame from "./SelectFrame";
import { useState , useContext} from "react";
import { Link } from "react-router-dom";
import KosaricaContext from "../KosaricaContext";

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
    const kosarica=useContext(KosaricaContext)

    return <div>
        <div className="w3-container w3-section">
            <h2 className="w3-section">Magic cycles</h2>
            <div className="w3-cell-row w3-section">
                <div className="w3-twothird">
                
                    <SelectFrameBuilder onSelect={onFrameBuilderSelect} />
                </div>
                <div className="w3-third">
                    {frameBuilder ? <SelectFrame frameBuilderId={frameBuilder._id} onSelect={onFrameSelect}/>: null}
                    {frameBuilder ? frameBuilder.name : null} 
                    {frame ? <div><Link to={`/details/${frame._id}`}>{frame.name}</Link></div>: null}
                </div>
            </div>

        </div>
    </div>
}
export default BuilderFrameSelector