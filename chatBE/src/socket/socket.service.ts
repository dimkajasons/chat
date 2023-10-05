import { ISocketService } from './socket.service.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { Server, Socket, Namespace } from 'socket.io';
import 'reflect-metadata';
import { SocketEvents } from './types';

const socketMessages = [];

const { CONNECTED, CONNECTION, DISCONNECTED, CHAT_MESSAGE, USER_CONNECTED, USER_DISCONNECTED } =
	SocketEvents;

@injectable()
export class SocketService implements ISocketService {
	socketInstance: Server;
	socketConnection: Socket;
	connectionsByTenant: Record<string, Namespace> = {};
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
	addNamespace: (userName: string) => void;

	initSocket(socketInstance: Server): void {
		this.socketInstance = socketInstance;
	}

	handleUserLogin(userName: string): void {
		this.connectionsByTenant[userName] = this.socketInstance.of(`/${userName}`);
		this.connectionsByTenant[userName].on(CONNECTION, (socket) => {
			this.logger.log(`[Socket] user ${userName} connected`);
			socket.on(DISCONNECTED, () => this.disconnect(userName));
			socket.on(CHAT_MESSAGE, this.chatMessage.bind(this));

			this.sendActiveUsers(socket, userName);
			this.notifyActiveUsers(userName);
		});
		this.logger.log('[Socket] Namespace created');
	}

	sendActiveUsers(socket: Socket, userName: string): void {
		socket.emit(CONNECTED, {
			activeUsers: Object.keys(this.connectionsByTenant)
				.filter((storedUserName) => userName !== storedUserName)
				.map((userName) => ({ userName })),
		});
	}

	notifyActiveUsers(userName: string): void {
		Object.keys(this.connectionsByTenant)
			.filter((tenant) => userName !== tenant)
			.forEach((tenant) => {
				this.connectionsByTenant[tenant].emit(USER_CONNECTED, { userName });
			});
	}

	disconnect(userName: string): void {
		this.logger.log('[Socket] user disconnected');
		delete this.connectionsByTenant[userName];
		Object.keys(this.connectionsByTenant).forEach((tenant) => {
			this.connectionsByTenant[tenant].emit(USER_DISCONNECTED, { userName });
		});
	}

	chatMessage(socketMessage: {
		userFrom: string;
		userTo: string;
		messageText: string;
		timeStamp: number;
		isMineMessage: boolean;
	}): void {
		this.logger.log(socketMessage);
		const { userTo, userFrom, messageText, timeStamp } = socketMessage;
		socketMessages.push(socketMessage);
		if (userTo === 'testUser1') {
			this.connectionsByTenant[userFrom].emit(CHAT_MESSAGE, {
				userFrom: userTo,
				userTo: userFrom,
				messageText: messageText.split('').reverse().join(''),
				timestamp: Date.now(),
			});
		} else {
			console.log(this.connectionsByTenant);
			const { isMineMessage, ...newSocketMessage } = socketMessage;
			this.connectionsByTenant[userTo].emit(CHAT_MESSAGE, newSocketMessage);
		}
	}
}
