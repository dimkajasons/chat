import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserController } from './users.controller.interface';
import { User } from './user.entity';
import { ISocketService } from '../socket/socket.service.interface';
import 'reflect-metadata';
import { IUserService } from './users.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { sign } from 'jsonwebtoken';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.SocketService) private socketService: ISocketService,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
		]);
		// this.socketInstance = new SocketService(this.server);
		// this.socketService.initSocket(this.socketInstance);
	}

	async login(req: Request<{}, {}, User>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, 'authorisation error', 'login'));
		}
		const jwt = await this.signJWT(req.body.userName);
		this.loggerService.log('[User Controller], login user');
		this.socketService.handleUserLogin(req.body.userName);
		res.set('Authorization', `Bearer ${jwt}`);
		this.ok(res, { jwt });
	}

	async register(
		{ body }: Request<{}, {}, User>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'User already exist'));
		}
		this.ok(res, { userName: result.userName, id: result.id });
	}

	private signJWT(email: string, secret = 'qwe'): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
