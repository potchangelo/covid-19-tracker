import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import locationReducer from './location/reducer';
import filterReducer from './filter/reducer';
import modalReducer from './modal/reducer';
import errorReducer from './error/reducer';

export default createStore(
  combineReducers({
    locationReducer,
    filterReducer,
    modalReducer,
    errorReducer,
  }),
  applyMiddleware(thunk)
);
