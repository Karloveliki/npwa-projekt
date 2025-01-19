import Login from "./Login"
import { Link } from "react-router-dom"

function LoginPage(){

    return <div>
        <Login/>
        <Link to='/register'>Registracija</Link>
    </div>
}
export default LoginPage