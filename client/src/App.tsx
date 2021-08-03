import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Auth } from "./views/Auth";
import { Home } from "./views/Home";
import { News } from "./views/News";
import { Sport } from "./views/Sport";
import { Photos } from "./views/Photos";
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

				<Route exact path="/">
					<Home></Home>
				</Route>

				<Route exact path="/news">
					<News></News>
				</Route>

				<Route exact path="/sport">
					<Sport></Sport>
				</Route>

				<Route exact path="/photos">
					<Photos></Photos>
				</Route>
			</Router>
		</div>
	);
}

export default App;
