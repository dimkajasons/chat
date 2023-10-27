import { compare, hash } from 'bcryptjs';
import {} from 'node:crypto';

export class User {
	private _password: string;
	private _name: string;

	constructor(name: string, password?: string) {
		this._name = name;
		if (password) {
			this._password = password;
		}
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt?: number): Promise<void> {
		// this._password = await hash(pass, salt);
		this._password = pass;
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
