import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export function Sport(props: any) {
	const history = useHistory();

	const teamNameRef = React.createRef<HTMLInputElement>();

	const [sportData, setSportData] = useState<any[]>();

	const [searchResult, setSearchResult] = useState<any[]>();

	useEffect(() => {
		if (sportData) return;

		fetch("/api/sport").then((res) => {
			res.json().then((json) => {
				setSportData(json);
			});
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
		<div className="sport-page">
			<p className="title">Sport</p>
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
			<div>
				<button
					onClick={() => {
						history.push("/");
					}}>
					Back to Dashboard
				</button>{" "}
				Result: {searchResult?.length}
			</div>
			<ul>
				{searchResult?.map((item, index) => {
					const { Div, Date, HomeTeam, AwayTeam, FTHG, FTAG } = item;
					return (
						<li className="result-item" key={index}>
							<div>
								<span className="field">Div:</span>
								<span className="value">{Div}</span>
							</div>
							<div>
								<span className="field">Date:</span>
								<span>{Date}</span>
							</div>
							<div>
								<span className="field">HomeTeam:</span>
								<span>{HomeTeam}</span>
							</div>
							<div>
								<span className="field">AwayTeam:</span>
								<span>{AwayTeam}</span>
							</div>
							<div>
								<span className="field">HomeTeam Goal:</span>
								<span>{FTHG}</span>
							</div>
							<div>
								<span className="field">AwayTeam Goal:</span>
								<span> {FTAG}</span>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
