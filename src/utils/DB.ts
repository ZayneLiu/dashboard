import { MongoClient, ObjectId, Collection } from "mongodb";
import config from "../config.json";

export default class DB {
	private client!: MongoClient;
	private users!: Collection;

	constructor() {
		this.client = new MongoClient(
			Buffer.from(
				[config.z, config.a, config.y, config.n, config.e].join(),
				"base64"
			).toString("utf8")
		);
		// "mongodb+srv://z4yn3:ImnsxCLgRjYJczrT@cluster0.85gw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
		this.users = this.client.db("dashboard").collection("users");
	}

	public async setup() {
		await this.client.connect();
	}

	public async cleanup() {
		await this.client.close();
	}

	public insertUser(doc: any) {
		return this.users.insertOne(doc);
	}

	public findUser(filter: any) {
		return this.users.find(filter);
	}

	public updateUser(filter: any, doc: any) {
		return this.users.updateOne(filter, doc);
	}

	public deleteUser(filter: any) {
		return this.users.deleteOne(filter);
	}
}

export { ObjectId };
