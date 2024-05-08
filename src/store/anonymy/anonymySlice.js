import { createSlice } from "@reduxjs/toolkit";

const tempEvent = {
    _id: new Date().getTime(),
    text: 'test',
    image: null,
    user: {
        _id: '123',
        name: 'Joel'
    }
}

export const anonymySlice = createSlice({
    name: 'anonymy',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent } = anonymySlice.actions;