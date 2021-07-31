import React, { useState } from "react";
import "./Auth.scss";

import { Login } from "./Components/LoginComponent";
import { SignUp } from "./Components/RegisterComponent";

export function Auth(props: any) {
	return props.isRegister ? SignUp() : Login();
}
