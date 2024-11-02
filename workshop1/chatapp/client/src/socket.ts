import { io } from 'socket.io-client';
const URL = 'http://127.0.0.1:3000';
export const socket = io(URL);
