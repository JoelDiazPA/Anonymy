import { createSlice } from "@reduxjs/toolkit"

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isAnonymyModalOpen: false
    },
    reducers: {
        onOpenAnonymyModal: (state) => {
            state.isAnonymyModalOpen = true;
        },
        onCloseAnonymyModal: (state) => {
            state.isAnonymyModalOpen = false;
        },
    }
});

export const { onOpenAnonymyModal, onCloseAnonymyModal } = uiSlice.actions;