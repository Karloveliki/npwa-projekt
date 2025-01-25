import { useContext } from "react"
import KosaricaContext from "../KosaricaContext"
import { Link } from "react-router-dom"
import IkonaKosarica from "./IkonaKosarica"
import UserStatus from "./UserStatus"


function UserPage({children}){
    const context=useContext(KosaricaContext)
    const user=context.user
    if(!user){
        return <div class="topDiv w3-teal w3-container">

                    <div>Za pristup stranici trebate biti prijavljeni</div>
                    <Link to={'/login'}>Prijavite se</Link>
              </div>
    }
    return (
        <div class="topDiv w3-teal w3-container">
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

