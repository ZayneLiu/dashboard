import { Chart } from "react-google-charts";

import "./PieChartComponent.scss";

export function PieChart(props: any) {
	const { clotheData }: { clotheData: { [clothe: string]: number } } = props;
	// console.log(clotheData);

	let data: any[] = [];
	for (const key in clotheData) {
		data.push([key, clotheData[key]]);
	}
	// console.log(data);

	return (
		<Chart
			width={"360px"}
			height={"260px"}
			chartType="PieChart"
			loader={<div>Loading Chart</div>}
			data={[["Task", "Hours per Day"], ...data]}
			options={{
				title: "",
				tooltip: {},
				focusTarget: "category",
				hAxis: { viewWindow: { min: 400, max: 400 } },
				xAxis: { viewWindow: { min: 400, max: 400 } },
			}}
			rootProps={{ "data-testid": "1" }}></Chart>
	);
}
