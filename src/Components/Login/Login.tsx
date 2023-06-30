import {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {setUser} from '../../Store/Slices/userSlice'
import {CustomForm} from "../Form/CustomForm";
import {useAppDispatch} from "../../hooks/reduxHooks";

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password).
        then(({user}) => {dispatch(setUser(
            {
                email: user.email,
                id: user.uid,
            }
        ));
            navigate('/')
        }).
        catch(console.error)
    }
    return(<div className='container'>
        <CustomForm
            title = 'Войти'
            handleClick = {handleLogin}
        />
    </div>)
}