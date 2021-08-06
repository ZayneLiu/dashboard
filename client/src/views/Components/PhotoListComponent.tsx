import { useEffect, useState } from "react";
import FileModel from "../../models/FileModel";
import { ObjectId } from "../../models/UserModel";
import "./PhotoListComponent.scss";

export default function PhotList(props: any) {
	const {
		_id,
		limit,
	}: { _id: ObjectId | undefined; limit: number | undefined } = props;
	const model = new FileModel();

	const [photos, setPhotos] = useState<string[]>();

	useEffect(() => {
		if (photos) return;

		model.getPhotos(_id!).then((user) => {
			if (!user.photos) setPhotos([]);
			else setPhotos(user.photos!);
		});
	});

	function getPhotos(): string[] {
		if (limit) return photos?.slice(0, limit)!;
		else return photos!;
	}
	// const { _id } = JSON.parse(
	//     sessionStorage.getItem("currentUser")!
	// ) as UserSchema;

	return (
		<>
			{getPhotos()?.map((item, index) => {
				return (
					<div className="image-wrapper" key={index}>
						<img src={`/image/${item}`} alt="" />
					</div>
				);
			})}
		</>
	);
}
