import React, { useState } from "react";
import SignUpBtnImg from "../../assets/Register_button.png";
import AddPicImg from "../../assets/Add_picture.png";
// import UserModel, { UserSchema } from "./../../models/UserModel";

export function SignUp() {
	// setup DB access
	// const model = new UserModel();

	const profileImgRef = React.createRef<HTMLInputElement>();
	const usernameRef = React.createRef<HTMLInputElement>();
	const emailRef = React.createRef<HTMLInputElement>();
	const passwordRef = React.createRef<HTMLInputElement>();
	const confirmPasswordRef = React.createRef<HTMLInputElement>();

	let [selectedImg, setSelectedImg] = useState("");

	/**
	 * form validation
	 * */
	function isFormValid() {
		let isValid = true;
		[usernameRef, emailRef, passwordRef, confirmPasswordRef].forEach(
			(field) => {
				if (field.current!.checkValidity()) {
					field.current!.classList.add("valid");
					field.current!.classList.remove("invalid");
				} else {
					isValid = false;
					field.current!.classList.add("invalid");
					field.current!.classList.remove("valid");
				}
			}
		);

		return isValid;
	}

	/**
	 * Register button onClick
	 */
	async function signUpBtnOnClick() {
		// validate form
		if (!isFormValid()) {
			alert("please provide valid information");
			return;
		}
		// validate confirm password
		if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
			alert("please make sure passwords match");
			return;
		}

		// TODO: register
		// gather user info
		// const user: UserSchema = {
		// 	username: usernameRef.current!.value,
		// 	email: emailRef.current?.value,
		// 	password: passwordRef.current?.value,
		// 	profileImg: profileImgRef.current?.value,
		// };

		// model.setup();
		// const res = (await model.register(user)).insertedId;

		// const insertedUser = await model.findUser({ _id: res });
		// console.log(insertedUser);

		// model.cleanup();
	}

	function addPictureOnClick() {
		profileImgRef.current!.click();
	}

	function pictureUploadOnChange() {
		if (profileImgRef.current!.files) {
			const reader = new FileReader();

			reader.readAsDataURL(profileImgRef.current!.files[0]);

			reader.onload = () => {
				// Convert image file to BASE64 string.
				setSelectedImg(reader.result!.toString());
			};
		}
	}

	return (
		<div className="router-view sign-up">
			<div className="form">
				<p className="title">Hackathon</p>
				<div className="form-item">
					<input
						ref={usernameRef}
						type="text"
						name="username"
						id="username"
						placeholder=" "
						required
					/>
					<label htmlFor="username">Username</label>
				</div>

				<div className="spacer" />

				<div className="form-item">
					<input
						ref={emailRef}
						type="email"
						name="email"
						id="email"
						placeholder=" "
						required
					/>
					<label htmlFor="email">Email</label>
				</div>

				<div className="form-item">
					<input
						ref={passwordRef}
						type="password"
						name="password"
						id="password"
						placeholder=" "
						required
					/>
					<label htmlFor="password">Password</label>
				</div>

				<div className="spacer" />

				<div className="form-item">
					<input
						ref={confirmPasswordRef}
						type="password"
						name="confirmPassword"
						id="confirm-password"
						placeholder=" "
						required
					/>
					<label htmlFor="confirmPassword">Confirm Password</label>
				</div>

				<div className="form-item horizontal-fill">
					<div className="add-picture" onClick={addPictureOnClick}>
						<input
							ref={profileImgRef}
							onChange={pictureUploadOnChange}
							type="file"
							accept="image/*"
							id="add-picture"
							required
						/>

						<img src={AddPicImg} alt="add_picture_btn" />
						<span>Add Picture</span>

						<img src={selectedImg} alt="" />
					</div>
				</div>

				<button onClick={signUpBtnOnClick}>
					<img src={SignUpBtnImg} alt="register_btn" />
				</button>
			</div>
		</div>
	);
}
