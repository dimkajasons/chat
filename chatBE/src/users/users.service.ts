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
	async createUser({ name, password }: any): Promise<UserModel | null> {
		const newUser = new User(name, password);
		await newUser.setPassword(password);
		const existedUser = await this.usersRepository.find(name);
		if (existedUser) {
			return null;
		}
		const createdUser = await this.usersRepository.create(newUser);
		return createdUser;
	}
	async validateUser({ name, password }: User): Promise<boolean> {
		const existedUser = await this.usersRepository.find(name);
		if (!existedUser) {
			return false;
		}
		return true;
		// const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
		// return newUser.comparePassword(password);
	}
}
