import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Auth } from "./views/Auth";
import { Home } from "./views/Home";
import "./App.scss";

function App() {
	fetch("/api").then(async (res) => {
		console.log(await res.text());
	});

	return (
		<div className="App">
			<Router basename="/">
				{/* <Link to="/">Home</Link>
			<Link to="login">Login</Link> */}
				<Route exact path="/">
					<Home></Home>
				</Route>
				<Route exact path="/login">
					<Auth isRegister={false} />
				</Route>
				<Route exact path="/sign-up">
					<Auth isRegister={true} />
				</Route>
			</Router>
		</div>
	);
}

export default App;