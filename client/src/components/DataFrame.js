function DataFrame({dict}){
    console.log("idct: ",dict)
    return <div className="w3-cell-row">
        <div className="w3-third  w3-red w3-container w3-cell w3-cell-row">
            <ul>
            <div>name: {dict.name}</div>
            <div>bike type: {dict.bikeType}</div>
            <div>geometry type: {dict.geometry_type}</div>
            <div>wheel size: {dict.wheelSize}</div>
            <div>suspension: {dict.suspension}</div>
            <div>material: {dict.material}</div>
            <div>available sizes: {dict.availableSizes.map((el)=>{return <p>{el}</p>})}</div>
            <div>base price:{dict.basePrice}</div>
            <div>down payment: {dict.downPayment}</div>
            <div>fork included:{`${dict.forkIncluded}`}</div>
            </ul>
        </div>
    
        <div className="w3-twothird w3-container w3-cell">
             <img style={{maxWidth: "400px"}} src={dict.images[0]}></img>
        </div>
    </div>
}
export default DataFrame