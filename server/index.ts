import express from "express";
import { json } from "body-parser";
import path from "path";
import fileupload from "express-fileupload";

import { getSportData } from "./src/utils/SportData";
import { getNewsByUrl, getNewsFeed } from "./src/utils/NewsFeed";

import corsRoutes from "./src/routes/cors";
import userRoutes from "./src/routes/user";
import fileRoutes from "./src/routes/file";
import authRoutes from "./src/routes/auth";
import taskRoutes from "./src/routes/task";
import UserModel from "./src/models/UserModel";

const app = express();
const PORT = process.env.PORT || 5000;
export const model = new UserModel();

// middleware
app.use(json({ type: "application/json" }));
app.use(
	fileupload({
		useTempFiles: true,
		tempFileDir: "/tmp",
		createParentPath: true,
	})
);
app.use(express.static(path.join(__dirname, "../client/build")));

app.use((req, res, next) => {
	console.log(`${req.method} - ${req.url}`);
	next();
});

// routes
app.use(userRoutes);
app.use(fileRoutes);
app.use(authRoutes);
app.use(taskRoutes);
app.use(corsRoutes);

app.get("/api/sport", async (req, res) => res.json(await getSportData("")));
app.get("/api/news", async (req, res) => res.json(await getNewsFeed()));

app.get("/api/news/:newsUrl", async (req, res) => {
	const url = Buffer.from(req.params["newsUrl"], "base64").toString("utf-8");

	res.json(await getNewsByUrl(url));
});

// `catch-all` route to serve react app
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// connect to db
model.setup().then(() => {
	// start server
	app.listen(PORT, () => {
		console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
	});
});
