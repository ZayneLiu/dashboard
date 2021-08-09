import puppeteer from "puppeteer";

test("web scraping", async () => {
	const URL = "https://www.bbc.co.uk/news/science-environment-58141129";

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	page.goto(URL);

	console.log(page.$$("figure span img"));
});

export {};
