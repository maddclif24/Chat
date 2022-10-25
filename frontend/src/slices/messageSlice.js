/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelSlice.js';

const messageAdapter = createEntityAdapter();

const initialState = messageAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessages: (state, actions) => {
      const { entities, ids } = actions.payload;
      state.entities = entities;
      state.ids = ids;
    },
    addNewMessage: messageAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.removeChannel, (state, actions) => {
        console.log(actions);
        const { id } = actions.payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== id);
        messageAdapter.setAll(state, restEntities);
      });
  },
});
export const selectors = messageAdapter.getSelectors((state) => state.messages);
export const { actions } = messageSlice;
export default messageSlice.reducer;
