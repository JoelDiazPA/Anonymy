import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onAddResponse, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/anonymy/anonymySlice';
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
        try {
            await anonymyApi.delete(`/events/${ activeEvent.id }`)
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');

        }
        
    }

    const startLoadingEvents = async () => {
      try {
        const { data } = await anonymyApi.get('/events');
        dispatch(onLoadEvents(data.eventos));
      } catch (error) {
        console.log('Error loading events:', error);
      }
    };
    
      const startAddingResponse = async (eventId, responseText) => {
        try {
          const { data } = await anonymyApi.post(`/events/${eventId}/response`, { text: responseText });
          const addedResponse = data.event.responses[data.event.responses.length - 1]; // La última respuesta agregada
      
          dispatch(onAddResponse({ eventId, response: addedResponse }));
        } catch (error) {
          console.log('Error adding response:', error);
        }
      };

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
        startAddingResponse,
    }   
  
}
