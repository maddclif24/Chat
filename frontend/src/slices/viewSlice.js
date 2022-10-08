/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelSlice } from './channelSlice.js';

const initialState = {
  activeChannelId: null,
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setActiveChannelId: (state, actions) => {
      state.activeChannelId = actions.payload;
    },
    switchActiveChannel: (state, actions) => {
      console.log(actions);
      state.activeChannelId = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelSlice.removeChannel, (state, actions) => {
        state.activeChannelId = 1;
      });
  },
});
export const { actions } = viewSlice;
export default viewSlice.reducer;
