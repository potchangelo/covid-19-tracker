import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import locationReducer from './Location/reducer';
import filterReducer from './Filter/reducer';
import modalReducer from './Modal/reducer';

export default createStore(
    combineReducers({ locationReducer, filterReducer, modalReducer }),
    applyMiddleware(thunk)
);