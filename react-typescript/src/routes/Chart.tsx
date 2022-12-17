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
	isDark: boolean;
}
function Chart({ coinId, isDark }: ChartProps) {
	const { isLoading, data } = useQuery<Ihistorical[]>(["ohlcv", coinId], () =>
		fetchCoinHistory(coinId),
		{
			refetchInterval: 5000
		}
	);
	return (
		<div>
			{isLoading ? (
				"loading chart..."
			) : (
				<ApexChart
					type="line"
					series={[
						{
							name: "price",
							data:
								data?.map((price) => parseFloat(price.close)) ??
								[],
						}, //니꼬쌤 제공 api는 강의와 달라 close값이 string이기 때문에 정수로 변환해줘야 한다. (?? null 병합 연산자)
					]}
					options={{
						theme: { mode: isDark ? "dark" : "light" },
						chart: {
							height: 500,
							width: 500,
							toolbar: { show: false },
							background: "transparent",
						},
						grid: { show: false },
						stroke: { curve: "smooth", width: 4 },
						yaxis: { show: false },
						xaxis: {
							labels: {
								show: false,
							},
							axisTicks: { show: false },
							axisBorder: { show: false },
							type: "datetime",
							categories: data?.map((price) =>
								new Date(price.time_close * 1000).toISOString()
							),
						},
						fill: {
							type: "gradient",
							gradient: {
								gradientToColors: ["#0be881"],
								stops: [0, 100],
							},
						},
						colors: ["#0fbcf9"],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;