import {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {useDispatch} from "react-redux";
import {setUser} from '../../Store/Slices/UserSlices'
import {CustomForm} from "../Form/CustomForm";

export const Login = () => {
    const dispatch = useDispatch()

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password).then(console.log).catch(console.error)
    }
    return(<div className='container'>
        <CustomForm
            title = 'Войти'
            handleClick = {handleLogin}
        />
    </div>)
}