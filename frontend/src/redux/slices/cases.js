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

const caseSlice = createSlice({
    name: 'cases',
    initialState, 
    reducers: {
        newCase: (state, action) => {
            state.cases.push(action.payload)
        },
        getCasesSuccess(state, action){
            state.cases = action.payload.results;
            state.currentPage = action.payload.current;
            state.totalPages = action.payload.current;
            state.next = action.payload.links.next;
            state.prev = action.payload.links.previous;
            state.count = action.payload.count;
        },
    }
});

export const {
    getCasesSuccess,
    newCase
} = caseSlice.actions;
 
export default caseSlice.reducer;