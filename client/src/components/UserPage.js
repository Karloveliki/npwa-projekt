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
        return <div className="topDiv w3-teal w3-container">

                    <div className="w3-xxlarge w3-center w3-padding-64">Za pristup stranici trebate biti prijavljeni</div>
                    <div className="w3-center">
                    <Link className="w3-xxlarge " to={'/login'}>Prijavite se</Link>
                    </div>
              </div>
    }
    return (
        <div className="topDiv w3-teal w3-container">
            <div id="userPageHeading" style={headerStyle} className="w3-blue-gray"> 
                <Link style={{alignSelf: "flex-start"}} to="/">Home</Link>
                <div style={nameAndLogoutStyle}>
                    <IkonaKosarica/>
                    <UserStatus/>
                </div>
            </div>
            <div id="userPageMain" className= "w3-container w3-section">
                {children}
            </div>
        </div>
    )
}
export default UserPage

