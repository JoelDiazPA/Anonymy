import React from 'react'
import { useSelector } from 'react-redux'

export const useAnonymyStore = () => {

    const { events, activeEvent } = useSelector( state => state.anonymy );

    return {
        // Properties
        activeEvent,
        events,

        // Metodos


    }   
  
}
