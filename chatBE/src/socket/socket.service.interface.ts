import { Server } from 'socket.io';

export interface ISocketService {
	initSocket: (socketInstance: Server) => void;
	handleUserLogin: (userName: string) => void;
}
