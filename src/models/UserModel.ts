import DB, { ObjectId } from "./../utils/DB";

class UserSchema {
	public _id?: ObjectId;
	public username?: string;
	public email?: string;
	/**TODO: password hash, rather than plain text*/
	public password?: string;
	/**image files in BASE64 encoding*/
	public profileImg?: string;
}

export default class UserModel {
	constructor() {
		this.db = new DB();
	}

	public db!: DB;

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

		await this.db.insertUser({ ...user });
	}

	public async login(user: UserSchema) {
		const { _id, username, ...loginInfo } = user;

		const res = await this.db.findUser(loginInfo);

		console.log(await res.toArray());
	}

	public async deleteUser(user: UserSchema) {
		const { _id, ...userInfo } = user;

		await this.db.deleteUser(userInfo);
	}
}

export { UserSchema };
