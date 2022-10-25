/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { actions as viewActions } from '../../slices/viewSlice.js';
import RenameChannel from './Modal/RenameChannel.jsx';
import RemoveChannel from './Modal/RemoveChannel.jsx';

const Channel = ({ channel, user }) => {
  const [isShowRename, setShowRename] = useState(false);
  const [isShowRemove, setShowRemove] = useState(false);
  const handleClick = () => setShowRename(true);

  const handleClose = () => setShowRename(false);

  const handleClickRemove = () => setShowRemove(true);

  const handleCloseRemove = () => setShowRemove(false);

  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.viewSlice.activeChannelId);
  const cnButton = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    activeChannel === channel.id ? 'btn-secondary' : '',
  );

  const { t } = useTranslation();

  const button = (
    <button
      type="button"
      id={channel.id}
      onClick={() => dispatch(viewActions.switchActiveChannel(Number(channel.id)))}
      className={cnButton}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );

  const dropDown = (
    <Dropdown as={ButtonGroup}>
      {button}

      <Dropdown.Toggle
        split
        variant="outline-secondary"
        id="dropdown-split-basic"
      >
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={handleClickRemove}>
          {t('chatPage.channels.modalRemove.name')}
        </Dropdown.Item>
        {isShowRemove ? (
          <RemoveChannel
            show={isShowRemove}
            setShow={setShowRemove}
            id={button.props.id}
            close={handleCloseRemove}
          />
        ) : null}
        <Dropdown.Item href="#" onClick={handleClick}>
          {t('chatPage.channels.modalRename.name')}
        </Dropdown.Item>
        {isShowRename ? (
          <RenameChannel
            show={isShowRename}
            setShow={setShowRename}
            id={button.props.id}
            close={handleClose}
          />
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  );
  return channel.removable ? dropDown : button;
};
export default Channel;
