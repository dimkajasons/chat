import { ISocketService } from './socket.service.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { Server, Socket } from 'socket.io';
import 'reflect-metadata';

const messages = [];

@injectable()
export class SocketService implements ISocketService {
	socketInstance: Server;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	initSocket(socketInstance: Server): void {
		this.socketInstance = socketInstance;
		socketInstance.on('connection', (socket) => {
			this.logger.log('[Socket] user connected');
			socket.on('disconnect', this.disconnect.bind(this));
			socket.on('chat-message', (message) => this.chatMessage(message, socket));
		});
	}

	disconnect(): void {
		this.logger.log('[Socket] user disconnected');
	}

	chatMessage(message: string, socket: Socket): void {
		this.logger.log(message);
		messages.push(message);
		socket.emit('send-message');
	}
}
