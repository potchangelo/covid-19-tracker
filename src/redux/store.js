import { configureStore } from '@reduxjs/toolkit';

import errorReducer from './error/slice';
import filtersReducer from './filters/slice';
import locationsReducer from './locations/slice';
import modalReducer from './modal/slice';

export default configureStore({
  reducer: {
    locations: locationsReducer,
    filters: filtersReducer,
    modal: modalReducer,
    error: errorReducer,
  },
});
