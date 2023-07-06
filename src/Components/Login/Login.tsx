import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {setUser} from '../../Store/Slices/userSlice'
import {CustomForm} from "../Form/CustomForm";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {Modal} from "../Modal/Modal";
import {useState} from "react";
import {ValidationType} from "../Form/Validation";

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<ValidationType>({
        error: false,
        message: ''
    });
    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password).
        then(({user}) => {
            dispatch(setUser(
            {
                email: user.email,
                id: user.uid,
            }
        ));
            navigate('/')
        }).
        catch((error) => setError({error:true, message:error.message}))
    }
    return(<div className='container'>
        <Modal open={error.error}  onClose={() => setError({...error, error: false})}>
            <div style={{ color: "#FF0000" }}>
            <h4>Ошибка!</h4>
            <h4>Сообщение: {error.message}</h4>
            </div>
        </Modal>
        <CustomForm
            title = 'Войти'
            handleClick = {(email, pass) => handleLogin(email, pass)}
        />
    </div>)
}