import express from "express";
import { json } from "body-parser";
import path from "path";
import UserModel, { UserSchema } from "./src/models/UserModel";
import { getSportData } from "./src/utils/SportData";
import { getNewsFeed } from "./src/utils/NewsFeed";
import { getNewsByUrl, getNewsFeed } from "./src/utils/NewsFeed";

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

	res.json(loginRes);
});

app.get("/api/sport", async (req, res) => {
	res.json(await getSportData(""));
});

app.get("/api/news", async (req, res) => {
	res.json(await getNewsFeed());
});

app.get("/api/news/:newsId", async (req, res) => {
	const url = Buffer.from(req.params["newsId"], "base64").toString("utf-8");
	res.json(await getNewsByUrl(url));
});

// `catch-all` route to serve react app
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
