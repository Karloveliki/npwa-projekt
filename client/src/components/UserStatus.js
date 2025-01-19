import KosaricaContext from "../KosaricaContext";
import { useContext} from "react";
import { Link } from 'react-router-dom';

function UserStatus(){
    const context=useContext(KosaricaContext)
    const user=context["user"]
    //console.log("context   :",context)
    let userName=null
    if(user){
        userName=user["userName"]
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

    </div>
}
export default UserStatus