import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'anonymy',
    initialState: {
        isLoadingMessages: true,
        messages: [],
    },
    reducers: {
        onSetActiveMessage: (state, { payload }) => {
            state.activeMessage = payload;
        },
        onAddNewMessage: (state, { payload }) => {
            state.messages.push(payload);
            state.activeMessage = null;
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
            state.activeMessage = null
        }
    }
});

export const {
    onAddNewMessage,
    onLoadMessages,
    onLogoutAnonymy,
    onSetActiveMessage,
} = chatSlice.actions;
