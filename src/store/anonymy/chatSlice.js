import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'anonymy',
    initialState: {
        isLoadingMessages: true,
        messages: [],
    },
    reducers: {
        onAddNewMessage: (state, { payload }) => {
            state.messages.push(payload);
        },
        onLoadMessages: (state, { payload = [] }) => {
            state.isLoadingMessages = false;
            payload.forEach(message => {
                const exists = state.messages.some(dbMessage => dbMessage.id === message.id);
                if (!exists) {
                    state.messages.push(message);
                }
            });
        },
        onLogoutAnonymy: (state) => {
            state.isLoadingMessages = true,
            state.messages = []
        }
    }
});

export const {
    onAddNewMessage,
    onLoadMessages,
    onLogoutAnonymy,
} = chatSlice.actions;
