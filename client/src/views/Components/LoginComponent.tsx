import { useHistory } from "react-router-dom";
import LoginBtnImg from "../../assets/Login_button.png";

export function Login() {
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
					<img src={LoginBtnImg} alt="login btn" />
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
