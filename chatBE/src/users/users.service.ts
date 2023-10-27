import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { User as UserModel } from '.prisma/client';
import 'reflect-metadata';
import { DatabaseService } from '../database/database.service';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ userName, password }: User): Promise<UserModel | null> {
		// hash password here
		const newUser = new User(userName, password);
		const existedUser = await this.usersRepository.find(userName);
		if (existedUser) {
			return null;
		}
		const createdUser = await this.usersRepository.create(newUser);
		return createdUser;
	}
	async validateUser({ userName, password }: User): Promise<boolean> {
		const existedUser = await this.usersRepository.find(userName);
		if (!existedUser) {
			return false;
		}
		return true;
	}
}
