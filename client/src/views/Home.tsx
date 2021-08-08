import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { DashboardModel } from "../models/DashboardModel";
import { UserSchema } from "../models/UserModel";
import PhotoList from "./Components/PhotoListComponent";
import { TaskList } from "./Components/TaskListComponent";

import "./Home.scss";

export function Home() {
	const history = useHistory();

	if (!sessionStorage.getItem("currentUser")) history.push("/login");

	let currentUser = JSON.parse(
		sessionStorage.getItem("currentUser")!
	) as UserSchema;

	const model = new DashboardModel();

	const [weatherRetrieved, setWeather] = useState<{
		name: string;
		main: any;
		weather: any;
	}>({
		name: "loading",
		main: { temp: "loading" },
		weather: { main: "loading" },
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
	const [weatherIconUrl, setWeatherIconUrl] = useState<string>();

	useEffect(() => {
		if (weatherRetrieved.name !== "loading") return;

		let mounted = true;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(location: GeolocationPosition) =>
					model.getWeather(location).then((json) => {
						const { name, main, weather } = json;

						if (weatherRetrieved.name === "loading") {
							if (!mounted) return;
							setWeather({ name, main, weather });

							// unpack and assemble open weather icon url
							setWeatherIconUrl(
								`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
							);
							console.log(weatherIconUrl);
						}
					})
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}

		return () => {
			mounted = false;
		};
	});

	useEffect(() => {
		if (news.title !== "loading") return;

		model.getNews().then((json) => {
			setNews(json[0]);
		});
	});

	function logout() {
		sessionStorage.removeItem("currentUser");
		history.push("/login");
	}

	function goTo(route: string) {
		history.push(`${route}`);
	}

	return (
		<div className="router-view dashboard">
			<div className="header">
				<div className="profileImg">
					<img
						src={`/image/${currentUser ? currentUser.profileImg : ""}`}
						alt=""
					/>
				</div>
				<h1>Good day {currentUser ? currentUser.username : ""}</h1>
				<button onClick={logout}>Logout</button>
			</div>
			<main>
				<div className="dashboard-item">
					<h2 className="title">Weather</h2>
					<div className="content">
						<div>
							{/* get icon from open weather API */}
							<img src={weatherIconUrl} alt="" />
							<div className="temperature">
								{weatherRetrieved?.main.temp} &deg;C
							</div>
						</div>
						<div className="city-name">{weatherRetrieved?.name}</div>
					</div>
				</div>

				<div className="dashboard-item">
					<h2 className="title" onClick={() => goTo("/news")}>
						News <span style={{ fontSize: 12 }}>[click]</span>
					</h2>
					<div className="content">
						<p className="headline">{news.title}</p>
						<p className="description"> {news.description}</p>
					</div>
				</div>

				<div className="dashboard-item">
					<h2 className="title" onClick={() => goTo("/sport")}>
						Sport <span style={{ fontSize: 12 }}>[click]</span>
					</h2>
					<div className="content">
						<h4>Sport headline</h4>
					</div>
				</div>

				<div className="dashboard-item ">
					<h2 className="title" onClick={() => goTo("/photos")}>
						Photos <span style={{ fontSize: 12 }}>[click]</span>
					</h2>

					<div className="content photos">
						<PhotoList _id={currentUser?._id} limit={6}></PhotoList>
					</div>
				</div>
				<div className="dashboard-item">
					<h2 className="title" onClick={() => goTo("/tasks")}>
						Tasks <span style={{ fontSize: 12 }}>[click]</span>
					</h2>
					<div className="content">
						<TaskList />
					</div>
				</div>
				<div className="dashboard-item">
					<h2 className="title">
						Clothes <span style={{ fontSize: 12 }}>[click]</span>
					</h2>
					<div className="content"></div>
				</div>
			</main>
		</div>
	);
}
