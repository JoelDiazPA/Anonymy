import { createSlice } from "@reduxjs/toolkit";

const tempEvent = {
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
        increment: (state,) => {
            state.counter += 1;
        }
    }
});

export const { increment } = anonymySlice.actions;