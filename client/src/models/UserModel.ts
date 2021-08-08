import { ObjectId } from "bson";
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
	public async register(user: UserSchema, img: File) {
		const { _id, ...registerInfo } = user;

		const formData = new FormData();
		formData.append("image", img);

		const res = await fetch("/upload", {
			method: "POST",
			body: formData,
		});

		const { image } = await res.json();

		registerInfo.profileImg = image;

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

	public async getUser(user: UserSchema) {
		const res = await fetch(`/api/user/${user._id}`);
		return (await res.json()) as UserSchema;
	}
	public async deleteUser(user: UserSchema) {}

	public async updateUser(_id: ObjectId, user: UserSchema) {
		const updateRes = await fetch(`/api/user/${_id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return (await updateRes.json()) as UserSchema;
	}

	public async addTask(userId: ObjectId, task: string) {
		await fetch(`/api/tasks/${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ task }),
		});
	}

	public async updateTask(taskId: ObjectId, task: TaskSchema) {
		console.log(taskId, task);
		const res = await fetch(`/api/task/${taskId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(task),
		});

		return res.json();
	}
	public async getTasks(userId: ObjectId) {
		const res = await fetch(`/api/tasks/${userId}`);
		return res;
	}
	public async deleteTask() {}
}

export { UserSchema, ObjectId, TaskSchema };
