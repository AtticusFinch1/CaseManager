import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import { PATH_DASHBOARD } from '../../routes/paths';

const initialState = {
   access: null,
   refresh: null,
   isAuthenticated: false,
   user: [],
   loading: false,
};

const slice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        loginSuccess(state, action){
            state.loading=false;
            state.isAuthenticated = true
            state.access = action.payload.access;
            state.refresh = action.payload.refresh
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
        },
        loginFail(state){
            state.loading=false
        },
        getUserSuccess(state, action){
            state.user=action.payload;
        },
        getUserFail(state){
            state.loading=false;
        },
        checkAuthSuccess(state){
            state.loading=false;
            state.isAuthenticated=true;
        },
        checkAuthFail(state){
            state.loading=false;
        },
        loadUserSuccess(state, action){
            state.loading=false;
            state.user=action.payload;
        },
        loadUserFail(state){
            state.loading=false;
            state.user=null;
        },
        refreshSuccess(state, action){
            localStorage.setItem('access', action.payload.access);
            state.loading=false;
            state.access=localStorage.getItem('access');
        },
        refreshFail(state){
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            state.loading=false;
            state.access=null;
            state.refresh = null;
        },
        logoutSuccess(state){
            localStorage.removeItem('access')
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null;
        },
        logoutFail(state){
            state.loading=false;
        },
    }
});

export const { 
    loginSuccess,
    loginFail,
    getUserSuccess,
    getUserFail,
    checkAuthSuccess,
    checkAuthFail,
    loadUserSuccess,
    loadUserFail,
    refreshSuccess,
    refreshFail,
    logoutSuccess,
    logoutFail,
     } = slice.actions

export default slice.reducer;

export function setAlert(msg, alertType, timeout = 5000){
    return async (dispatch) => {
        dispatch(slice.actions.alertSet(msg, alertType))
        setTimeout(()=> dispatch(slice.actions.alertRemove(), timeout))
    }
}

export const check_auth = () => async dispatch => {
    dispatch(slice.actions.getUserPending());
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept':'application/json',
            }
        }
        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/jwt/verify/`, body, config);
            if (res.status === 200) {
                dispatch(slice.actions.getUserSuccess(res.data));
            } else {
                dispatch(slice.actions.getUserFail())
            }
        } catch(err){
            dispatch(slice.actions.getUserFail());
        }
    }
}


export const refresh = () => async dispatch => {
    if(localStorage.getItem('refresh')){
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/jwt/refresh/`, body, config);
            if(res.status === 200){
                dispatch(slice.actions.refreshSuccess(res.data))
            } else {
                dispatch(slice.actions.refreshFail(res.data))
            }
        }catch(err){
            dispatch(slice.actions.refreshFail())
        }
    }
}

export const logout = () => dispatch => {
    dispatch(slice.actions.logoutPending());
    dispatch(slice.actions.logoutSuccess());
}

export const {resetRegistered} = slice.actions;