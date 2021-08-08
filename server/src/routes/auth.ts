import { Request, Response, Router } from "express";
import UserModel, { UserSchema } from "../models/UserModel";
import { model } from "../../index";

const router = Router();

router.post("/api/register", register);
router.post("/api/login", login);

async function register(req: Request, res: Response) {
	const data: UserSchema = req.body;
	const { _id, ...registerInfo } = data;
	// TODO: check duplicates accounts
	const insertRes = await model.register(registerInfo);

	res.json(insertRes);
}

async function login(req: Request, res: Response) {
	const data: UserSchema = req.body;
	const { _id, email, profileImg, ...loginInfo } = data;

	const loginRes = await model.login(loginInfo);

	res.json(loginRes);
}

export default router;
