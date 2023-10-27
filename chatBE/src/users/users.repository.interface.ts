import { User as UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	find: (userName: string) => Promise<UserModel | null>;
}
