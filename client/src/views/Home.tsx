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
	const [news, setNews] = useState<{
		title: string;
		description: string;
		link: string;
	}>({
		title: "loading",
		description: "",
		link: "",
	});

	useEffect(() => {
		if (weather.name !== "loading") return;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(location: GeolocationPosition) => getWeather(location)
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	});

	useEffect(() => {
		if (news.title !== "loading") return;

		getNews();
	});

	function getWeather(location: GeolocationPosition) {
		const { latitude, longitude } = location.coords;
		const key = "541e426aa47c6281aad333b4d7b0ba76";
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

		fetch(url).then((response) => {
			response.json().then((json) => {
				const { name, main } = json;

				if (weather.name === "loading") {
					setWeather({ name, main });
				}
			});
		});
	}

	function getNews() {
		fetch("/api/news", {
			method: "GET",
			headers: {},
		}).then((response) => {
			response.json().then((json) => {
				setNews(json[0]);
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
				<div className="dashboard-item">
					<h2 className="dashboard-item_title">News</h2>
					<div className="content">
						<h4>News headline</h4>
						<p>{news.title}</p>
						<a href={news.link}>
							<i> link to headline</i>
						</a>
					</div>
				</div>
			</main>
		</div>
	);
}
