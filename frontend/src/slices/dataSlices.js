/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';

import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// Чтобы не хардкодить урлы, делаем модуль, в котором они создаются
import routes from '../routes.js';

// Создаем Thunk
export const fetchGetData = createAsyncThunk(
  'data/fetchGetData', // отображается в dev tools и должно быть уникально у каждого Thunk
  async () => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const { token } = JSON.parse(localStorage.getItem('user', 'token'));
    // const token = localStorage.getItem('user', 'token');
    // 'Authorization': `token ${access_token}`
    const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
    console.log(response);
    return response.data;
  },
);

export const loginUser = createAsyncThunk(
  'data/loginUser',
  async (values) => {
    const { data } = await axios.post(routes.loginPath(), values);
    return data;
  },
);

const dataAdapter = createEntityAdapter();

const dataSlice = createSlice({
  name: 'data',
  // Добавляем в состояние отслеживание процесса загрузки
  // { ids: [], entities: {}, loading: 'idle', error: null }
  initialState: dataAdapter.getInitialState({ loading: 'idle', error: null }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.fulfilled, (state, action) => {
        console.log(action);
        dataAdapter.addMany(state, action.payload);
      });
  },
});
export const { actions } = dataSlice;
export default dataSlice.reducer;
