import { useHistory } from "react-router-dom";
import LoginBtnImg from "../../assets/Login_button.png";
import UserModel from "../../models/UserModel";

export function Login() {
	const history = useHistory();
	const model = new UserModel();

	function loginBtnOnClick() {
		// TODO: login
		model.login({ email: "a", password: "a" });
		// TODO: Login Result
		// TODO: report
		// TODO: redirect
	}

	function goToSignUp() {
		history.replace("/sign-up");
	}

	return (
		<div className="router-view login">
			<div className="form">
				<p className="title">Hackathon</p>
				<div className="form-item">
					<input type="text" name="username" id="username" placeholder=" " />
					<label htmlFor="username">Username</label>
				</div>

				<div className="spacer" />

				<div className="form-item">
					<input
						type="password"
						name="password"
						id="password"
						placeholder=" "
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
