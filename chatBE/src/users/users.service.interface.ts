import { User } from './user.entity';
import { User as UserModel } from '.prisma/client';

export interface IUserService {
	createUser: (user: User) => Promise<UserModel | null>;
	validateUser: (user: User) => Promise<boolean>;
}
