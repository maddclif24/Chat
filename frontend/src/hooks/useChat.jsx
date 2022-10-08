import { useContext } from 'react';
import { SocketContext } from '../contexts/socket.jsx';

const useChat = () => useContext(SocketContext);

export default useChat;
