/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import cn from 'classnames';
import {
  Modal,
  Form,
  Button,
  CloseButton,
  FloatingLabel,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  selectors as channelSelectors,
  actions as channelActions,
} from '../../../slices/channelSlice.js';
import { actions as viewActions } from '../../../slices/viewSlice.js';
import useChat from '../../../hooks/useChat.jsx';

// const socket = io();

const AddChannel = ({ show, close }) => {
  const dispacth = useDispatch();

  const channels = useSelector(channelSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20)
      .notOneOf(channelsNames, 'Должен быть уникальным'),
  });
  const { t } = useTranslation();

  const { newChannel } = useChat();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelSchema,
    onSubmit: (values) => {
      const { username } = JSON.parse(localStorage.getItem('user'));
      const channel = { name: values.name.trim(), username };
      newChannel(channel);
      /* socket.emit('newChannel', channel);
      socket.on('newChannel', (payload) => {
        dispacth(viewActions.switchActiveChannel(payload.id));
        dispacth(channelActions.addNewChannel(payload));
      });
      */
      close();
      toast.success(t('tostify.successAdd'));
    },
  });

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{t('chatPage.channels.modalAdd.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} id="ChannelSubmit">
            <Form.Group className="mb-3" controlId="name">
              <FloatingLabel
                controlId="name"
                label="Имя канала"
                className="visually-hidden"
              />

              <Form.Control
                type="text"
                autoFocus
                name="name"
                required
                onChange={formik.handleChange}
                value={formik.values.name}
                className={cn(
                  'form-control',
                  formik.errors.name ? 'is-invalid' : 'valid',
                )}
              />
              {formik.errors?.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} variant="secondary">
            {t('chatPage.channels.modalAdd.close')}
          </Button>
          <Button type="submit" form="ChannelSubmit" variant="primary">
            {t('chatPage.channels.modalAdd.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddChannel;
