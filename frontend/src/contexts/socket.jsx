/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { actions as messageAction } from '../slices/messageSlice.js';
import { actions as channelAction } from '../slices/channelSlice.js';
import { actions as viewAction } from '../slices/viewSlice.js';

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  socket.on('newMessage', (payload) => {
    console.log(payload);
    dispatch(messageAction.addNewMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelAction.addNewChannel(payload));
    dispatch(viewAction.switchActiveChannel(payload.id));
  });

  socket.on('renameChannel', (payload) => {
    const { id } = payload;
    dispatch(channelAction.renameChannel({ id, changes: { ...payload } }));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelAction.removeChannel(payload));
  });

  const newChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status !== 'ok') {
      toast.error(t('tostify.errors.connection'));
    }
  });
  const newMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      toast.error(t('tostify.errors.connection'));
    }
  });
  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      toast.error(t('tostify.errors.connection'));
    }
  });
  const renameChannel = (channel) => socket.emit('renameChannel', channel, (response) => {
    if (response.status !== 'ok') {
      toast.error(t('tostify.errors.connection'));
    }
  });

  const socketHandles = {
    newMessage,
    newChannel,
    removeChannel,
    renameChannel,
  };

  return (
    <SocketContext.Provider value={socketHandles}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
