import React from "react";
import { useHistory } from "react-router-dom";

export function Home() {
	const history = useHistory();

	const currentUser = sessionStorage.getItem("currentUser");
	console.log(currentUser);
	// redirect to login page if no current user in session storage
	if (!currentUser) history.push("/login");

	// useEffect(() => {});

	return (
		<div className="router-view ">
			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer">
				Learn React
			</a>
		</div>
	);
}
