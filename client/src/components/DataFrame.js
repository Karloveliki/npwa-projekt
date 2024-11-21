function DataFrame({dict}){
    return <div>
        <div>name: {dict.name}</div>
        <div>bike type: {dict.bikeType}</div>
        <div>geometry type: {dict.geometry_type}</div>
        <div>wheel size: {dict.wheelSize}</div>
        <div>suspension: {dict.suspension}</div>
        <div>material: {dict.material}</div>
        <div>available sizes: {dict.availableSizes.map((el)=>{return <p>{el}</p>})}</div>
        <div>{dict.images.map((el)=>{return <img src={el}></img>})}</div>
        <div>base price:{dict.basePrice}</div>
        <div>down payment: {dict.downPayment}</div>
        <div>fork included:{`${dict.forkIncluded}`}</div>
    </div>
}
export default DataFrame