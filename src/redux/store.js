import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
// import thunkMiddleware from 'redux-thunk';

// thunkMiddleware is called by applyMiddleware to create an enhancer with all middlewares chained together
function thunkMiddleware(store) {
  // wrapDispatch is called to create a new dispatch function that wraps the dispatch function
  // next is either the next middleware or the store's "original" dispatch function
  return function wrapDispatch(next) {
    // actually handles the action dispatched by the component
    return function handleAction(action) {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
      }

      return next(action);
    };
  };
}

// const thunkMiddleware = (store) => (next) => (action) => {
//   // If the action is a function, call it and pass the dispatch and getState to it
//   if (typeof action === 'function') {
//     return action(store.dispatch, store.getState);
//   }

//   // If it's an object, ignore it and continiue the "middleware chain"
//   return next(action);
// };

const composedEnhancer = composeWithDevTools(
  // ...otherStoreEnhancers,
  applyMiddleware(thunkMiddleware) // returns an enhancer
);

const store = createStore(rootReducer, composedEnhancer);
export default store;
