import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
    suits: [],
    loading: false
};

const suitSlice = createSlice({
    name: 'suits',
    initialState, 
    reducers: {
        setLoading: {
            suits: [], loading: false
        },
        newSuit: (state, action) => {
            state.suits.push(action.payload)
        },
        resetState: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
          (action) => action.type === 'POP',
          (state) => {
            return initialState;
          }
        );
    },
});

export const {newSuit, setLoading, resetState } = suitSlice.actions;
export default suitSlice.reducer;