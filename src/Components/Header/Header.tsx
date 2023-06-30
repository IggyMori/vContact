import {useAuth} from '../../hooks/useAuth'

import {removeUser} from "../../Store/Slices/userSlice";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import '../../Styles/Components/Buttons.scss'
import {useAppDispatch} from "../../hooks/reduxHooks";
export const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isAuth, email} = useAuth();
    const logOut = () => {
        dispatch(removeUser());
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <span className="navbar-brand" onClick={() => navigate('/')}>vContact</span>

                <div className="justify-content-end">


                            {
                                isAuth ?

                                    <Button className='LogOutButton' onClick={() => logOut()}>Выйти</Button>   : <Button className='LoginSingUpButton' onClick={() => navigate('/login')}>Войти</Button>
                            }




                </div>
            </div>
        </nav>
    );
};