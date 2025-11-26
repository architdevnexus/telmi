import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: {},
  userId: '',
};

const userAuth = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, {payload}) => {
      state.token = payload;
    },
    setUser: (state, {payload}) => {
      state.user = payload;
    },
    setUserId: (state, {payload}) => {
      state.userId = payload;
    },
    resetUser: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {setToken, setUser, setUserId, resetUser} = userAuth.actions;

export const userAuthReducer = userAuth.reducer;
