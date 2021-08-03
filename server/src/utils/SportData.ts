import parse from "csv-parse/lib/sync";

import Axios from "axios";

export async function getSportData(params: any) {
	const res = await Axios({
		url: "http://www.football-data.co.uk/mmz4281/1718/I1.csv",
		method: "GET",
	});

	const records: any[] = parse(res.data, { columns: true });

	return records.reverse();
}
