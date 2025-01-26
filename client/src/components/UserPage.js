import { useContext } from "react"
import KosaricaContext from "../KosaricaContext"
import { Link } from "react-router-dom"
import IkonaKosarica from "./IkonaKosarica"
import UserStatus from "./UserStatus"


function UserPage({children}){
    const context=useContext(KosaricaContext)
    const user=context.user

    const headerStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'bottom',
        padding: '10px',
    };

    const nameAndLogoutStyle = {
        display:'flex',
        alignItems: 'bottom',
        alignSelf: 'flex-end',
        marginLeft: '10px',
    }
    

    if(!user){
        return <div class="topDiv w3-teal w3-container">

                    <div>Za pristup stranici trebate biti prijavljeni</div>
                    <Link to={'/login'}>Prijavite se</Link>
              </div>
    }
    return (
        <div class="topDiv w3-teal w3-container">
            <div id="userPageHeading" style={headerStyle} className="w3-blue-gray"> 
                <Link style={{alignSelf: "flex-start"}} to="/">Home</Link>
                <div style={nameAndLogoutStyle}>
                    <IkonaKosarica/>
                    <UserStatus/>
                </div>
            </div>
            <div id="userPageMain" class= "w3-container w3-section">
                {children}
            </div>
        </div>
    )
}
export default UserPage

