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
	public setup = async () => await this.db.setup();
	public cleanup = async () => await this.db.cleanup();

	public async register(user: UserSchema) {
		// TODO: duplicate username or email verification
		// this.db.find({ username: user.username });
		// this.db.find({ email: user.email });
		const { _id, ...registerInfo } = user;
		// await this.setup();
		const res = await this.db.insertUser(registerInfo);
		// await this.cleanup();
		return res;
	}

	public async login(user: UserSchema): Promise<UserSchema | null> {
		const { _id, email, profileImg, ...loginInfo } = user;
		// await this.setup();
		const res = (await this.db.findUser(loginInfo)) as UserSchema;
		// await this.cleanup();

		if (res) {
			// record match, login successful
			const { password, ...restUserInfo } = res;
			return restUserInfo;
		}
		// Invalid username / password
		else return null;
	}

	public async findUser(user: UserSchema) {
		// await this.setup();
		const res = await this.db.findUser(user);
		// await this.cleanup();
		return res;
	}

	public async updateUser(_id: ObjectId, user: UserSchema) {
		// await this.setup();
		const res = (await this.db.updateUser({ _id }, { $set: { ...user } }))
			.modifiedCount;
		// await this.cleanup();
		return res;
	}
	public async deleteUser(user: UserSchema): Promise<number> {
		const { _id, ...userInfo } = user;

		// await this.setup();
		const res = (await this.db.deleteUser(userInfo)).deletedCount;
		// await this.cleanup();
		return res;
	}

	public async getTasks(userId: ObjectId) {
		let tasks: TaskSchema[] = [];

		// await this.setup();
		const userRes = (await this.db.findUser({ _id: userId })) as UserSchema;

		if (userRes.tasks) {
			for (const key in userRes.tasks) {
				const taskId = userRes.tasks[key];
				const task = (await this.db.findTask({ _id: taskId })) as TaskSchema;
				tasks.push(task);
			}
		}
		// await this.cleanup();

		return tasks;
	}

	public async findTask(taskId: ObjectId) {
		// await this.setup();
		const findRes = await this.db.findTask({ _id: taskId });
		// await this.cleanup();

		return findRes;
	}

	public async addTask(userId: ObjectId, task: string) {
		// await this.setup();
		// add new task
		const taskInsertRes = await this.db.insertTask({ task, completed: false });
		console.log("task added");

		// get tasks for specific user
		let { tasks } = (await this.db.findUser({ _id: userId })) as UserSchema;
		// init tasks if it doesn't exist on user yet
		if (!tasks) tasks = [];
		// push new task into user's tasks
		tasks.push(taskInsertRes.insertedId);

		const updateRes = await this.db.updateUser(
			{ _id: userId },
			{ $set: { tasks } }
		);
		// await this.cleanup();

		return updateRes;
	}
	public async updateTask(taskId: ObjectId, doc: TaskSchema) {
		// await this.setup();
		const res = await this.db.updateTask({ _id: taskId }, { $set: { ...doc } });
		// await this.cleanup();
		return res;
	}
	public async deleteTask(taskId: ObjectId) {
		// await this.setup();
		const res = await this.db.deleteTask({ _id: taskId });
		// await this.cleanup();
		return res;
	}
}

export { UserSchema, TaskSchema };
