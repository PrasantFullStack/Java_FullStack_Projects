import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('leadyfy_user') || 'null');
const storedToken = localStorage.getItem('leadyfy_token');

const initialState = {
  token: storedToken || '',
  user: storedUser || null,
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = '';

      localStorage.setItem('leadyfy_token', action.payload.token);
      localStorage.setItem('leadyfy_user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = '';
      state.user = null;
      state.loading = false;
      state.error = '';

      localStorage.removeItem('leadyfy_token');
      localStorage.removeItem('leadyfy_user');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
