import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DashboardModel } from "./../models/DashboardModel";

import "./News.scss";
export function News(props: any) {
	const history = useHistory();
	const model = new DashboardModel();

	const [news, setNews] = useState<{
		title: string;
		description: string;
		link: string;
		pubDate: string;
	}>();

	useEffect(() => {
		if (news) return;

		model.getNews().then((json) => {
			setNews(json[0]);
		});
	});

	// useEffect(() => {
	// 	if (!news) return;

	// 	// TODO: get news detail
	// 	// fetch(`/api/news/${Buffer.from(news.link).toString("base64")}`).then(
	// 	// 	(res) => {
	// 	// 		console.log(res.body);
	// 	// 	}
	// 	// );
	// });

	return (
		<div className="news-page router-view">
			<h2 className="title">News</h2>
			<p className="headline">{news?.title}</p>
			<p className="description">{news?.description}</p>
			<a href={news?.link} rel="noreferrer" target="_blank">
				find more on BBC
			</a>
			<br />
			<button
				onClick={() => {
					history.push("/");
				}}>
				back to dashboard
			</button>
		</div>
	);
}
