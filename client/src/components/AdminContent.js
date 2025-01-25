import { useContext } from "react"
import KosaricaContext from "../KosaricaContext"
import { Link } from "react-router-dom"

function AdminContent({children}){
    const context=useContext(KosaricaContext)
    const user=context.user
    if(!user || user.userType!="admin"){
        return <div><div>Neispravan login admina</div>
                <Link to={'/login'}>ulogirajte se kao admin</Link>
              </div>
    }
    return <div id="adminPage">

            <div id="adminPageHeading">
                <Link to={'/admin'}>Admin Home</Link>
            </div>
            <div id="adminPageMain">
                {children}
            </div>
          </div>
}
export default AdminContent