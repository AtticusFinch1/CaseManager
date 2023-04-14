import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
    cases: [],
    case: null,
    searchCase: null, 
    currentPage: 1,
    totalPages: 0,
    next: null,
    prev: null,
    count: 0
};

export const getCases = async (id, dispatch, page) => {
    const config = {
        headers: {
            'Accept':'application/json',
            'Authorization':`JWT ${localStorage.getItem('access')}`,
            'Content-Type':'application/json',
        }
    };
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/test-suits/${id}?page=${page}`, config)
            if(response.status === 200){
                dispatch(getCasesSuccess(response.data))
                    
            } else {
                console.log('Case get fail')
            }
    } catch(err){
        console.log('case get fail')
    }
};

const caseSlice = createSlice({
    name: 'cases',
    initialState, 
    reducers: {
        newCase: (state, action) => {
            state.cases.push(action.payload)
        },
        getCasesSuccess(state, action) {
            state.cases = action.payload.test_suit_cases;
            state.currentPage = action.payload.current;
            state.totalPages = action.payload.total;
            state.next = action.payload.next;
            state.prev = action.payload.previous;
            state.count = action.payload.count;
        },
        updateCase: (state, action) => {           
            const { id, ...updatedItem } = action.payload;
            const index = state.cases.findIndex((item) => item.id === id);
            if(index !== -1) {
                state.cases[index] = { ...state.cases[index], ...updatedItem }
            }
        },
        removeCase: (state, action) => {
            state.cases = state.cases.filter((item) => item.id !== action.payload.id);
        },
        setSearchCase:(state, action) => {
            state.searchCase = (action.payload)
        }, 
        clearSearchCase: (state, action) => {
            state.searchCase = null;
        }
    }   
});

export const {
    getCasesSuccess,
    newCase,
    updateCase, 
    removeCase, 
    setSearchCase,
    clearSearchCase
} = caseSlice.actions;
 
export default caseSlice.reducer;