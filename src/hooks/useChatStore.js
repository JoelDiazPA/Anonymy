import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import anonymyApi from '../api/anonymyApi';
import Swal from 'sweetalert2';
import { onAddNewMessage, onLoadMessages, onSetActiveMessage } from '../store/anonymy/chatSlice';

export const useChatStore = () => {

    const dispatch = useDispatch();
    const { messages, activeMessage } = useSelector( state => state.anonymy );
    const { user } = useSelector( state => state.auth );


    const setActiveMessage = ( anonymyMessage ) => {
        dispatch( onSetActiveMessage( anonymyMessage) )
    }

    const startSavingMessage = async ( anonymyMessage ) => {
        try {
                // creando
                const { data } = await anonymyApi.post('/messages', anonymyMessage );
                dispatch( onAddNewMessage({ ...anonymyMessage, id: data.mensaje.id, user }))
            
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
            
        }
    }

    const startLoadingMessages = async () => {
      try {
        const { data } = await anonymyApi.get('/messages');
        dispatch(onLoadMessages(data.mensajes));
      } catch (error) {
        console.log('Error loading messages:', error);
      }
    };

    return {
        // Properties
        activeMessage,
        messages,

        // Metodos
        setActiveMessage,
        startSavingMessage,
        startLoadingMessages,
    }   
  
}
