import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import UserModel, { UserSchema } from "../models/UserModel";

const router = Router();
const model = new UserModel();

router.get("/api/tasks/:userId", async (req, res) => {
	const _id = new ObjectId(req.params["userId"]);

	const findRes = (await model.getTasks(_id)) as TaskSchema[];

	// TODO:
	res.json(findRes);
});

router.post("/api/tasks/:userId", async (req, res) => {
	const userId = new ObjectId(req.params["userId"]);

	// extract task content from json body
	const { task } = req.body as { task: string };

	const updateRes = await model.addTask(userId, task);

	res.json(updateRes);
});

router.delete("/api/tasks/:userId");

export default router;
