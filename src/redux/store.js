import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters/slice';
import locationsReducer from './locations/slice';
import modalReducer from './modal/slice';
import errorReducer from './error/slice';

export default configureStore({
  reducer: {
    locations: locationsReducer,
    filters: filtersReducer,
    modal: modalReducer,
    error: errorReducer,
  },
});
