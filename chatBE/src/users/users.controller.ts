import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserController } from './users.controller.interface';
import { User } from './user.entity';
import { ISocketService } from '../socket/socket.service.interface';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.SocketService) private socketService: ISocketService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/login',
				method: 'get',
				func: (): void => {
					console.log('login - get');
				},
			},
		]);
		// this.socketInstance = new SocketService(this.server);
		// this.socketService.initSocket(this.socketInstance);
	}

	async login(req: Request<{}, {}, User>, res: Response, next: NextFunction): Promise<void> {
		// const result = await this.userService.validateUser(req.body);
		// if (!result) {
		// 	return next(new HTTPError(401, 'authorisation error', 'login'));
		// }
		// const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
		this.loggerService.log('[User Controller], login user');
		this.socketService.addNamespace(req.body.name);
		this.ok(res, {});
	}

	// async register(
	// 	{ body }: Request<{}, {}, User>,
	// 	res: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	const result = await this.userService.createUser(body);
	// 	if (!result) {
	// 		return next(new HTTPError(422, 'Такой пользователь уже существует'));
	// 	}
	// 	this.ok(res, { email: result.email, id: result.id });
	// }

	private signJWT(email: string, secret: string): void {
		// return new Promise<string>((resolve, reject) => {
		// 	sign(
		// 		{
		// 			email,
		// 			iat: Math.floor(Date.now() / 1000),
		// 		},
		// 		secret,
		// 		{
		// 			algorithm: 'HS256',
		// 		},
		// 		(err, token) => {
		// 			if (err) {
		// 				reject(err);
		// 			}
		// 			resolve(token as string);
		// 		},
		// 	);
		// });
	}
}
