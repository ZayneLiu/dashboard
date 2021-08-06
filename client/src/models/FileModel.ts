import { ObjectId } from "bson";
import { UserSchema } from "./UserModel";

export default class FileModel {
	public async uploadFile(img: any) {
		// upload image
		const formData = new FormData();
		formData.append("image", img);

		const res = await fetch("/upload", {
			method: "POST",
			body: formData,
		});

		const { image } = (await res.json()) as { image: string };
		return image;
	}

	public async getPhotos(_id: ObjectId) {
		console.log(_id);

		const res = await fetch(`/api/user/${_id}`);

		return (await res.json()) as UserSchema;
	}
}
