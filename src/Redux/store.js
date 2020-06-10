import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import locationReducer from './Location/reducer';
import filterReducer from './Filter/reducer';

export default createStore(
    combineReducers({locationReducer, filterReducer}),
    applyMiddleware(thunk)
);