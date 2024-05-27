import { createSlice } from "@reduxjs/toolkit";

export const anonymySlice = createSlice({
    name: 'anonymy',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: (state, { payload }) => {
            state.events = state.events.filter(event => event.id !== payload);
            state.activeEvent = null;
        },
        onAddResponse: (state, { payload }) => {
            const { eventId, response } = payload;
            const eventIndex = state.events.findIndex(event => event.id === eventId);
            if (eventIndex >= 0) {
                if (!state.events[eventIndex].responses) {
                    state.events[eventIndex].responses = [];
                }
                state.events[eventIndex].responses.push(response);
            }
        },
        onLogoutAnonymy: (state) => {
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
    onAddResponse,
    onLogoutAnonymy,
} = anonymySlice.actions;
