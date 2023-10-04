import { ISocketService } from './socket.service.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { Server, Socket, Namespace } from 'socket.io';
import 'reflect-metadata';

const socketMessages = [];

@injectable()
export class SocketService implements ISocketService {
	socketInstance: Server;
	socketConnection: Socket;
	connectionsByTenant: Record<string, Namespace> = {};
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	initSocket(socketInstance: Server): void {
		this.socketInstance = socketInstance;
		// socketInstance.on('connection', (socket) => {
		// 	this.socketConnection = socket;
		// 	this.logger.log('[Socket] user connected');
		// 	socket.on('disconnect', this.disconnect.bind(this));
		// 	socket.on('chat-message', this.chatMessage.bind(this));
		// });
	}

	addNamespace(userName: string): void {
		this.connectionsByTenant[userName] = this.socketInstance.of(`/${userName}`);
		this.connectionsByTenant[userName].on('connection', (socket) => {
			this.logger.log(`[Socket] user ${userName} connected`);
			socket.on('disconnect', () => this.disconnect(userName));
			socket.on('chat-message', this.chatMessage.bind(this));
			socket.emit('connected', {
				activeUsers: Object.keys(this.connectionsByTenant)
					.filter((storedUserName) => userName !== storedUserName)
					.map((userName) => ({ userName })),
			});
			Object.keys(this.connectionsByTenant)
				.filter((tenant) => userName !== tenant)
				.forEach((tenant) => {
					this.connectionsByTenant[tenant].emit('user-connected', { userName });
				});
		});
		this.connectionsByTenant[userName].on('chat-message', this.chatMessage.bind(this));
		this.logger.log('[Socket] Namespace created');
		// this.socketConnection.emit('user-connected', { userName });
	}

	disconnect(userName: string): void {
		this.logger.log('[Socket] user disconnected');
		delete this.connectionsByTenant[userName];
	}

	chatMessage(socketMessage: { fromUserName: string; toUserName: string; text: string }): void {
		this.logger.log(socketMessage);
		const { toUserName } = socketMessage;
		socketMessages.push(socketMessage);
		this.connectionsByTenant[toUserName].emit('chat-message', socketMessage);
	}
}
