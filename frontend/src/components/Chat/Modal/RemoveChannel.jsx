/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { React } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useChat from '../../../hooks/useChat.jsx';

const RemoveChannel = ({ show, close, id }) => {
  const { t } = useTranslation();
  const { removeChannel } = useChat();
  const handleRemoveChannel = (e) => {
    e.preventDefault();
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
