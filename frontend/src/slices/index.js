import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlices.js';
import channelSlice from './channelSlice.js';
import viewSlice from './viewSlice.js';
import messageSlice from './messageSlice.js';

export default configureStore({
  reducer: {
    data: dataReducer,
    channels: channelSlice,
    viewSlice,
    messages: messageSlice,
  },
});
