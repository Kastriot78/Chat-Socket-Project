import { loginStart, loginSuccess, loginFailure } from './userRedux';
import axios from 'axios';
import { loginRoute } from '../utils/ApiRoutes';

export const login = async (username, password, dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(`${loginRoute}`, {username, password});
        dispatch(loginSuccess(response?.data))
    } catch (err) {
        console.log(err);
        dispatch(loginFailure(err?.response?.data?.error));
    }
}