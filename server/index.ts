import express from "express";
import { json } from "body-parser";
import path from "path";
import fileupload, { UploadedFile } from "express-fileupload";

import UserModel, { UserSchema } from "./src/models/UserModel";
import { getSportData } from "./src/utils/SportData";
import { getNewsByUrl, getNewsFeed } from "./src/utils/NewsFeed";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(json({ type: "application/json" }));
app.use(
	fileupload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
		createParentPath: true,
	})
);
app.use(express.static(path.join(__dirname, "../client/build")));

// models
const model = new UserModel();

// routes
app.get("/image/:filename", (req, res) => {
	const filename = req.params["filename"];
	res.sendFile(__dirname + `/uploads/${filename}`);
});

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

app.post("/upload", async (req, res) => {
	const uploadPath = __dirname + "/uploads/";

	if (!req.files) {
		res.json({ msg: "no file uploaded" });
	}

	if (req.files!.profileImg) {
		const img = req.files!.profileImg as UploadedFile;

		// set the filename to the files md5 value
		const ext = path.extname(img.name).toLowerCase();
		img.name = `${img.md5}${ext}`;

		// move uploaded file to uploads directory
		await img.mv(uploadPath + img.name);

		// send back the filename to client
		res.json({ profileImg: img.name });
		return;
	}

	res.json({ msg: "no file uploaded" });
});

// `catch-all` route to serve react app
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// start server
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
