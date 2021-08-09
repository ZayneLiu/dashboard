import Axios from "axios";
import { parse } from "fast-xml-parser";

import puppeteer from "puppeteer";

export async function getNewsFeed() {
	const res = await Axios("http://feeds.bbci.co.uk/news/rss.xml", {
		method: "GET",
		headers: {},
	});

	return parse(res.data).rss.channel.item;
}
export async function getNewsByUrl(url: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await Promise.all([
		// page.waitForNavigation(),
		page.goto(url, { waitUntil: "networkidle0" }),
		page.waitForNavigation(),
		page.waitForSelector("figure span img"),
	]);

	// @ts-ignore
	const imgUrl = await page.$eval("figure span img", (e) => e.src);
	// @ts-ignore
	const texts = (await page.$$eval(
		"[data-component='text-block'] p",
		// @ts-ignore
		(e) => e.map((item) => item.innerText)
	)) as string[];

	// console.log(texts);

	return {
		img: imgUrl,
		texts,
	};
}
