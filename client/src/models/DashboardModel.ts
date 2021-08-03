export class DashboardModel {
	public async getNews() {
		const res = await fetch("/api/news", {
			method: "GET",
			headers: {},
		});
		return await res.json();
	}
}
