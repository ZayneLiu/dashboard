import DB, { ObjectId } from "./../utils/DB";

class UserSchema {
	public _id?: ObjectId;
	public username?: string;
	public email?: string;
	/**TODO: password hash, rather than plain text*/
	public password?: string;
	/**image file name after upload*/
	public profileImg?: string;
	public photos?: string[];
	public tasks?: ObjectId[];
}

class TaskSchema {
	public _id?: ObjectId;
	public task?: string;
	public completed?: boolean;
}

export default class UserModel {
	constructor() {
		this.db = new DB();
	}

	private db!: DB;

	public async setup() {
		await this.db.setup();
	}

	public async cleanup() {
		await this.db.cleanup();
	}

	public async register(user: UserSchema) {
		// TODO: duplicate username or email verification
		// this.db.find({ username: user.username });
		// this.db.find({ email: user.email });
		const { _id, ...registerInfo } = user;

		const res = await this.db.insertUser(registerInfo);
		return res;
	}

	public async login(user: UserSchema): Promise<UserSchema | null> {
		const { _id, email, profileImg, ...loginInfo } = user;

		const res = await this.db.findUser(loginInfo);

		if (res) {
			// record match, login successful
			const { password, ...restUserInfo } = res[0];
			return restUserInfo;
		}
		// Invalid username / password
		else return null;
	}

	public async findUser(user: UserSchema) {
		return this.db.findUser(user);
	}

	public async updateUser(_id: ObjectId, user: UserSchema) {
		return (await this.db.updateUser({ _id }, { $set: { ...user } }))
			.modifiedCount;
	}
	public async deleteUser(user: UserSchema): Promise<number> {
		const { _id, ...userInfo } = user;

		return (await this.db.deleteUser(userInfo)).deletedCount;
	}
}

export { UserSchema };
