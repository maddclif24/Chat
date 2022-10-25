/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// Чтобы не хардкодить урлы, делаем модуль, в котором они создаются
import routes from '../routes.js';

const channelAdapter = createEntityAdapter();

const channelSlice = createSlice({
  name: 'channel',
  // Добавляем в состояние отслеживание процесса загрузки
  // { ids: [], entities: {}, loading: 'idle', error: null, currentChannelId: null }
  initialState: channelAdapter.getInitialState(),
  reducers: {
    addChannels: (state, actions) => {
      const { entities, ids } = actions.payload;
      state.entities = entities;
      state.ids = ids;
    },
    addNewChannel: channelAdapter.addOne,
    renameChannel: channelAdapter.updateOne,
    removeChannel: (state, { payload }) => channelAdapter.removeOne(state, payload.id),
  },
});
export const selectors = channelAdapter.getSelectors((state) => state.channels);
export const { actions } = channelSlice;
export default channelSlice.reducer;
