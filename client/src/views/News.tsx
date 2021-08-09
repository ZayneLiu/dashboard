import { message } from "antd";
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

	const [newsDetail, setNewsDetail] = useState<{
		img: string;
		texts: string[];
	}>();

	useEffect(() => {
		if (news) return;

		let mounted = true;
		model.getNews().then((json) => {
			if (mounted) setNews(json[0]);
		});

		return () => {
			mounted = false;
		};
	});

	useEffect(() => {
		if (newsDetail || !news?.link) return;

		message.loading({
			content: "Load news from BBC...",
			key: "news-loading",
		});

		let mounted = true;
		model.getNewsDetail(news.link).then((json) => {
			if (mounted) {
				setNewsDetail(json);
				message.success({ content: "Loaded", key: "news-loading" }, 0);
			}
		});

		return () => {
			mounted = false;
		};
	});

	return (
		<div className="news-page router-view">
			<div>
				<p className="title">News</p>
				<button
					onClick={() => {
						history.push("/");
					}}>
					back to dashboard
				</button>
			</div>
			<p className="headline">{news?.title}</p>

			<div className="content">
				<div>
					<img src={newsDetail?.img} alt="" />
				</div>
				<div className="details">
					{newsDetail?.texts.map((text, index) => (
						<p key={index}>{text}</p>
					))}
				</div>
			</div>

			<a href={news?.link} rel="noreferrer" target="_blank">
				find more on BBC
			</a>
		</div>
	);
}
