import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import 'reflect-metadata';

const users = [];

@injectable()
export class UserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	async createUser(user: User): Promise<User | null> {
		// const newUser = new User(email, name);
		// const salt = this.configService.get('SALT');
		// await newUser.setPassword(password, Number(salt));
		// if (existedUser) {
		// 	return null;
		// }
		users.push(user);
		return user;
	}
}
