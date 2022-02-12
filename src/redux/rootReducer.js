import { combineReducers } from 'redux';

import votersReducer from './votersSlice';
import filtersReducer from './filterSlice';

const rootReducer = combineReducers({
  voters: votersReducer,
  filters: filtersReducer,
});

export default rootReducer;
