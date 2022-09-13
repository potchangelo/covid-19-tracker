import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  minConfirmed: 0,
  maxConfirmed: 500000000,
  inputName: '',
  inputMinConfirmed: 0,
  inputMaxConfirmed: 500000000,
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFiltersInputName: (state, action) => {
      state.inputName = action.payload;
    },
    setFiltersInputMinConfirmed: (state, action) => {
      state.inputMinConfirmed = action.payload;
    },
    setFiltersInputMaxConfirmed: (state, action) => {
      state.inputMaxConfirmed = action.payload;
    },
    setFilters: state => {
      state.name = state.inputName;
      state.minConfirmed = state.inputMinConfirmed;
      state.maxConfirmed = state.inputMaxConfirmed;
    },
    cancelFilters: state => {
      state.inputName = state.name;
      state.inputMinConfirmed = state.minConfirmed;
      state.inputMaxConfirmed = state.maxConfirmed;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setFiltersInputName, setFiltersInputMinConfirmed, setFiltersInputMaxConfirmed,
  setFilters, cancelFilters, resetFilters
} = slice.actions;
export default slice.reducer;
