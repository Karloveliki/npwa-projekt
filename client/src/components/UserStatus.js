import KosaricaContext from "../KosaricaContext";
import { useContext} from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function UserStatus(){
    const context=useContext(KosaricaContext)
    const user=context["user"]
    //console.log("context   :",context)
    let userName=null
    let userType=null
    const navigate=useNavigate()
    if(user){
        userName=user["userName"]
        userType=user["userType"]
    }
    function userLogout(){
        context.setUser(null)
        navigate('/')
    }
    const nameStyle = {
        marginRight: '10px'
    }
    return <div>
        {context.user? 
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} >
            <div style={nameStyle}>{userName}</div>
            <button onClick={userLogout}>Odjava</button>
        </div>
        :<Link to='/login'>Login Page</Link>
        }
        { userType=="admin" ? <Link to='/admin'>Admin</Link>: null}
    </div>
}
export default UserStatus