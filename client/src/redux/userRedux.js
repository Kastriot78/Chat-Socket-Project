import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user-chat-app') ?? 'null'),
    loading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action?.payload?.user;
            localStorage.setItem('user-chat-app', JSON.stringify(action.payload.user));
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action?.payload;
        },
        logout: (state) => {
            localStorage.removeItem('user-chat-app');
            state.user = null;
            state.error = '';
        },
        // when we change profile picture we should update localstorage too, so we dont need to refresh the page to see new image.
        updateUserAvatar: (state, action) => {
            state.user = { ...state.user, avatarImage: action.payload.avatarImage };
            localStorage.setItem('user-chat-app', JSON.stringify(state.user));
        },
        //Reset all properties except 'user'
        clearState: (state) => {
            Object.assign(state, {
                loading: false,
                error: ''
            });
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, updateUserAvatar, clearState } = userSlice.actions;
export default userSlice.reducer;