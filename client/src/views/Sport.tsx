import React, { useEffect, useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import { DashboardModel } from "../models/DashboardModel";
import { Table } from "antd";

import "./Sport.scss";
import "antd/dist/antd.css";

const { Column } = Table;

export function Sport(props: any) {
	const history = useHistory();

	const model = new DashboardModel();

	const teamNameRef = createRef<HTMLInputElement>();

	const [sportData, setSportData] = useState<any[]>();

	const [searchResult, setSearchResult] = useState<any[]>();

	useEffect(() => {
		if (sportData) return;
		model.getSportData().then((json) => {
			const arrSportData: any[] = json.map((item: any, index: number) => {
				const { Div, Date, HomeTeam, AwayTeam, FTHG, FTAG } = item;
				return { key: index, Div, Date, HomeTeam, AwayTeam, FTHG, FTAG };
			});

			setSportData(arrSportData);
			setSearchResult(arrSportData);
		});
	});

	function teamNameOnChange() {
		const teamName = teamNameRef.current?.value;
		const res = sportData?.filter((item) => {
			return (
				item.HomeTeam.toLowerCase().includes(teamName) ||
				item.AwayTeam.toLowerCase().includes(teamName)
			);
		});
		setSearchResult(res);
	}

	return (
		<div className="sport-page router-view">
			<p className="title">Sport</p>
			<button
				onClick={() => {
					history.push("/");
				}}>
				Back to Dashboard
			</button>
			<div className="form-item">
				<input
					ref={teamNameRef}
					type="text"
					name="team-name"
					id="team-name"
					placeholder=" "
					onChange={teamNameOnChange}
				/>
				<label htmlFor="team-name">Team Name</label>
			</div>
			<div>Result: {searchResult?.length}</div>

			<Table
				className="table"
				dataSource={searchResult}
				pagination={false}
				sticky={true}>
				<Column title="Div" dataIndex="Div" key="Div"></Column>
				<Column title="Date" dataIndex="Date" key="Date"></Column>
				<Column title="HomeTeam" dataIndex="HomeTeam" key="HomeTeam"></Column>
				<Column title="AwayTeam" dataIndex="AwayTeam" key="AwayTeam"></Column>
				<Column title="FTHG" dataIndex="FTHG" key="FTHG"></Column>
				<Column title="FTAG" dataIndex="FTAG" key="FTAG"></Column>
			</Table>
		</div>
	);
}
