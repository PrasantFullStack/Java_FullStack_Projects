import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, title: 'Sunset Reel', date: '2026-09-25', location: 'Studio 3', status: 'Scheduled' },
    { id: 2, title: 'Campaign Interview', date: '2026-09-28', location: 'Warehouse', status: 'Pending' },
  ],
};

const shootSlice = createSlice({
  name: 'shoots',
  initialState,
  reducers: {
    setShoots: (state, action) => {
      state.items = action.payload;
    },
    addShoot: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { setShoots, addShoot } = shootSlice.actions;
export default shootSlice.reducer;
