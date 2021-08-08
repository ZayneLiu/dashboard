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
		if (photos || !_id) return;

		let mounted = true;
		model.getPhotos(_id!).then((user) => {
			if (!mounted) return;
			if (!user.photos) setPhotos([]);
			else setPhotos(user.photos!);
		});

		return () => {
			mounted = false;
		};
	});

	function getPhotos(): string[] {
		if (limit) return photos?.slice(0, limit)!;
		else return photos!;
	}

	return (
		<>
			{getPhotos()?.length === 0 && limit ? (
				<div>
					<br />
					<br />
					No photos yet, please upload
				</div>
			) : (
				""
			)}
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
