import React from "react";
import { useHistory } from "react-router-dom";

export function Home() {
	const history = useHistory();

	const currentUser = sessionStorage.getItem("currentUser");
	console.log(currentUser);
	// redirect to login page if no current user in session storage
	if (!currentUser) history.push("/login");

	// useEffect(() => {});
	function getUsername() {
		return JSON.parse(sessionStorage.getItem("currentUser")!).username;
	}

	return (
		<div className="router-view ">
			<h1>Good day {getUsername()}</h1>
		</div>
	);
}
