import io from 'socket.io-client';

import { host } from './hostCheck';

export const socket: SocketIOClient.Socket = io(host());
