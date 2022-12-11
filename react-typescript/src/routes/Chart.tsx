import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface Ihistorical {
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}
interface ChartProps {
	coinId: string;
}
function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<Ihistorical[]>(["ohlcv", coinId], () =>
		fetchCoinHistory(coinId)
	);
	// const 
	return (
		<div>
			{isLoading ? (
				"loading chart..."
			) : (
				<ApexChart
					type="line"
					series= {[
						{ name: "price", data: data?.map((price) => parseFloat(price.close)) ?? []}, //니꼬쌤 제공 api는 강의와 달라 close값이 string이기 때문에 정수로 변환해줘야 한다. (?? null 병합 연산자)
					]}
					options={{
						
						theme: { mode: "dark" },
						chart: { height: 500, width: 500, toolbar: {show: false}, background: 'transparent' },
						grid: {show: false},
						stroke: {curve: "smooth", width: 4},
						yaxis: {show: false},
						xaxis: {labels: {show: false}, axisTicks:{show: false}, axisBorder: {show: false}}
					}}
				/>
			)}
		</div>
	);
}

export default Chart;