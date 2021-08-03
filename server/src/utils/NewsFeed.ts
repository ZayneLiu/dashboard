import Axios from "axios";
import { parse } from "fast-xml-parser";

export async function getNewsFeed() {
	const res = await Axios("http://feeds.bbci.co.uk/news/rss.xml", {
		method: "GET",
		headers: {},
	});

	return parse(res.data).rss.channel.item;
}
export async function getNewsByUrl(url: string) {
	// TODO: web scraping

	const res = await Axios(url, {
		method: "GET",
		headers: {},
	});
	return res.data;
}
