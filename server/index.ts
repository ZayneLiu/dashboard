import express from "express";
import { json } from "body-parser";
import path from "path";
import { UserSchema } from "./src/models/UserModel";

// rest of the code remains same
const app = express();
const PORT = process.env.PORT || 5000;

app.use(json({ type: "application/json" }));
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api", (req, res) => {
	res.send({ msg: "/" });
});

// TODO: File upload

app.post("/api/register", (req, res) => {
	const data: UserSchema = req.body;
	const { _id, ...registerInfo } = data;
	// TODO:
	console.log(registerInfo);
});

app.post("/api/login", (req, res) => {
	const data: UserSchema = req.body;
	const { _id, username, profileImg, ...loginInfo } = data;
	// TODO:
	console.log(loginInfo);
});

// `catch-all` route to serve react app
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
