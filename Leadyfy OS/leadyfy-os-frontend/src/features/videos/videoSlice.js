import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, title: 'Launch Reel', stage: 'Review', owner: 'Northwind', approval: 'Pending' },
    { id: 2, title: 'Case Study', stage: 'Edit', owner: 'Bluewave', approval: 'Approved' },
  ],
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.items = action.payload;
    },
    updateVideo: (state, action) => {
      const index = state.items.findIndex((video) => video.id === action.payload.id);
      if (index >= 0) state.items[index] = action.payload;
    },
  },
});

export const { setVideos, updateVideo } = videoSlice.actions;
export default videoSlice.reducer;
