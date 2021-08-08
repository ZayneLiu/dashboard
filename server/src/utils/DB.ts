import { MongoClient, ObjectId, Collection } from "mongodb";
import config from "../config.json";

export default class DB {
	private client!: MongoClient;
	private users!: Collection;
	private tasks!: Collection;

	constructor() {
		this.client = new MongoClient(
			Buffer.from(
				[config.z, config.a, config.y, config.n, config.e].join(),
				"base64"
			).toString("utf8")
		);
		this.users = this.client.db("dashboard").collection("users");
		this.tasks = this.client.db("dashboard").collection("tasks");
	}

	public setup = async () => await this.client.connect();
	public cleanup = async () => await this.client.close();

	public insertUser(doc: any) {
		return this.users.insertOne(doc);
	}
	public findUser(filter: any) {
		return this.users.findOne(filter, {});
	}
	public updateUser(filter: any, doc: any) {
		return this.users.updateOne(filter, doc);
	}
	public deleteUser(filter: any) {
		return this.users.deleteOne(filter);
	}

	public insertTask(doc: any) {
		return this.tasks.insertOne(doc);
	}
	public findTask(filter: any) {
		return this.tasks.findOne(filter, {});
	}
	public updateTask(filter: any, doc: any) {
		return this.tasks.updateOne(filter, doc);
	}
	public deleteTask(filter: any) {
		return this.tasks.deleteOne(filter);
	}
}

export { ObjectId };
