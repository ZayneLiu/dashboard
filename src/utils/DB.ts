import { MongoClient, ObjectId, Collection } from "mongodb";
import config from "../../config.json";

export default class DB {
	private client!: MongoClient;
	private users!: Collection;

	constructor() {
		this.client = new MongoClient(
			Buffer.from(
				[config.z, config.a, config.y, config.n, config.e].join(),
				"base64"
			).toString("utf-8")
		);
		this.users = this.client.db("dashboard").collection("users");
	}

	public async setup() {
		await this.client.connect();
	}

	public async cleanup() {
		await this.client.close();
	}

	public async insertUser(doc: any) {
		return await this.users.insertOne(doc);
	}

	public async findUser(filter: any) {
		return this.users.find(filter);
	}

	public async updateUser(filter: any, doc: any) {
		return await this.users.updateOne(filter, doc);
	}

	public async deleteUser(filter: any) {
		return await this.users.deleteOne(filter);
	}
}

export { ObjectId };
