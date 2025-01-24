import { useContext } from "react"
import KosaricaContext from "../KosaricaContext"
import { Link } from "react-router-dom"

function AdminContent({children}){
    const context=useContext(KosaricaContext)
    const user=context.user
    if(!user || user.userType!="admin"){
        return <div>Neispravan login admina</div>
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