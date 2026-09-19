import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'Ava Morgan', specialty: 'Brand Storytelling', availability: 'Available' },
    { id: 2, name: 'Nolan Reed', specialty: 'Commercial Directing', availability: 'Booked' },
  ],
};

const creatorSlice = createSlice({
  name: 'creators',
  initialState,
  reducers: {
    setCreators: (state, action) => {
      state.items = action.payload;
    },
    addCreator: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { setCreators, addCreator } = creatorSlice.actions;
export default creatorSlice.reducer;
