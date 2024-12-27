import { createSlice } from '@reduxjs/toolkit';
import {
  logInUser,
  signout,
  refreshUser,
  registerUser,
} from '../operetions/auth-operetions';

const userInitialState = {
  user: { name: '', email: '' },
  accessToken: '',
  isLoading: false,
  isRefreshUser: false,
  error: null,
  isLoggedIn: false,
};

const userAuthSlise = createSlice({
  name: 'auth',
  initialState: userInitialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logInUser.rejected, (state, { payload }) => {
        state.error = payload.error;
      })
      .addCase(signout.fulfilled, state => {
        state.user = { name: '', email: '' };
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(signout.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshUser = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshUser = false;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isRefreshUser = false;
      });
  },
});

export const authReducer = userAuthSlise.reducer;
