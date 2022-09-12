// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import locationReducer from './location/reducer';
// import filterReducer from './filter/reducer';
// import modalReducer from './modal/reducer';
// import errorReducer from './error/reducer';

// export default createStore(
//   combineReducers({
//     locationReducer,
//     filterReducer,
//     modalReducer,
//     errorReducer,
//   }),
//   applyMiddleware(thunk)
// );

import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters/slice';
import locationsReducer from './locations/slice';
import modalReducer from './modal/slice';

export default configureStore({
  reducer: {
    locations: locationsReducer,
    filters: filtersReducer,
    modal: modalReducer
  }
});
