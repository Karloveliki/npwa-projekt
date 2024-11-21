function DataFrame({dict}){
    return <div>
        <div>{dict.name}</div>
        <div>{dict.bikeType}</div>
        <div>{dict.geometry_type}</div>
        <div>{dict.wheelSize}</div>
        <div>{dict.suspension}</div>
        <div>{dict.material}</div>
        
    </div>
}
export default DataFrame