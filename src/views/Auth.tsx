import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Auth.scss";
import LoginBtnImg from "../assets/Login_button.png";
import SignUpBtnImg from "../assets/Register_button.png";
import AddPicImg from "../assets/Add_picture.png";

export function Auth(props: any) {
	return props.isRegister ? SignUp() : Login();
}

function Login() {
	const history = useHistory();

	function loginBtnOnClick() {
		console.log(1);
	}

	function goToSignUp() {
		history.replace("/sign-up");
	}

	return (
		<div className="router-view login">
			<p className="title">Hackathon</p>
			<div className="form">
				<div className="form-item">
					<input type="text" name="username" id="username" placeholder="" />
					<label htmlFor="username">Username</label>
				</div>

				<div className="spacer" />

				<div className="form-item">
					<input type="password" name="password" id="password" placeholder="" />
					<label htmlFor="password">Password</label>
				</div>

				<button onClick={loginBtnOnClick}>
					<img src={LoginBtnImg} />
				</button>
			</div>

			<div className="footer">
				New to hackathon?{" "}
				<span onClick={goToSignUp} className="register">
					Sign up
				</span>
			</div>
		</div>
	);
}

function SignUp() {
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

						<img src={AddPicImg} />
						<span>Add Picture</span>

						<img src={selectedImg} />
					</div>
				</div>

				<button onClick={signUpBtnOnClick}>
					<img src={SignUpBtnImg} />
				</button>
			</div>
		</div>
	);
}
