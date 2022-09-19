import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: null,
  reducers: {
    setModal: (_, action) => {
      return action.payload;
    },
    unsetModal: () => {
      return null;
    },
  },
});

export const { setModal, unsetModal } = slice.actions;
export default slice.reducer;
