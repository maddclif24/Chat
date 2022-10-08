import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlices.js';
import loginReducer from './loginSlice.js';
import channelSlice from './channelSlice.js';
import viewSlice from './viewSlice.js';
import messageSlice from './messageSlice.js';

export default configureStore({
  reducer: {
    data: dataReducer,
    userCurrent: loginReducer,
    channels: channelSlice,
    viewSlice,
    messages: messageSlice,
  },
});
console.log(configureStore({
  reducer: {
    data: dataReducer,
    userCurrent: loginReducer,
    channels: channelSlice,
    viewSlice,
    messages: messageSlice,
  },
}).getState());
