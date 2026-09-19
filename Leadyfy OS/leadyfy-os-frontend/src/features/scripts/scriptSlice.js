import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, title: 'Brand Launch Script', status: 'Approved', owner: 'Marketing' },
    { id: 2, title: 'Campaign V2 Outline', status: 'Draft', owner: 'Content' },
  ],
};

const scriptSlice = createSlice({
  name: 'scripts',
  initialState,
  reducers: {
    setScripts: (state, action) => {
      state.items = action.payload;
    },
    addScript: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { setScripts, addScript } = scriptSlice.actions;
export default scriptSlice.reducer;
