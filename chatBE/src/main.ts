import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { ISocketService } from './socket/socket.service.interface';
import { SocketService } from './socket/socket.service';
import { UserService } from './users/users.service';
import { IUserService } from './users/users.service.interface';
import { IUserController } from './users/users.controller.interface';
import { UserController } from './users/users.controller';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<ISocketService>(TYPES.SocketService).to(SocketService).inSingletonScope();
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
