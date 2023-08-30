import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    open: false
}

export const chatContentSlice = createSlice({
    name: 'chatContent',
    initialState,
    reducers: {
        openChatContent: (state, action) => {
            state.open = !state.open;
        }
    }
});

export const {
    openChatContent
} = chatContentSlice.actions;

export default chatContentSlice.reducer;