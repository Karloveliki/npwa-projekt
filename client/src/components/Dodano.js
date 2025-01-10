function Dodano({visible,onDa,onNe}){

    if(!visible){
        return null
    }

    return <div>
        <div>proizvod dodan u kosaricu. Zelite li vidjeti sadrzaj kosarice?</div>
        <button onClick={()=>{onDa()}}>da</button>
        <button onClick={()=>{onNe()}}>ne</button>
    </div>
}
export default Dodano