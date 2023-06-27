import {useDispatch} from "react-redux";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from '../../Store/Slices/UserSlices'
import {CustomForm} from "../Form/CustomForm.tsx";
export const SignUp = () => {
    const dispatch = useDispatch()
    const handleSingUp = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password).then(console.log).catch(console.error)
    }
return(
    <div className='container'>
        <CustomForm
        title = 'Создать аккаунт'
        handleClick={handleSingUp}
        />
    </div>
)
}