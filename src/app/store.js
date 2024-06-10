import { configureStore } from '@reduxjs/toolkit';
import groupReducer from '../features/groupSlice.js';

export const store = configureStore({
    reducer: groupReducer
});