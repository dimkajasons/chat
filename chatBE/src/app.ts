import express, { Express } from 'express';
import cors from 'cors';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { inject, injectable } from 'inversify';
import { json } from 'body-parser';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import 'reflect-metadata';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IConfigService } from './config/config.service.interface';
import { ISocketService } from './socket/socket.service.interface';
import { UserController } from './users/users.controller';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	socketInstance: SocketServer;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.SocketService) private socketService: ISocketService,
		@inject(TYPES.UserController) private userController: UserController,
	) {
		this.app = express();
		this.port = 3000;
	}

	useMiddleware(): void {
		this.app.use(json());
		this.app.use(
			cors({
				origin: this.configService.get('CORS_ORIGIN'),
			}),
		);
	}

	useSocketService(): void {
		this.socketInstance = new SocketServer(this.server);
		this.socketService.initSocket(this.socketInstance);
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/test', (req, res) => {
			res.send('ok');
		});
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();

		this.server = this.app.listen(this.port);

		this.useSocketService();

		// connect to db
		this.logger.log(`Server started at http://localhost:${this.port}`);
	}

	public close(): void {
		this.logger.log(`Server closed at http://localhost:${this.port}`);
		this.server.close();
	}
}
