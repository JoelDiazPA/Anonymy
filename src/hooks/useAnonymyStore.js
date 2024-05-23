import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/anonymy/anonymySlice';
import anonymyApi from '../api/anonymyApi';
import Swal from 'sweetalert2';

export const useAnonymyStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.anonymy );
    const { user } = useSelector( state => state.auth );


    const setActiveEvent = ( anonymyEvent  ) => {
        dispatch( onSetActiveEvent( anonymyEvent) )
    }

    const startSavingEvent = async ( anonymyEvent ) => {
        try {
            if ( anonymyEvent.id ) {
                // actualizando
                await anonymyApi.put(`/events/${ anonymyEvent.id }`, anonymyEvent );
                dispatch( onUpdateEvent({ ...anonymyEvent, user }) );
                return;
    
            } 
    
                // creando
                const { data } = await anonymyApi.post('/events', anonymyEvent );
                dispatch( onAddNewEvent({ ...anonymyEvent, id: data.evento.id, user }))
            
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
            
        }
    }

    const startDeletingEvent =  async () => {
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await anonymyApi.get('/events')
            dispatch( onLoadEvents( data.eventos ) );
        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }

    return {
        // Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
        startDeletingEvent,

    }   
  
}
