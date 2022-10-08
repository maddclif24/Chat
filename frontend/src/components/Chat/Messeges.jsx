/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message.jsx';
import { selectors as messageSelectors } from '../../slices/messageSlice.js';

const Messeges = () => {
  const activeChannel = useSelector(({ viewSlice }) => viewSlice.activeChannelId);
  const messages = useSelector(messageSelectors.selectAll).filter(({ channelId }) => channelId === activeChannel);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map((message) => <Message key={message.id} message={message} />)}
    </div>
  );
};
export default Messeges;
