import { useEffect, useState } from "react";
import { DashboardModel } from "../models/DashboardModel";
import { UserSchema } from "../models/UserModel";
import { PieChart } from "./Components/PieChartComponent";
class ClothData {
	id?: string;
	date?: string;
	clothe?: string;
}

export function Clothes(props: any) {
	const model = new DashboardModel();

	const [clothData, setClothData] = useState<ClothData[]>();

	const [res] = useState<{ [clothe: string]: number }>({});

	const currentUser = JSON.parse(
		sessionStorage.getItem("currentUser")!
	) as UserSchema;

	useEffect(() => {
		if ((clothData && currentUser) || !currentUser) return;

		model.getClothData().then((json) => {
			const { payload }: { payload: ClothData[] } = json;
			setClothData(payload);

			// console.log(payload);
			payload.forEach((item) => {
				if (res[item.clothe!]) res[item.clothe!] += 1;
				else res[item.clothe!] = 1;
			});
		});
	});
	return (
		<div className="chart-container">
			<PieChart clotheData={res} />
		</div>
	);
}
