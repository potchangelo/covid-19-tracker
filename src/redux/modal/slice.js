import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: {
    name: null
  },
  reducers: {
    setModal: (state, action) => {
      state.name = action.payload.name;
    },
    unsetModal: state => {
      state.name = null;
    },
  },
});

export const { setModal, unsetModal } = slice.actions;
export default slice.reducer;
