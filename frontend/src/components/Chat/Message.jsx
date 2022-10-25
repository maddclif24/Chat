/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const { body, id, username } = message;
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :
      {' '}
      {body}
    </div>
  );
};
export default Message;
