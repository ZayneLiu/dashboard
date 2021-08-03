import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.scss";

import CloudsIcon from "../assets/Clouds_icon.png";

export function Home() {
	const history = useHistory();

	const currentUser = sessionStorage.getItem("currentUser");
	console.log(currentUser);
	// redirect to login page if no current user in session storage
	if (!currentUser) history.push("/login");

	const [weather, setWeather] = useState<{ name: string; main: any }>({
		name: "loading",
		main: { temp: "loading" },
	});

	useEffect(() => {
		if (weather.name !== "loading") return;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(location: GeolocationPosition) => {
					console.log(location);

					getWeather(location);
				}
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	});

	function getWeather(location: GeolocationPosition) {
		const { latitude, longitude } = location.coords;
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=541e426aa47c6281aad333b4d7b0ba76`,
			{
				method: "GET",
				headers: {},
			}
		).then((response) => {
			console.log("api");
			console.log(weather);

			response.json().then((json) => {
				const { name, main } = json;
				console.log(json);

				if (weather.name === "loading") {
					console.log(name);
					setWeather({ name, main });
				}
			});
		});
	}

	function getUsername() {
		if (!currentUser) return;
		return JSON.parse(sessionStorage.getItem("currentUser")!).username;
	}

	return (
		<div className="router-view dashboard">
			<div className="header">
				<img src="https://via.placeholder.com/100" alt="" />
				<h1>Good day {getUsername()}</h1>
				<button>Logout</button>
			</div>
			<main>
				<div className="dashboard-item">
					<h2 className="dashboard-item_title">Weather</h2>
					<div className="content">
						<div>
							<img src={CloudsIcon} alt="" />
							<div className="temperature">{weather?.main.temp} &deg;C</div>
						</div>
						<div className="city-name">{weather?.name}</div>
					</div>
				</div>
			</main>
		</div>
	);
}
