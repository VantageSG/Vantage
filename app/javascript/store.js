import { createStore, applyMiddleware, compose } from "redux";
//import thunk from "redux-thunk";
import createPromise from "redux-promise-middleware";
import createLogger from "redux-logger";
import rootReducer from "./redux/reducers/rootReducer.js";


const middleware = [createPromise, createLogger];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

/* Some notes */
// actions dispatch to reducer
// ACTIONS ------> Reducer
//  |                 |
// UI       <----- State

/* Reducer */
// Reducers are pure functions and basically switch statements
// takes in current state and an action
// switches on the type of actions and then return a new state
// Action specifies what is happening, reducer specifies what happens to the state

/* Action */
// each action js object with a type
// action has the type, dispatch to store in state (then reducer specifies what happens to state)
// state returns new state object to UI
// network callbacks dont directly write to state (state is read only)
// always get new state object back
// only required proprety on an action is type

/* store */
// redux object
// single source of truth

// store = Redux.createStore(counter, state)
// counter here is a reducer that the store takes in . so if u want start with x = 0, intialise inside the counter reducer
// dispatch actions live in the store
// each time an action is dispatched, the state changes

// for multiple reducer, use state.reducer1 / state.reducer2 to access the correct reducer in the state

//BEST PRACTICE
// 1. dont pass initial state to reducer -> in reducer, check if state exist
// initialise state inside reducer
// e.g if (typeof state === 'undefined') {
//       return state...
//       }
// 2. dont hardcode values, use reducers to return initial values
// four main methods
// createStore
// getState
// dispatch
// subscribe

//JS IS PASSED BY REFERENCE NOT VALUE
// use Object.assign() to keep immutability

/*middleware */
// sit between action call and action reaching reducer
// logger to give nicely formatted logging
// redux- thunk to deal with async calls

// promise state from promise
// pending
// fufiled
// rejected
