import { io } from 'socket.io-client';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const socket = io(BACKEND_URL, {
    autoConnect: false,
});

export const connectToSocket = () => {
    socket.auth = { token: sessionStorage.getItem('chatup_socket_token') };
    socket.connect();
}