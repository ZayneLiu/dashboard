import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Auth } from "./views/Auth";
import { Home } from "./views/Home";
import "./App.scss";

function App() {
	return (
		<div className="App">
			<Router basename="/">
				<Route exact path="/login">
					<Auth isRegister={false} />
				</Route>

				<Route exact path="/sign-up">
					<Auth isRegister={true} />
				</Route>

				<Route path="/">
					<Home></Home>
				</Route>
			</Router>
		</div>
	);
}

export default App;
