import {Link} from "react-router-dom";
import {Login} from "../Components/Login/Login";
import '../Styles/Pages/LoginPage.scss'


export const LoginPage: React.FC = () => {
    return(
        <div className='loginPage'>
            <div className='container text-center'>

            <Login />
            <p>
                или <Link to='/registration'>зарегистрируйтесь</Link>
            </p>
        </div></div>

    )
}