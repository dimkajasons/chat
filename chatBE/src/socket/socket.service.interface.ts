import { Server } from 'socket.io';

export interface ISocketService {
	initSocket: (socketInstance: Server) => void;
	addNamespace: (userName: string) => void;
}
