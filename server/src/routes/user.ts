import { timeLog } from "console";
import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import UserModel, { UserSchema } from "../models/UserModel";

const router = Router();

const model = new UserModel();

router.get("/api/user/:userId", getUserById);
router.post("/api/user/:userId", updateUser);

async function getUserById(req: Request, res: Response) {
	const _id = new ObjectId(req.params["userId"]);

	const user = (await model.findUser({ _id })) as UserSchema;

	const { password, ...userInfo } = user;

	res.json(userInfo);
}

async function updateUser(req: Request, res: Response) {
	const _id = new ObjectId(req.params["userId"]);
	const data: UserSchema = req.body;

	const updateRes = await model.updateUser(_id, data);
	const user = (await model.findUser({ _id })) as UserSchema;

	const { password, ...userInfo } = user;

	res.json(userInfo);
}

export default router;
