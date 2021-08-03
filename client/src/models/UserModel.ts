import { ObjectId } from "bson";
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
	public async register(user: UserSchema) {
		const { _id, ...registerInfo } = user;

		return (
			await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(registerInfo),
			})
		).json();
	}
	public async login(user: UserSchema) {
		const { _id, profileImg, email, ...loginInfo } = user;

		return (
			await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(loginInfo),
			})
		).json();
	}
	public async getUserProfile(user: UserSchema) {}
	public async deleteUser(user: UserSchema) {}
}

export { UserSchema, ObjectId };
