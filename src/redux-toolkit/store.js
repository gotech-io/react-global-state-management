import { configureStore } from '@reduxjs/toolkit';

import votersReducer from './votersSlice';
import filtersReducer from './filterSlice';

// configureStore comes prepared with devtools and redux-thunk
const store = configureStore({
  reducer: {
    voters: votersReducer,
    filters: filtersReducer,
  },
});

export default store;
