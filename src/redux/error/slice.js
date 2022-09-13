import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    setError: (_, action) => {
      return action.payload;
    },
    unsetError: () => {
      return null;
    },
  },
});

export const { setError, unsetError } = slice.actions;
export default slice.reducer;
