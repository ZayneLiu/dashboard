import { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
import path, { resolve } from "path";

const router = Router();

router.post("/upload", fileUpload);
router.get("/image/:filename", getImage);

function getImage(req: Request, res: Response) {
	const filename = req.params["filename"];
	res.sendFile(resolve(__dirname + `../../../uploads/${filename}`));
}

async function fileUpload(req: Request, res: Response) {
	if (!req.files) res.json({ msg: "no file uploaded" });

	if (req.files!.image) {
		const img = req.files!.image as UploadedFile;
		// set the filename to the files md5 value
		const ext = path.extname(img.name).toLowerCase();
		img.name = `${img.md5}${ext}`;
		// move uploaded file to uploads directory
		await img.mv(resolve(`${__dirname}/../../uploads/${img.name}`));
		// send back the filename to client
		res.json({ image: img.name });
	}
}

export default router;
