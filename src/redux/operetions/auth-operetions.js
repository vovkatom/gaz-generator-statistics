import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';
// axios.defaults.baseURL = 'https://gaz-generator-statistics-back.onrender.com/';
axios.defaults.baseURL = process.env.REACT_APP_API_URL
// axios.defaults.baseURL = 'https://gaz-generator-statistics-back.onrender.com/api';

const accessToken = {

  set(accessToken) {

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export const registerUser = createAsyncThunk(
  'auth/signup',
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await axios.post('auth/signup', userInfo);
      accessToken.set(data.accessToken);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Обробка помилки з кодом 400 (наприклад, невірні дані при реєстрації)
        const errorMessage = error.response.data.message || 'Error Registr...';
        alert(errorMessage);
      } else {
        // Інші помилки
        // alert('Email is already in use. Please use a different email.');
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  'auth/signin',
  async (userInfo, thunkAPI) => {
    // console.log("--------------------------------------");
    // console.log(thunkAPI);
    // console.log("--------------------------------------");
    try {
      const { data } = await axios.post('/auth/signin', userInfo);
      // console.log('accessToken:', data.accessToken);
      accessToken.set(data.accessToken);
      return data;
    } catch (error) {
      // alert(error.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signout = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/signout');
    accessToken.unset();
  } catch (error) {
    // alert(error.message);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    // console.log(state.accessToken);
    // console.log(persistedToken);

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    } else accessToken.set(persistedToken);
    try {
      const { data } = await axios.get('/auth/current');
      return data;
    } catch (error) {
      //alert(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
