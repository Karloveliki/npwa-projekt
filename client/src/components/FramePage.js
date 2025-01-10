import { useParams } from "react-router-dom"
import { useState,useEffect,useContext } from "react"
import DataFrame from "./DataFrame"
import { Link } from "react-router-dom";
import KosaricaContext from "../KosaricaContext";
import Dodano from "./Dodano"
import { useNavigate } from 'react-router-dom'

function FramePage(){
    const params = useParams()
    const frameId=params.id 
    const [greska,setGreska]=useState("")
    const [loading,setLoading]=useState(false)
    const [frame,setFrame]=useState(null)
    const [dodano,setDodano]=useState(false)

    console.log(params)
    async function catchFrame(){
        try{
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            const response = await fetch(`http://localhost:5050/frames/${frameId}`, requestOptions)
            setLoading(false)
            console.log(response)
            if(response.ok){
                const json= await response.json()
                setFrame(json)
            }
            else{
                throw new Error("response nije dohvacen")
            }
        }
        catch(err){
            setGreska(err.message)
        }
    }
    const navigate=useNavigate()
    useEffect(
        ()=>{catchFrame()},
        []
    )
    const kosarica=useContext(KosaricaContext)
    function dodajUKosaricu(){
        kosarica.dodajFrame(frame)
        setDodano(true)
    }
    
    function ne(){
        setDodano(false)
    }

    function da(){
        setDodano(false)
        navigate("/shoppingCart")
    }

    return <div>
        <button onClick={dodajUKosaricu}>dodaj u kosaricu</button>
        <Dodano visible={dodano} onDa={da} onNe={ne} />
        <p>{kosarica.izracunKolicineTogFramea(frameId)}</p>
        {loading ? <div>loading</div>: null}
        {greska ? <div>{greska}</div>: null}
        {frame ? <DataFrame dict={frame}/>: null}
        <div>
            <Link to={"/"}>Home</Link>
        </div>
    </div>
}
export default FramePage