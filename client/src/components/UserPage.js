import { useContext } from "react"
import KosaricaContext from "../KosaricaContext"
import { Link } from "react-router-dom"
import IkonaKosarica from "./IkonaKosarica"
import UserStatus from "./UserStatus"


function UserPage({children}){
    const context=useContext(KosaricaContext)
    const user=context.user
    if(!user){
        return <div class="login">
                    <div>Molim ulogirajte se</div>
                    <Link to={'/login'}>Login</Link>
              </div>
    }
    return (
        <div id="userPage">
                <div id="userPageHeading"> 
                    <Link to="/">Home</Link>
                    <IkonaKosarica/>
                  <UserStatus/>
                </div>
            <div id="userPageMain">
                {children}
            </div>
        </div>
    )
}
export default UserPage

