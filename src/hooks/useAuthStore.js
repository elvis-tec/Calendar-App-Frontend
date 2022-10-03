import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice';

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password })=>{
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post('/auth',{
                email,
                password
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            dispatch( onLogout('Wrong credentials') );
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },1000);
        }
    };

    const startRegister = async ({ email, name, password })=>{
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post('/auth/new',{
                email,
                name,
                password
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            dispatch( onLogout(`Sign In failed ${ error.response.data?.msg } `) );
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },1000);
        }
    };

    const checkAuthToken =  async() =>{
        const token = localStorage.getItem('token');

        if(!token) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout(`Invalid session ${ error.response.data?.msg } `) );
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },1000);
        }
    }

    const startLogout = () =>{
        localStorage.clear();
        dispatch( onLogout() );
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
