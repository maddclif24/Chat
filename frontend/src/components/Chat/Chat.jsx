/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import routes from '../../routes';
import useAuth from '../../hooks/index.jsx';

import { actions as channelActions } from '../../slices/channelSlice.js';
import { actions as viewActions } from '../../slices/viewSlice.js';
import { actions as messageSlice } from '../../slices/messageSlice.js';

import InputChat from './FormChat.jsx';
import Messeges from './Messeges.jsx';
import HeaderChatList from './HeaderChat.jsx';
import ChannelList from './ChannelLIst.jsx';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const channelSchema = new schema.Entity('channels');
  const messageSchema = new schema.Entity('messages');

  /* const getNormalalized = (data) => {
    const shema = new schema.Entity('channels');
    const message = new schema.Entity('messages');

    const normalizedData = normalize(data, [message]);

    return normalizedData;
  };
  */
  const getNormalalized = (data) => {
    const entities = data.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    const ids = data.map((item) => item.id);
    return { entities, ids };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem('user', 'token'));
        const { data } = await axios.get(routes.dataPath(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const channels = getNormalalized(data.channels);
        const messages = getNormalalized(data.messages);
        dispatch(channelActions.addChannels(channels));
        dispatch(viewActions.setActiveChannelId(data.currentChannelId));
        dispatch(messageSlice.addMessages(messages));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelList />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <HeaderChatList />
            <Messeges />
            <InputChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
