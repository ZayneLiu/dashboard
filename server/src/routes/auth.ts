import { Request, Response, Router } from "express";
import UserModel, { UserSchema } from "../models/UserModel";

const router = Router();
const model = new UserModel();

router.post("/api/register", register);
router.post("/api/login", login);

async function register(req: Request, res: Response) {
	const data: UserSchema = req.body;
	const { _id, ...registerInfo } = data;
	// TODO: check duplicates accounts
	await model.setup();
	const insertRes = await model.register(registerInfo);
	await model.cleanup();

	res.json(insertRes);
}

async function login(req: Request, res: Response) {
	const data: UserSchema = req.body;
	const { _id, email, profileImg, ...loginInfo } = data;

	await model.setup();
	const loginRes = await model.login(loginInfo);
	await model.cleanup();

	res.json(loginRes);
}

export default router;
