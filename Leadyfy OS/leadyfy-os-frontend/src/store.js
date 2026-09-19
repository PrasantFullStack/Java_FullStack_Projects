import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import clientReducer from './features/clients/clientSlice';
import orderReducer from './features/orders/orderSlice';
import scriptReducer from './features/scripts/scriptSlice';
import creatorReducer from './features/creators/creatorSlice';
import shootReducer from './features/shoots/shootSlice';
import videoReducer from './features/videos/videoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    orders: orderReducer,
    scripts: scriptReducer,
    creators: creatorReducer,
    shoots: shootReducer,
    videos: videoReducer,
  },
});

export default store;
