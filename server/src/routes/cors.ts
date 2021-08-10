import axios from "axios";
import { Router } from "express";

const router = Router();

router.get("/clothe/data/", async (req, res) => {
	const url =
		"https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil";

	const dataRes = await axios.get(url);

	res.json(dataRes.data);
});

export default router;
