import { User } from './user.entity';
import { User as UserModel } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { DatabaseService } from '../database/database.service';

@injectable()
export class UsersRepository {
	constructor(@inject(TYPES.DatabaseService) private databaseService: DatabaseService) {}

	async create({ password, userName }: User): Promise<UserModel> {
		return this.databaseService.client.user.create({
			data: {
				id: uuidv4(),
				userName,
				password,
			},
		});
	}

	async find(userName: string): Promise<UserModel | null> {
		return this.databaseService.client.user.findFirst({
			where: {
				userName,
			},
		});
	}
}
