import {Link} from "react-router-dom";
import {SignUp} from "../Components/SingUp/SignUp";
import '../Styles/Pages/RegisterPage.scss'

export const RegisterPage: React.FC = () => {
    return(
        <div className='registerPage'>
            <div className='container text-center'>

                <SignUp />
                <p>
                    Есть аккаунт? <Link to='/login'>Войти</Link>
                </p>
            </div>

        </div>

    )
}