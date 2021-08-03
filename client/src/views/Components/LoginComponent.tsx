import React from "react";
import { useHistory } from "react-router-dom";
import LoginBtnImg from "../../assets/Login_button.png";
import UserModel, { UserSchema } from "../../models/UserModel";

export function Login() {
	const history = useHistory();
	const model = new UserModel();

	const usernameRef = React.createRef<HTMLInputElement>();
	const passwordRef = React.createRef<HTMLInputElement>();

	function isLoginFormValid() {
		return (
			usernameRef.current?.checkValidity() &&
			passwordRef.current?.checkValidity()
		);
	}

	async function loginBtnOnClick() {
		if (!isLoginFormValid()) {
			alert("please provide correct login details");
			return;
		}

		// gather login info
		const loginInfo: UserSchema = {
			username: usernameRef.current?.value,
			password: passwordRef.current?.value,
		};
		// login
		const loginRes = await model.login(loginInfo);
		console.log(loginRes);
		// Login Result
		if (loginRes._id) {
			// set session storage
			sessionStorage.setItem("currentUser", JSON.stringify(loginRes));
			// login success
			// alert("login success!");
			// redirect
			history.push("/");
		} else {
			alert("login failed");
		}
	}

	function goToSignUp() {
		history.replace("/sign-up");
	}

	return (
		<div className="router-view login">
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
						ref={passwordRef}
						type="password"
						name="password"
						id="password"
						placeholder=" "
						required
					/>
					<label htmlFor="password">Password</label>
				</div>

				<div className="form-item">
					<button onClick={loginBtnOnClick}>
						<img src={LoginBtnImg} alt="login btn" />
					</button>
				</div>
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
