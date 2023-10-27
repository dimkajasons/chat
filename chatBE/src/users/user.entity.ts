import { compare, hash } from 'bcryptjs';
import {} from 'node:crypto';

export class User {
	private _userName: string;
	private _password: string;
	private _firstName?: string;
	private _lastName?: string;
	private _email?: string;

	constructor(userName: string, password: string) {
		this._userName = userName;
		this._password = password; // hash here
	}

	get userName(): string {
		return this._userName;
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
