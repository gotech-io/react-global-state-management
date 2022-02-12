import { createSlice } from '@reduxjs/toolkit';

const VoteFilter = {
  All: 'ALL',
  LoveIt: 'LOVE_IT',
  HateIt: 'HATE_IT',
  NotVoted: 'NOT_VOTED',
};

// Initial state
const initialState = {
  status: VoteFilter.All,
};

// The whole slice is defined at once
const filtersSlice = createSlice({
  name: 'filters', // the prefix of the reducer filters/...
  initialState,
  reducers: {
    voteFilterChanged(state, action) {
      state.status = action.payload; // is mutable thanks to immer library
    },
  },
});

// Reducer
const reducer = filtersSlice.reducer;

// Action creators
const { voteFilterChanged } = filtersSlice.actions;

// Selectors
const selectFilters = (state) => state.filters;

export { VoteFilter, voteFilterChanged, selectFilters };
export default reducer;
