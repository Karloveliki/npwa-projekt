

function ForOneFrame({frameDic}){


    return <div>
        <div>{frameDic.name}</div>
        <div>{frameDic.bikeType}</div>
        {frameDic.availableSizes.map((size)=>{return <p key={size}>{size}</p>})}
        
    </div>
    
}

export default ForOneFrame