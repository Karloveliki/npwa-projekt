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
        return <div class="topDiv w3-gray w3-container"><div>Za pristup administratorskim stranicama trebate biti prijavljeni kao admin</div>
                <Link to={'/login'}>Prijavite se kao admin</Link>
              </div>
    }

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
    const nameStyle = {
        marginRight: '10px'
    }


    return <div className="topDiv w3-gray w3-container">
            <div id="adminPageHeading"  style={headerStyle} className="w3-dark-grey">
                <Link style={{alignSelf: "flex-start"}} to={'/admin'}>Admin Home</Link>
                <div style={nameAndLogoutStyle}>
                    <div style={nameStyle}>{user.userName}</div>
                    <button onClick={()=>{adminLogout()}}>Logout</button>
                </div>
            </div>
            <div id="adminPageMain">
                {children}
            </div>
          </div>
}
export default AdminContent