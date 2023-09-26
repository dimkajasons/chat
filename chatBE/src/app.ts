import express, { Express } from 'express';
import cors from 'cors';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { json } from 'body-parser';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import 'reflect-metadata';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IConfigService } from './config/config.service.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
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

	useRoutes(): void {
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
		// connect to db
		this.logger.log(`Server started at http://localhost:${this.port}`);
	}

	public close(): void {
		this.logger.log(`Server closed at http://localhost:${this.port}`);
		this.server.close();
	}
}
