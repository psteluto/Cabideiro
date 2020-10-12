import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './TokenSlice';
import productMockReducer from './ProductsMockSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    productMock: productMockReducer
  }
});

export default store;