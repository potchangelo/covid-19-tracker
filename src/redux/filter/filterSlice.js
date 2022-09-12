import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  minConfirmed: 0,
  maxConfirmed: 500000000,
  tempName: '',
  tempMinConfirmed: 0,
  tempMaxConfirmed: 500000000,
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFiltersTempName: (state, action) => {
      state.tempName = action.payload.name;
    },
    setFiltersTempMinConfirmed: (state, action) => {
      state.tempMinConfirmed = action.payload.minConfirmed;
    },
    setFiltersTempMaxConfirmed: (state, action) => {
      state.tempMaxConfirmed = action.payload.maxConfirmed;
    },
    setFilters: state => {
      state.name = state.tempName;
      state.minConfirmed = state.tempMinConfirmed;
      state.maxConfirmed = state.tempMaxConfirmed;
    },
    cancelFilters: state => {
      state.tempName = state.name;
      state.tempMinConfirmed = state.minConfirmed;
      state.tempMaxConfirmed = state.maxConfirmed;
    },
    resetFilters: state => {
      state = initialState;
    },
  },
});

export const {
  setFiltersTempName, setFiltersTempMinConfirmed, setFiltersTempMaxConfirmed,
  setFilters, cancelFilters, resetFilters
} = slice.actions;
export default slice.reducer;
