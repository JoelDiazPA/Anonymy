import { createSlice } from "@reduxjs/toolkit";

// const tempEvent = {
//     _id: new Date().getTime(),
//     text: 'test',
//     image: null,
//     user: {
//         _id: '123',
//         name: 'Joel'
//     }
// }

export const anonymySlice = createSlice({
    name: 'anonymy',
    initialState: {
        isLoadingEvents: true,
        events: [
            //tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push( payload ); 
            state.activeEvent = null;
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            //state.events = payload;
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ) {
                    state.events.push( event )
                }
            })
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }
                return event;
            });
        },
        
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        },

        onLogoutAnonymy: ( state ) => {
            state.isLoadingEvents = true,
            state.events = []
            state.activeEvent = null
        }
    }
});

export const { 
    onSetActiveEvent, 
    onAddNewEvent, 
    onLoadEvents, 
    onUpdateEvent, 
    onDeleteEvent,
    onLogoutAnonymy,
} = anonymySlice.actions;