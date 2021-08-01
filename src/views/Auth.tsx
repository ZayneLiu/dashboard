import { Login } from "./Components/LoginComponent";
import { SignUp } from "./Components/RegisterComponent";
import "./Auth.scss";

export function Auth(props: any) {
	return props.isRegister ? SignUp() : Login();
}
