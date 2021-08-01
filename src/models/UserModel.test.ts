import UserModel, { UserSchema } from "./UserModel";

const model = new UserModel();

beforeEach(async () => {
	await model.setup();
});

afterEach(async () => {
	await model.cleanup();
});

test("[UserModel] registration", async () => {
	const user: UserSchema = {
		username: "test_username",
		email: "tes_email",
		password: "test_password",
	};

	await model.register(user);
	await model.deleteUser(user);

	// expect(sum(1, 2)).toBe(3);
});

test("[UserModel] login", async () => {
	const user: UserSchema = {
		email: "tes_email",
		password: "test_password",
	};

	await model.login(user);
	// expect(sum(1, 2)).toBe(3);
});
