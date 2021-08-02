import express from "express";
import { json } from "body-parser";
import path from "path";
import UserModel, { UserSchema } from "./src/models/UserModel";

// rest of the code remains same
const app = express();
const PORT = process.env.PORT || 5000;

app.use(json({ type: "application/json" }));
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api", (req, res) => {
	res.send({ msg: "/" });
});

const model = new UserModel();

// TODO: File upload

app.post("/api/register", async (req, res) => {
	const data: UserSchema = req.body;
	const { _id, ...registerInfo } = data;

	// TODO: check duplicates accounts

	await model.setup();
	const insertRes = await model.register(registerInfo);
	await model.cleanup();

	res.json(insertRes);
});

app.post("/api/login", async (req, res) => {
	const data: UserSchema = req.body;
	const { _id, email, profileImg, ...loginInfo } = data;
	// TODO:
	await model.setup();
	const loginRes = await model.login(loginInfo);
	await model.cleanup();
	console.log(loginInfo);

	res.json(loginRes);
});

// `catch-all` route to serve react app
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
