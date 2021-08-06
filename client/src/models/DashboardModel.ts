export class DashboardModel {
	public async getWeather(location: GeolocationPosition) {
		const { latitude, longitude } = location.coords;
		const key = "541e426aa47c6281aad333b4d7b0ba76";
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

		const res = await fetch(url);
		return res.json();
	}
	public async getNews() {
		const res = await fetch("/api/news");
		return res.json();
	}

	public async getSportData() {
		const res = await fetch("/api/sport");
		return res.json();
	}
}
