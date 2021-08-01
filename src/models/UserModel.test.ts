import UserModel, { UserSchema } from "./UserModel";

const model = new UserModel();

test("[UserModel] registration", async () => {
	const user: UserSchema = {
		username: "test_username",
		email: "tes_email",
		password: "test_password",
	};

	await model.setup();

	await model.register(user);
	await model.deleteUser(user);

	await model.cleanup();
	// expect(sum(1, 2)).toBe(3);
});

test("[UserModel] login", async () => {
	const user: UserSchema = {
		email: "tes_email",
		password: "test_password",
	};

	await model.setup();

	await model.login(user);

	await model.cleanup();
	// expect(sum(1, 2)).toBe(3);
});
