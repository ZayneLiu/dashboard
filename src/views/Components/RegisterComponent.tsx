import React, { useState } from "react";
import SignUpBtnImg from "../../assets/Register_button.png";
import AddPicImg from "../../assets/Add_picture.png";

export function SignUp() {
	const fileUploadRef = React.createRef<HTMLInputElement>();
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
	function signUpBtnOnClick() {
		if (!isFormValid()) {
			alert("please provide valid information");
			return;
		}
		// If form is valid
		// TODO: register
	}

	function addPictureOnClick() {
		fileUploadRef.current!.click();
	}

	function pictureUploadOnChange() {
		if (fileUploadRef.current!.files) {
			const reader = new FileReader();

			reader.readAsDataURL(fileUploadRef.current!.files[0]);

			reader.onload = () => {
				// Convert image file to BASE64 string.
				setSelectedImg(reader.result!.toString());
			};
		}
	}

	return (
		<div className="router-view sign-up">
			<p className="title">Hackathon</p>
			<div className="form">
				<div className="form-item">
					<input
						ref={usernameRef}
						type="text"
						name="username"
						id="username"
						placeholder=""
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
						placeholder=""
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
						placeholder=""
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
						placeholder=""
						required
					/>
					<label htmlFor="confirmPassword">Confirm Password</label>
				</div>

				<div className="form-item horizontal-fill">
					<div className="add-picture" onClick={addPictureOnClick}>
						<input
							ref={fileUploadRef}
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
