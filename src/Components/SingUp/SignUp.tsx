import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from '../../Store/Slices/userSlice'
import {CustomForm} from "../Form/CustomForm.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/reduxHooks";
export const SignUp: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const handleSingUp = (email, password) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth,email,password).
        then(({user}) => {
            dispatch(setUser(
                {
                    email: user.email,
                    id: user.uid,
                }
            ));
            navigate('/')
        }).catch(console.error)
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