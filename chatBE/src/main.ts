import express from 'express';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';

// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// app.use(
// 	cors({
// 		origin: 'http://127.0.0.1:5173',
// 	}),
// );

// app.get("/", (req, res) => {
//     res.sendFile(new URL("./index.html", import.meta.url).pathname);
// });

// io.on('connection', (socket) => {
// 	console.log('a user connected');
// 	socket.on('disconnect', () => {
// 		console.log('user disconnected');
// 	});
// 	socket.on('chat-message', (message) => {
// 		console.log(message);
// 	});
// });

// server.listen(3000, () => {
// 	console.log('server running at http://localhost:3000');
// });

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService);
	bind<App>(TYPES.Application).to(App);
});

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
