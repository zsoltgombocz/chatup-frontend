import { io } from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(SOCKET_URL);

export const connectToSocket = () => {
    socket.disconnect();

    socket.auth = { token: sessionStorage.getItem('chatup_socket_token') };

    socket.connect();
}