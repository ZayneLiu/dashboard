import React from "react";
import { useHistory } from "react-router-dom";
import AddPicture from "./../assets/Add_picture.png";

export function Photos(props: any) {
	const history = useHistory();
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
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
				<img src={AddPicture} alt="" />
			</div>
		</div>
	);
}
