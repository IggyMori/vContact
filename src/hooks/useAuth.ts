import {useAppSelector} from "./reduxHooks";

export const useAuth = () => {
    const {email, id} = useAppSelector(state => state.user)
    return {
        isAuth: !!id,
        email,
        id
    }
}