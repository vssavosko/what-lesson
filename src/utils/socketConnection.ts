import io from 'socket.io-client';

export const socket: SocketIOClient.Socket = io('localhost:5000');
