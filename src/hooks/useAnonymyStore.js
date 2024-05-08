import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onSetActiveEvent } from '../store/anonymy/anonymySlice';

export const useAnonymyStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.anonymy );

    const setActiveEvent = ( anonymyEvent  ) => {
        dispatch( onSetActiveEvent( anonymyEvent) )
    }

    const startSavingEvent = async ( anonymyEvent ) => {
        // TODO: llegar al backend

        // Todo bien
        if ( anonymyEvent._id ) {
            // actualizando
        } else {
            // creando
            dispatch( onAddNewEvent({ ...anonymyEvent, _id: new Date().getTime() }))
        }

    }

    return {
        // Properties
        activeEvent,
        events,

        // Metodos
        setActiveEvent,
        startSavingEvent

    }   
  
}
