import {createSlice} from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState: {
    token: "HAHAHA"
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
});

export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;