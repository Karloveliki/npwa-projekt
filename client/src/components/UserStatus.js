import KosaricaContext from "../KosaricaContext";
import { useContext} from "react";
import { Link } from 'react-router-dom';

function UserStatus(){
    const context=useContext(KosaricaContext)
    const user=context["user"]
    //console.log("context   :",context)
    let userName=null
    let userType=null
    if(user){
        userName=user["userName"]
        userType=user["userType"]
    }
    function userLogout(){
        context.setUser(null)
    }
    
    return <div>
        {context.user? 
        <div>
            <button onClick={userLogout}>wanna logout</button>
            <div>{userName}</div>
        </div>
        :<Link to='/login'>Login Page</Link>
        }
        { userType=="admin" ? <Link to='/admin'>Admin</Link>: null}
    </div>
}
export default UserStatus