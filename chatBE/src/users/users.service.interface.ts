import { User } from './user.entity';

export interface IUserService {
	createUser: (user: User) => Promise<User | null>;
}
