function DataFrame({dict}){
    console.log("idct: ",dict)

    function convertArrayToStr(arr){
        const str=arr.join(",")
        return str
    }
    return <div className="w3-cell-row w3-section">
        <div className="w3-third w3-container w3-cell">
            <ul className="w3-ul w3-pale-blue">
                <li className="w3-bar">
                    <div className="w3-bar-item w3-large w3-left">name </div>
                    <div className="w3-bar-item w3-large  w3-right">
                        {dict.name}
                    </div>
                </li> 

                <li className="w3-bar">
                    <div className="w3-bar-item w3-large w3-left">bike type </div>
                    <div className="w3-bar-item w3-large w3-right">{dict.bikeType}</div>
                </li>

                <li className="w3-bar">
                    <div className="w3-bar-item w3-large w3-left">geometry type</div>
                    <div className="w3-bar-item w3-large w3-right">{dict.geometry_type}</div>
                </li>

                <li className="w3-bar">
                    <div className="w3-bar-item w3-large w3-left">wheel size </div>
                    <div className="w3-bar-item w3-large w3-right">{dict.wheelSize}</div>
                </li>

                <li className="w3-bar">
                    <div className="w3-bar-item w3-large w3-left">suspension </div>
                    <div className="w3-bar-item w3-large w3-right">{dict.suspension}</div>
                </li>
                
                <li className="w3-bar">
                    <div className="w3-bar-item w3-large w3-left">material </div>
                    <div className="w3-bar-item w3-large w3-right">{dict.material}</div>
                </li>

                <li className="w3-bar">
                    <div className="w3-bar-item w3-large w3-left" >available sizes </div>
                    <div className="w3-bar-item w3-large w3-right">{convertArrayToStr(dict.availableSizes)}</div>
                </li>
                <li className="w3-bar">
                    <div className="w3-bar-item w3-large w3-left">base price</div>
                    <div className="w3-bar-item w3-large w3-right">{dict.basePrice}</div>
                </li>

                <li className="w3-bar">
                    <div  className="w3-bar-item w3-large w3-left">down payment </div>
                    <div className="w3-bar-item w3-large w3-right">{dict.downPayment}</div>
                </li>

                <li className="w3-bar">
                    <div  className="w3-bar-item w3-large w3-left">fork included</div>
                    <div className="w3-bar-item w3-large w3-right">{`${dict.forkIncluded}`}</div>
                </li>
            </ul>
        </div>
    
        <div className="w3-twothird w3-container w3-cell">
             <img style={{maxWidth: "400px"}} src={dict.images[0]}></img>
        </div>
    </div>
}
export default DataFrame