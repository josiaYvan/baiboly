/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    timeZone: '',
    isLoading: false,
    reFetch: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    reFetchData: (state) => {
      state.reFetch = !state.reFetch;
    }
  }
});

export const { setLoading, reFetchData } = appSlice.actions;

export default appSlice.reducer;
