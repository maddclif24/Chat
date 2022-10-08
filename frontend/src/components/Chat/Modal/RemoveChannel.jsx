/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import {
  Modal, Form, Button, CloseButton,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useChat from '../../../hooks/useChat.jsx';
import { actions as channelActions } from '../../../slices/channelSlice.js';
import { actions as viewActions } from '../../../slices/viewSlice.js';

// const socket = io('http://0.0.0.0:5001');

const RemoveChannel = ({
  show, close, id, setShow,
}) => {
  // console.log(id);
  const { t } = useTranslation();
  const dispacth = useDispatch();
  const { removeChannel } = useChat();
  const handleRemoveChannel = (e) => {
    e.preventDefault();
    /* socket.emit('removeChannel', { id });
    socket.on('removeChannel', (payload) => {
      dispacth(channelActions.removeChannel(payload));
      setShow(false);
      dispacth(viewActions.switchActiveChannel(1));
    });
    */
    removeChannel(id);
    close();
    toast.success(t('tostify.successRemove'));
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chatPage.channels.modalRemove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('chatPage.channels.modalRemove.body')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          {t('chatPage.channels.modalRemove.close')}
        </Button>
        <Button variant="danger" onClick={handleRemoveChannel}>
          {t('chatPage.channels.modalRemove.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RemoveChannel;
