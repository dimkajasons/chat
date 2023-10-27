import { PrismaClient, User } from '@prisma/client';
import util from 'util';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class DatabaseService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();

			this.logger.log('[Database Service] Connected to Database');
		} catch (error: any) {
			this.logger.error('[Database Service] Connection to Database failed ' + error.message);
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
