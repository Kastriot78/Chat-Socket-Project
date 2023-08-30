import { configureStore, combineReducers } from '@reduxjs/toolkit';
import chatContentRedux from './chatContentRedux';
import userRedux from './userRedux';

const rootReducer = combineReducers({
    chatContent: chatContentRedux,
    user: userRedux
});

const store = configureStore({
    reducer: rootReducer
});

export default store;