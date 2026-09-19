import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'Northwind Labs', email: 'hello@northwind.io', status: 'Active', segment: 'Enterprise' },
    { id: 2, name: 'Bluewave Studio', email: 'team@bluewave.com', status: 'Pending', segment: 'Agency' },
  ],
};

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.items = action.payload;
    },
    addClient: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateClient: (state, action) => {
      const index = state.items.findIndex((client) => client.id === action.payload.id);
      if (index >= 0) state.items[index] = action.payload;
    },
    removeClient: (state, action) => {
      state.items = state.items.filter((client) => client.id !== action.payload);
    },
  },
});

export const { setClients, addClient, updateClient, removeClient } = clientSlice.actions;
export default clientSlice.reducer;
