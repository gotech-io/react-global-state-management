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

// Reducer
const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filters/voteFilterChanged': {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
};

// Action creators
const voteFilterChanged = (status) => ({
  type: 'filters/voteFilterChanged',
  payload: status,
});

// Selectors
const selectFilters = (state) => state.filters;

export { VoteFilter, voteFilterChanged, selectFilters };
export default filtersReducer;
