import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 101, client: 'Northwind Labs', status: 'In Progress', amount: '$2,400', due: 'Today' },
    { id: 102, client: 'Prime Media', status: 'Awaiting Review', amount: '$1,800', due: 'Tomorrow' },
  ],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
    addOrder: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.items.findIndex((order) => order.id === action.payload.id);
      if (index >= 0) state.items[index] = action.payload;
    },
  },
});

export const { setOrders, addOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
