import { useDispatch, useSelector } from "react-redux"
import anonymyApi from "../api/anonymyApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onAddNewEvent } from "../store/anonymy/anonymySlice";

export const useAuthStore = () => {

    const { status, user, errorMessage} = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await anonymyApi.post('/auth', { email, password });
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({ email, password, name }) => {
        dispatch( onChecking() );

        try {
            const { data } = await anonymyApi.post('/auth/new', { email, password, name });
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || '--') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }


    const startSavingEvent = async( anonymyEvent ) => {

        if ( anonymyEvent.id) {
            // Actualizando
            const { data } = await anonymyApi.put(`/events/${ anonymyEvent.id }`, anonymyEvent );
            dispatch( onUpdateEvent({ ...anonymyEvent, user}) );
        } else {
            const { data } = await anonymyApi.post('/events', anonymyEvent );
            dispatch( onAddNewEvent({ ...anonymyEvent, id: data.evento.id, user }) );
        }
    }


    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await anonymyApi.get('auth/renew');
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }


    return {
        //Propieadades
        status, 
        user, 
        errorMessage,

        //Metodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout,
        startSavingEvent,
        
    }

}

