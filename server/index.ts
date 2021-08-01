import express from "express";
import path from "path";
// rest of the code remains same
const app = express();
const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "client/build")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.join((__dirname = "client/build/index.html")));
// 	});
// }

app.get("/api", (req, res) => {
	res.send({ msg: "/" });
});

app.post("/api/auth/login", (req, res) => {});
app.post("/api/auth/register", (req, res) => {});

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
