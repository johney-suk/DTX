import { Dispatch } from 'redux';
import api from '../../utils/api';
import { User } from '../types/index';
import { login } from '../reducers/user';
import axios from 'axios';

// login action 
export const loginUser = (user: User) => async (dispatch: Dispatch) => {
    return await api.loginAsync(user).then((res) => {
        axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
        dispatch(login(user));
    }).catch(err => {
        throw err;
    });
};

// signup action
export const registerUser = (user: User) => async (dispatch: Dispatch) => {
    try {
        console.log('registerUser action', user);
        await api.postUserAsync(user);
    } catch (error) {
        console.error('Registration failed', error);
    }
};
