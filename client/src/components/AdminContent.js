import { useContext } from "react"
import KosaricaContext from "../KosaricaContext"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

function AdminContent({children}){
    const context=useContext(KosaricaContext)
    const user=context.user
    const navigate = useNavigate();
    function adminLogout(){
        context.setUser(null)
        navigate('/')
    }
    if(!user || user.userType!="admin"){
        return <div><div>Neispravan login admina</div>
                <Link to={'/login'}>ulogirajte se kao admin</Link>
              </div>
    }
    return <div id="adminPage">
            <button onClick={()=>{adminLogout()}}>Logout</button>
            <div id="adminPageHeading">
                <Link to={'/admin'}>Admin Home</Link>
            </div>
            <div id="adminPageMain">
                {children}
            </div>
          </div>
}
export default AdminContent