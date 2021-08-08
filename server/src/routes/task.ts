import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import UserModel, { TaskSchema, UserSchema } from "../models/UserModel";

const router = Router();
const model = new UserModel();

// get all tasks for user
router.get("/api/tasks/:userId", async (req, res) => {
	const _id = new ObjectId(req.params["userId"]);

	const findRes = (await model.getTasks(_id)) as TaskSchema[];

	// TODO:
	res.json(findRes);
});

// add task to user
router.post("/api/tasks/:userId", async (req, res) => {
	const userId = new ObjectId(req.params["userId"]);

	// extract task content from json body
	const { task } = req.body as { task: string };

	const updateRes = await model.addTask(userId, task);

	res.json(updateRes);
});

// update task
router.post("/api/task/:taskId", async (req, res) => {
	const taskId = new ObjectId(req.params["taskId"]);
	const { _id, ...updateInfo } = req.body as TaskSchema;

	const updateRes = await model.updateTask(taskId, updateInfo);

	res.json(await model.findTask(taskId));
});

router.delete("/api/task/:taskId");

export default router;
