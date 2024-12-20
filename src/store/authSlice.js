import { createSlice } from '@reduxjs/toolkit';


const initialState  = {
    status: 'idle',
    accessToken: null,
    refreshToken: null,
    user: {
      id: null,
      username: null,
      email: null,
      role: null,
    },
    error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.status = 'loading';
      state.error = null;   
    },
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.username = null;
      state.email = null;
      state.name = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.error = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutSuccess, setAccessToken, setRefreshToken } = authSlice.actions;

export default authSlice.reducer;
