import React, { createRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import AddPicture from "./../assets/Add_picture.png";
import AddButton from "./../assets/Plus_button.png";
import FileModel from "../models/FileModel";
import UserModel, { UserSchema } from "../models/UserModel";
import PhotoList from "./Components/PhotoListComponent";
import "./Photos.scss";

export function Photos(props: any) {
	const history = useHistory();
	const model = new FileModel();
	const userModel = new UserModel();

	const photoUploadRef = createRef<HTMLInputElement>();

	const [rand, setRand] = useState<number>(0);

	const { _id } = JSON.parse(
		sessionStorage.getItem("currentUser")!
	) as UserSchema;

	function uploadBtnOnclick() {
		photoUploadRef.current?.click();
	}

	async function photoUploadOnchange() {
		// console.log(photoUploadRef.current!.files![0]);
		const messageKey = "upload";
		message.loading({ content: "image uploading", key: messageKey });

		const img = photoUploadRef.current!.files![0];
		const image = await model.uploadFile(img);
		// console.log(image);

		message.success({ content: "uploaded", key: messageKey });

		// get existing photos
		let { photos } = await userModel.getUser({ _id });
		// initialize photos if is doesn't exist
		if (!photos) photos = [];
		// append newly added photo
		photos.push(image);
		// update user info
		await userModel.updateUser(_id!, { photos });

		setRand(Math.random() * 100);
		// setPhotos((await model.getPhotos(_id!)).photos);
	}

	return (
		<div className="photos-page router-view">
			<div className="title">Photos</div>
			<button
				onClick={() => {
					history.push("/");
				}}>
				Back to Dashboard
			</button>

			<div className="content">
				<PhotoList reRenderHandle={rand} _id={_id} />

				<div className="add-btn" onClick={uploadBtnOnclick}>
					<input
						ref={photoUploadRef}
						type="file"
						accept="image/*"
						name="new-picture"
						onChange={photoUploadOnchange}
					/>
					<img src={AddPicture} alt="" />
					<img className="add-btn-pic" src={AddButton} alt="" />
				</div>
			</div>
		</div>
	);
}
