import { createSelector } from 'reselect';
import { VoteFilter, selectFilters } from './filterSlice';

// Initial state
const initialState = {
  status: 'idle',
  entities: {},
};

// Reducer
const votersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'voters/votersLoading': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'voters/votersLoaded': {
      const newEntities = {};
      action.payload.forEach((voter) => {
        newEntities[voter.id] = voter;
      });
      return {
        ...state,
        status: 'idle',
        entities: newEntities,
      };
    }
    case 'voters/voterAdded': {
      const voter = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [voter.id]: voter,
        },
      };
    }
    case 'voters/voterUpdated': {
      // It's the same as voterAdded :)
      const voter = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [voter.id]: voter,
        },
      };
    }
    default:
      return state;
  }
};

// Action creators
const votersLoading = () => ({ type: 'voters/votersLoading' });

const votersLoaded = (voters) => ({
  type: 'voters/votersLoaded',
  payload: voters,
});

const voterAdded = (voter) => ({
  type: 'voters/voterAdded',
  payload: voter,
});

const voterUpdated = (voter) => ({
  type: 'voters/voterUpdated',
  payload: voter,
});

// Thunks
const getVoters = () => async (dispatch) => {
  dispatch(votersLoading());
  const response = await fetch('http://localhost:3001/voters');
  const voters = await response.json();
  dispatch(votersLoaded(voters));
};

const postNewVoter = (name) => async (dispatch) => {
  const newVoter = { name, vote: null };
  const response = await fetch('http://localhost:3001/voters', {
    method: 'POST',
    body: JSON.stringify(newVoter),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const voter = await response.json();
  dispatch(voterAdded(voter));
};

const patchVoter = (id, vote) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/voters/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ vote }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const voter = await response.json();
  dispatch(voterUpdated(voter));
};

// Selectors
const selectVoterEntities = (state) => state.voters.entities;

// Memoized selectors
const selectVoters = createSelector(selectVoterEntities, (entities) =>
  Object.values(entities)
);

const selectVotersCount = createSelector(selectVoters, (voters) => {
  const total = voters.length;
  const voted = voters.filter((voter) => voter.vote).length;
  return { total, voted };
});

const selectFilteredVoters = createSelector(
  selectVoters, // first input
  selectFilters, // second input
  (voters, filters) => {
    // output
    if (filters.status === VoteFilter.All) {
      return voters;
    }

    if (filters.status === VoteFilter.NotVoted) {
      return voters.filter((voter) => !voter.vote);
    }

    return voters.filter((voter) => voter.vote === filters.status);
  }
);

export {
  getVoters,
  postNewVoter,
  patchVoter,
  selectVoters,
  selectVotersCount,
  selectFilteredVoters,
};
export default votersReducer;
