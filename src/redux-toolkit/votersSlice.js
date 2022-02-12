import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { VoteFilter, selectFilters } from './filterSlice';

// encapsulates the logic of having normalized entities by ids
const todosAdapter = createEntityAdapter();

// Initial state
const initialState = todosAdapter.getInitialState({
  status: 'idle',
  // entities: {}, not needed, because of todosAdapter
});

const votersSlice = createSlice({
  name: 'voters',
  initialState,
  reducers: {},
  // All thunk reducers are defined inside extraReducers
  // Each one has pending/fulfilled/rejected actions
  extraReducers: (builder) => {
    builder.addCase(getVoters.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getVoters.fulfilled, (state, action) => {
      state.status = 'idle';
      todosAdapter.setAll(state, action.payload);
    });
    builder.addCase(postNewVoter.fulfilled, (state, action) => {
      todosAdapter.addOne(state, action.payload);
    });
    builder.addCase(patchVoter.fulfilled, (state, action) => {
      todosAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
  },
});

// Thunks
const getVoters = createAsyncThunk('todos/getVoters', async () => {
  const response = await fetch('http://localhost:3001/voters');
  const voters = await response.json();
  return voters;
});

const postNewVoter = createAsyncThunk('todos/postNewVoter', async (name) => {
  const newVoter = { name, vote: null };
  const response = await fetch('http://localhost:3001/voters', {
    method: 'POST',
    body: JSON.stringify(newVoter),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const voter = await response.json();
  return voter;
});

const patchVoter = createAsyncThunk(
  'todos/patchVoter',
  // A thunk created this way always gets one parameter, so we must pass it as an object
  async ({ id, vote }) => {
    const response = await fetch(`http://localhost:3001/voters/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ vote }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const voter = await response.json();
    return voter;
  }
);

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

export default votersSlice.reducer;
