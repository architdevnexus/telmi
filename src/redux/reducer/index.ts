import { combineReducers } from "@reduxjs/toolkit";
import { userAuthReducer } from './users'
import { streamReducer } from './stream'

export const reducers = combineReducers({
    userAuthReducer,
    streamReducer
});
    