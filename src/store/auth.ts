import { createSlice } from '@reduxjs/toolkit';
import Router from 'next/router';

const initialAuth = {
  address: null,
  accessToken: null,
};

export const Auth = createSlice({
  name: 'auth',
  initialState: {
    auth: initialAuth,
  },
  reducers: {
    login: (state, { payload }) => {
      Router.push('/dashboard');
      state.auth = payload;
    },
    logout: (state) => {
      state.auth = initialAuth;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = Auth.actions;

export default Auth.reducer;
