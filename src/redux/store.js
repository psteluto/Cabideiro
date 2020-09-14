import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './TokenSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer
  }
});

export default store;